"""Builds web-sized photos and video previews for the portfolio.
Run from anywhere:  python tools/build_media.py [photos|videos|all]"""
import os, sys, subprocess, json
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DL = os.path.dirname(ROOT)
SRC = os.path.join(DL, "zohar-portfolio", "media", "full")   # edited 2400px photos
OUT = os.path.join(ROOT, "media")
VIDS = os.path.join(DL, "portfolio slideshow", "pictures", "סרטונים")

# id, source, mode, (start for loop)
# mode "full" = whole clip, "montage" = short highlight cut from evenly spaced moments
REELS = [
    ("save-the-date", os.path.join(VIDS, "VID-20240401-WA0035.mp4"), "full"),
    ("desert-trek", os.path.join(VIDS, "sayar darom 3.0 - Trim.mp4"), "montage"),
    ("rock-n-roll", os.path.join(VIDS, "תנו לי רוקנרול - תיכון צרעה.mp4"), "montage"),
    ("gym-promo", os.path.join(DL, "cinematic gym best.mp4"), "full"),
    ("coach-reel", os.path.join(DL, "exported_final.mp4"), "full"),
    ("crypto-reel", os.path.join(DL, "1102(17).mp4"), "full"),
]

def run(args):
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

# Extra edited photos from other folders: site id -> source file
GYM = os.path.join(DL, "gym rat#-20261109T153230Z-1-001", "gym rat#")
EXTRA = {
    "flash-001": os.path.join(GYM, "IMG_0590.jpg"),
    "flash-002": os.path.join(GYM, "f40304896.jpg"),
    "flash-003": os.path.join(GYM, "IMG_0108.jpg"),
    "flash-004": os.path.join(GYM, "f42362880.jpg"),
    "soldiers-001": os.path.join(GYM, "IMG_3501.jpg"),
    "soldiers-002": os.path.join(GYM, "IMG_3436.jpg"),
    "drone-005": os.path.join(GYM, "merged 3.jpg"),
    "drone-006": os.path.join(GYM, "merged 2.jpg"),
    "self-portrait-001": os.path.join(DL, "zohar-self-portrait.jpg"),  # home page photo
    "party-001": os.path.join(DL, "zohar-new-photos", "party-mario.jpg"),
    "party-002": os.path.join(DL, "zohar-new-photos", "party-grandma.jpg"),
    "fitness-001": os.path.join(DL, "zohar-new-photos", "gym-cable-curl.jpg"),
    "fitness-002": os.path.join(DL, "zohar-new-photos", "gym-preacher-curl.jpg"),
    "drone-007": r"D:\my portfolio\drone.png",
    "bw-street-001": os.path.join(DL, "zohar-new-photos", "street-cart-bw.jpg"),
}

def photos():
    for sub in ("full", "thumb"):
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)
    sizes = {}
    sources = [(f, os.path.join(SRC, f)) for f in sorted(os.listdir(SRC)) if f.endswith(".jpg")]
    sources += [(k + ".jpg", v) for k, v in EXTRA.items()]
    for f, path in sources:
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        big = im.copy(); big.thumbnail((1800, 1800), Image.LANCZOS)
        big.save(os.path.join(OUT, "full", f), quality=82, optimize=True, progressive=True)
        small = im.copy(); small.thumbnail((720, 720), Image.LANCZOS)
        small.save(os.path.join(OUT, "thumb", f), quality=78, optimize=True, progressive=True)
        sizes[f[:-4]] = [small.width, small.height]
    with open(os.path.join(OUT, "sizes.json"), "w") as fh:
        json.dump(sizes, fh)
    print("photos:", len(sizes))

def probe(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height:format=duration", "-of", "json", path])
    j = json.loads(out)
    s = j["streams"][0]
    return s["width"], s["height"], float(j["format"]["duration"])

def videos():
    vdir = os.path.join(OUT, "video"); os.makedirs(vdir, exist_ok=True)
    meta = {}
    for rid, src, mode in REELS:
        w, h, dur = probe(src)
        vertical = h > w
        scale = "scale=-2:1280" if vertical else "scale=1280:-2"
        if w < 1280 and not vertical:
            scale = "scale=trunc(iw/2)*2:trunc(ih/2)*2"
        play = os.path.join(vdir, f"{rid}.mp4")
        enc = ["-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart"]
        if mode == "full":
            run(["ffmpeg", "-y", "-i", src, "-t", "60", "-vf", scale + ",fps=30", *enc, play])
            length = min(dur, 60)
        else:
            # 7 x 4.5s moments spread through the film, short audio fades so cuts don't click
            n, seg = 7, 4.5
            starts = [dur * (0.08 + 0.84 * i / (n - 1)) for i in range(n)]
            parts = []
            for i, st in enumerate(starts):
                parts.append(f"[0:v]trim={st:.2f}:{st+seg:.2f},setpts=PTS-STARTPTS,{scale},fps=30,setsar=1[v{i}];"
                             f"[0:a]atrim={st:.2f}:{st+seg:.2f},asetpts=PTS-STARTPTS,"
                             f"afade=t=in:d=0.15,afade=t=out:st={seg-0.25}:d=0.25[a{i}];")
            fc = "".join(parts) + "".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]"
            run(["ffmpeg", "-y", "-i", src, "-filter_complex", fc, "-map", "[v]", "-map", "[a]", *enc, play])
            length = n * seg
        # silent 6s loop for the card + poster frame
        loop_start = min(length * 0.3, max(0, length - 7))
        loop_scale = "scale=-2:640" if vertical else "scale=640:-2"
        run(["ffmpeg", "-y", "-ss", f"{loop_start:.2f}", "-i", play, "-t", "6", "-an",
             "-vf", loop_scale + ",fps=24", "-c:v", "libx264", "-preset", "slow", "-crf", "30",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", os.path.join(vdir, f"{rid}-loop.mp4")])
        run(["ffmpeg", "-y", "-ss", f"{loop_start:.2f}", "-i", play, "-frames:v", "1",
             "-vf", ("scale=-2:960" if vertical else "scale=960:-2"), "-q:v", "4",
             os.path.join(vdir, f"{rid}.jpg")])
        meta[rid] = {"vertical": vertical, "length": round(length)}
        print("video:", rid, meta[rid])
    with open(os.path.join(OUT, "videos.json"), "w") as fh:
        json.dump(meta, fh)

if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("photos", "all"): photos()
    if what in ("videos", "all"): videos()
