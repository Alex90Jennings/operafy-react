"""Download public-domain cover artwork from Wikimedia Commons.

Reads scripts/cover-picks.json ({operaId: {"file": "File:...", "focusX": 0-1, "focusY": 0-1}}), writes a
600x600 JPEG per opera to public/assets/covers/ and the attribution data to src/data/covers.json.
focusX/focusY choose which part of a non-square image survives the square crop (default 0.5 / 0.35).
Optional "label" and "artist" override the file name and Commons author shown on the credits page.
Usage: python3 scripts/generate-covers.py   (requires Pillow: pip install pillow)
"""
import html, io, json, os, re, urllib.parse, urllib.request
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
UA = {"User-Agent": "Operafy/1.0 (https://github.com/Alex90Jennings/operafy-react)"}
SIZE = 600

def api(params):
    params["format"] = "json"
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60))

def clean(markup):
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", markup or ""))).strip()

def tidy_artist(name):
    # Commons often repeats "Unknown author" or prefixes the name with a role such as "Print made by:".
    name = re.sub(r"^(print made by|photographer|author)\s*:\s*", "", name, flags=re.I)
    if not name or re.fullmatch(r"(unknown( author)?\s*)+", name, flags=re.I):
        return "Unknown"
    return name[:100]

picks = json.load(open(os.path.join(ROOT, "scripts", "cover-picks.json")))
files = [pick["file"] for pick in picks.values()]
info = {}
for start in range(0, len(files), 40):
    data = api({"action": "query", "titles": "|".join(files[start:start + 40]), "prop": "imageinfo",
                "iiprop": "url|extmetadata", "iiurlwidth": 1000,
                "iiextmetadatafilter": "LicenseShortName|Artist|DateTimeOriginal"})
    normalized = {n["to"]: n["from"] for n in data["query"].get("normalized", [])}
    for page in data["query"]["pages"].values():
        if "missing" in page:
            raise SystemExit(f"Missing on Commons: {page['title']}")
        info[normalized.get(page["title"], page["title"])] = page["imageinfo"][0]

out_dir = os.path.join(ROOT, "public", "assets", "covers")
os.makedirs(out_dir, exist_ok=True)
covers = {}
for opera_id, pick in picks.items():
    image_info = info[pick["file"]]
    meta = image_info.get("extmetadata", {})
    license_name = clean(meta.get("LicenseShortName", {}).get("value"))
    if not re.search(r"public domain|CC0", license_name, re.I):
        raise SystemExit(f"{pick['file']} is not public domain ({license_name})")
    request = urllib.request.Request(image_info.get("thumburl") or image_info["url"], headers=UA)
    raw = urllib.request.urlopen(request, timeout=60).read()
    image = ImageOps.fit(Image.open(io.BytesIO(raw)).convert("RGB"), (SIZE, SIZE), method=Image.LANCZOS,
                         centering=(pick.get("focusX", 0.5), pick.get("focusY", 0.35)))
    path = os.path.join(out_dir, f"{opera_id}.jpg")
    image.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    covers[opera_id] = {
        "src": f"/assets/covers/{opera_id}.jpg",
        "title": pick.get("label") or re.sub(r"^File:|\.[A-Za-z]+$", "", pick["file"]),
        "artist": pick.get("artist") or tidy_artist(clean(meta.get("Artist", {}).get("value"))),
        "date": clean(meta.get("DateTimeOriginal", {}).get("value"))[:40],
        "license": license_name,
        "sourceUrl": image_info["descriptionurl"],
    }
    print(f"{opera_id:24} {os.path.getsize(path) // 1024:4} KB  {license_name}")

json.dump(dict(sorted(covers.items())), open(os.path.join(ROOT, "src", "data", "covers.json"), "w"), indent=2, ensure_ascii=False)
print(f"{len(covers)} covers written")
