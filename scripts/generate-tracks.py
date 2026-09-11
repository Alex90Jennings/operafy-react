"""Regenerate src/data/tracks.json from Wikimedia Commons. Usage: python3 scripts/generate-tracks.py [output-path]"""
import json, os, re, sys, urllib.request, urllib.parse
UA = {"User-Agent": "Operafy/1.0 (https://github.com/Alex90Jennings/operafy-react)"}
GIGLI, DE_LUCA, MOLAJOLI = "Beniamino Gigli", "Giuseppe De Luca", "La Scala, cond. Lorenzo Molajoli"
# (id, operaId, title, performer, year override, Commons file)
TRACKS = [
 ("che-gelida-manina", "la-boheme", "Che gelida manina", GIGLI, None, "PDP-CH - Beniamino Gigli, Tenor - La bohème - Che gelida manina - Puccini - Hmv-db1538-8769a.flac"),
 ("o-soave-fanciulla", "la-boheme", "O soave fanciulla", GIGLI, None, "PDP-CH - Beniamino Gigli with orchestra - La bohème - Act 1 - O soave fanciulla - Puccini-Illica-Giacosa - Hmv-db3225-2ea5256.flac"),
 ("o-mimi-tu-piu-non-torni", "la-boheme", "O Mimì, tu più non torni", f"{GIGLI} & {DE_LUCA}", None, "PDP-CH - Beniamino Gigli, Tenor and Giuseppe de Luca, Baritone - La bohème - Act 4 - O Mimì, tu più non torni - Puccini - Hmv-db1050-8069b.flac"),
 ("un-bel-di-vedremo", "madama-butterfly", "Un bel dì vedremo", "Rosa Ponselle", None, "CC0-CH - Rosa Ponselle, soprano with orchestra - Madama Butterfly - Un bel di vedremo - Giacomo Puccini - Columbia-7340-49571.flac"),
 ("donna-non-vidi-mai", "manon-lescaut", "Donna non vidi mai", "Enrico Caruso", None, "PDP-CH - Enrico Caruso - Manon Lescaut - Donna non vidi mai - Giacomo Puccini - Gramophone-da106-7-52039.flac"),
 ("il-fior-che-avevi", "carmen", "Il fior che avevi a me tu dato", GIGLI, None, "PDP-CH - Beniamino Gigli with orchestra - Carmen - Act 2 - Il fior che avevi a me tu dato - Bizet - Meilhac - Halévy - Hmv-db6307-2ba563.flac"),
 ("carmen-potpourri", "carmen", "Carmen Potpourri, Part 1", "Berlin Philharmonic, cond. Selmar Meyrowitz", None, "PDP-CH - Berlin Philharmonic, Selmar Meyrowitz - Carmen, Potpourri, Part 1 - Bizet - Ultraphon-e965-17011z.flac"),
 ("del-tempio-al-limitar", "les-pecheurs-de-perles", "Del tempio al limitar", f"{GIGLI} & {DE_LUCA}", None, "PDP-CH - Beniamino Gigli, Tenor and Giuseppe de Luca, Baritone - I pescatori di perle - Act 1 - Del tempio al limitar - Bizet - Hmv-db1150-2-054208.flac"),
 ("comme-autrefois", "les-pecheurs-de-perles", "Comme autrefois", "Amelita Galli-Curci", None, "PDP-CH - Amelita Galli-Curci, soprano - Les pêcheurs de perles - Comme autrefois - Bizet - Cormon - Carre - Gramophone-db255-2-033086.flac"),
 ("barbiere-overture-1", "il-barbiere-di-siviglia", "Overture, Part 1", MOLAJOLI, None, "PDP-CH - La Scala - Lorenzo Molajoli - Il barbiere di Siviglia - Overture - Rossini - Columbia-d14564-bx204.flac"),
 ("barbiere-overture-2", "il-barbiere-di-siviglia", "Overture, Part 2", MOLAJOLI, None, "PDP-CH - La Scala - Lorenzo Molajoli - Il barbiere di Siviglia - Overture - Rossini - Columbia-d14564-bx205.flac"),
 ("largo-al-factotum", "il-barbiere-di-siviglia", "Largo al factotum", MOLAJOLI, None, "PDP-CH - La Scala - Lorenzo Molajoli - Il barbiere di Siviglia - Atto 1-Sc 02-Cavatina- Largo al factotum della città - Rossini - Columbia-d14566-bx615.flac"),
 ("una-voce-poco-fa", "il-barbiere-di-siviglia", "Una voce poco fa", MOLAJOLI, None, "PDP-CH - La Scala - Lorenzo Molajoli - Il barbiere di Siviglia - Atto 2-Sc 01-Cavatina- Una voce poco fa - Rossini - Columbia-d14569-bx610.flac"),
 ("la-calunnia", "il-barbiere-di-siviglia", "La calunnia è un venticello", MOLAJOLI, None, "PDP-CH - La Scala - Lorenzo Molajoli - Il barbiere di Siviglia - Atto 2-Sc 04-Aria- La calunnia e un venticello - Rossini - Columbia-d14570-bx611.flac"),
 ("celeste-aida", "aida", "Celeste Aida", GIGLI, None, "PDP-CH - Beniamino Gigli with orchestra - Aïda - Act 1 - Celeste Aïda, forma divina - Verdi - Ghislanzoni - Hmv-db3225-2ea5255.flac"),
 ("aida-grand-march", "aida", "Grand March", "Band of the Royal Italian Navy", 1906, "Musica della R. Marina Italiana Aida (Verdi) Gran Marcia trionfale.mp3"),
 ("traviata-prelude", "la-traviata", "Prelude to Act 1", "New York Philharmonic, cond. Arturo Toscanini", None, "PDP-CH - New York Philharmonic - Arturo Toscanini - La traviata - Prelude - Act 1 - Electrola-ej423-6-0755.flac"),
 ("la-donna-e-mobile", "rigoletto", "La donna è mobile", "Ferruccio Giannini", 1896, "Berliner 967 - La Donna è Mobile (audio).wav"),
 ("caro-nome", "rigoletto", "Caro nome", "Gwen Catley & the Hallé Orchestra", None, "PDP-CH - Gwen Catley, Soprano with the Hallé Orchestra - Rigoletto - Caro nome - Verdi - Warwick Braithwaite - Hmv-c3369-2er687.flac"),
 ("solenne-in-quest-ora", "la-forza-del-destino", "Solenne in quest'ora", f"{GIGLI} & {DE_LUCA}", None, "PDP-CH - Beniamino Gigli, Tenor and Giuseppe de Luca, Baritone - La forza del destino - Act 3 - Solenne in quest'ora - Verdi - Hmv-db1050-8069a.flac"),
 ("deh-non-mabbandonar", "la-forza-del-destino", "Deh, non m'abbandonar", "Meta Seinemeyer", None, "PDP-CH - Meta Seinemeyer, soprano with Staatskapelle Berlin - La forza del destino - Deh, non m'abbandonar - Verdi - Parlophon-p9116-20259.flac"),
 ("vesti-la-giubba", "pagliacci", "Vesti la giubba", "Antonio Paoli", 1907, "Leoncavallo - Pagliacci - Vesti la giubba (Antonio Paoli).flac"),
 ("ave-maria-intermezzo", "cavalleria-rusticana", "Ave Maria (Intermezzo)", "Tito Schipa", None, "PDP-CH - Tito Schipa - Cavalleria rusticana - Intermezzo - Ave Maria - Mascagni - Gramophone-db1387-2-052371.flac"),
 ("spargi-damaro-pianto", "lucia-di-lammermoor", "Spargi d'amaro pianto", "Toti Dal Monte", None, "PDP-CH - Toti Dal Monte - Clement Barone - Lucia di Lammermoor - Spargi d amore pianto - Part 1 - Donizetti - Cammarano - Gramophone-db1015-2-053281.flac"),
 ("salve-dimora", "faust", "Salve! dimora casta e pura", GIGLI, None, "PDP-CH - Beniamino Gigli, Tenor - Faust - Act 3 - Salve dimora casta e pura - Gounod - Hmv-db1538-8769b.flac"),
 ("figaro-overture", "le-nozze-di-figaro", "Overture", "La Scala Theatre Orchestra, cond. Lorenzo Molajoli", None, "PDP-CH - La Scala Theatre Orchestra - Lorenzo Molajoli - Le nozze di Figaro, K 492 - Bonus track-Mozart- Le nozze di Figaro, Sinfonia - Wolfgang Amadeus Mozart - Columbia-d14579-bx637.flac"),
 ("zauberflote-overture", "die-zauberflote", "Overture", "Musopen Symphony", 2012, "Mozart - Die Zauberflöte, K620 - Overture (Musopen Symphony).flac"),
 ("fort-denn-eile", "die-walkure", "Fort denn eile", "Johanna Gadski", 1917, "Fort denn eile - Die Walkure.wav"),
 ("ach-ich-habe-sie-verloren", "orfeo-ed-euridice", "Ach, ich habe sie verloren", "Margarete Klose", None, "PDP-CH - Staatsoper Unter den Linden - Bruno Seidler-Winkler - Margarete Klose, contralto - Orfeo ed Euridice - Ach, ich habe sie verloren - Gluck - Hmv-db4531-2ra2956.flac"),
 ("cielo-e-mar", "la-gioconda", "Cielo e mar", GIGLI, None, "PDP-CH - Beniamino Gigli, Tenor - La Gioconda - Act 2 - Cielo e mar - Ponchielli - Boito - Hmv-db1499-42-822.flac"),
 ("mappari-tuttamor", "martha", "M'apparì tutt'amor", GIGLI, None, "PDP-CH - Beniamino Gigli, Tenor - Rosario Bourdon - Martha - Act 3- M'apparì tutt'amor - Friedrich von Flotow - Hmv-db1382-7109b.flac"),
]
def api(params):
    params["format"] = "json"
    return json.load(urllib.request.urlopen(urllib.request.Request("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params), headers=UA)))
pages = {}
titles = ["File:" + t[5] for t in TRACKS]
for i in range(0, len(titles), 40):
    d = api({"action": "query", "titles": "|".join(titles[i:i+40]), "prop": "videoinfo", "viprop": "url|size|mediatype|extmetadata|derivatives",
             "viextmetadatafilter": "LicenseShortName|DateTimeOriginal|ImageDescription"})
    norm = {n["to"]: n["from"] for n in d["query"].get("normalized", [])}
    for p in d["query"]["pages"].values():
        if "missing" in p: print("MISSING", p["title"], file=sys.stderr); continue
        pages[norm.get(p["title"], p["title"])] = p
out, problems = [], 0
for tid, opera, title, performer, year, fname in TRACKS:
    p = pages.get("File:" + fname)
    if not p: print("NOT FOUND:", fname, file=sys.stderr); problems += 1; continue
    vi = p["videoinfo"][0]; m = vi.get("extmetadata", {})
    val = lambda k: re.sub(r"<[^>]+>", " ", m.get(k, {}).get("value", ""))
    mp3 = [x["src"] for x in vi.get("derivatives", []) if x.get("type", "").startswith("audio/mpeg")]
    src = mp3[0] if mp3 else vi["url"]
    if not mp3 and not fname.endswith(".mp3"): print("NO MP3:", fname, file=sys.stderr); problems += 1
    if year is None:
        desc = val("ImageDescription")
        match = re.search(r"1st recording date:[^0-9]{0,40}?(?:\d{1,2}\s+\w+\s+)?(\d{4})", desc) or re.search(r"1st release date:\s*(\d{4})", desc) or re.search(r"(\d{4})", val("DateTimeOriginal"))
        year = int(match.group(1)) if match else None
    out.append({"id": tid, "operaId": opera, "title": title, "performer": performer, "year": year,
                "duration": round(vi.get("duration") or 0), "src": src.split("?")[0],
                "sourceUrl": vi["descriptionurl"], "license": re.sub(r"\s+", " ", val("LicenseShortName")).strip()})
OUTPUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "src", "data", "tracks.json")
json.dump(out, open(OUTPUT, "w"), ensure_ascii=False, indent=2)
for t in out: print(f'{t["id"]:28} {t["year"]!s:5} {t["duration"]:4}s {t["license"]:14} {t["src"][-40:]}')
print(len(out), "tracks written;", problems, "problems")
