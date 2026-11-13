# 資料檔驗證：python -I tools/validate.py js/data/xxx.js
# 每個資料檔必須是：window.NAME = <嚴格 JSON>;
import json, re, sys

def load(path):
    s = open(path, encoding="utf-8").read()
    m = re.match(r"^\s*(?:/\*.*?\*/\s*)?window\.(\w+)\s*=\s*(.*?);\s*$", s, re.S)
    if not m:
        sys.exit(f"{path}: 格式必須是 window.NAME = {{...}};")
    try:
        return m.group(1), json.loads(m.group(2))
    except json.JSONDecodeError as e:
        sys.exit(f"{path}: JSON 錯誤 {e}")

ERR = []
def err(msg): ERR.append(msg)
def wc(s): return len(s.split())
def has_word(sent, w):
    return re.search(r"(?<![A-Za-z])" + re.escape(w) + r"(?![A-Za-z])", sent, re.I) is not None

def check_q(q, where):
    t = q.get("t")
    if t in ("mc", "fix"):
        o = q.get("o", [])
        if not (2 <= len(o) <= 4): err(f"{where}: o 要 2-4 個選項")
        if not isinstance(q.get("a"), int) or not (0 <= q["a"] < len(o)): err(f"{where}: a 索引錯誤")
        if len(set(o)) != len(o): err(f"{where}: 選項重複")
        if t == "mc" and "___" not in q.get("q", "") and "?" not in q.get("q", "") and "？" not in q.get("q", ""): err(f"{where}: mc 題目要有 ___ 或問號")
    elif t == "fill":
        if "___" not in q.get("q", ""): err(f"{where}: fill 要有 ___")
        if not q.get("a") or not isinstance(q["a"], list): err(f"{where}: fill a 要是陣列")
    elif t == "order":
        n = wc(q.get("s", ""))
        if not (3 <= n <= 11): err(f"{where}: order 句子 3-11 字（目前 {n}）")
        if re.search(r"[一-鿿]", q.get("s", "")): err(f"{where}: order 不能有中文")
    elif t == "tr":
        if not q.get("zh") or not q.get("a"): err(f"{where}: tr 要有 zh 與 a")
    else:
        err(f"{where}: 未知題型 {t}")
    if not q.get("e"): err(f"{where}: 缺解析 e")

def grammar(name, d):
    for unit, pts in d.items():
        if not (2 <= len(pts) <= 4): err(f"{unit}: 要 2-4 個文法點")
        for i, p in enumerate(pts):
            w = f"{unit}#{i+1}"
            for k in ("h", "p", "ex", "q"):
                if k not in p: err(f"{w}: 缺 {k}")
            if len(p.get("q", [])) != 5: err(f"{w}: 必須剛好 5 題")
            types = {q.get("t") for q in p.get("q", [])}
            if len(types) < 3: err(f"{w}: 5 題至少要 3 種題型")
            for j, q in enumerate(p.get("q", [])): check_q(q, f"{w}.q{j+1}")

def vocab(name, d):
    seen = set()
    for st in d:
        for u in st["units"]:
            if len(u["w"]) < 15: err(f"{u['t']}: 單字太少")
            for r in u["w"]:
                if len(r) != 5: err(f"{r}: 必須 5 欄"); continue
                w, ipa, zh, ex, exzh = r
                if w.lower() in seen: err(f"重複單字 {w}")
                seen.add(w.lower())
                if not (ipa.startswith("/") and ipa.endswith("/")): err(f"{w}: IPA 要用 /.../")
                if not has_word(ex, w): err(f"{w}: 例句必須包含單字原形「{w}」")

def reading(name, d):
    for p in d:
        n = sum(wc(x) for x in p["text"])
        if n < 120: err(f"{p['t']}: 文章太短 {n}")
        if len(p["q"]) < 6: err(f"{p['t']}: 至少 6 題")
        for j, q in enumerate(p["q"]):
            w = f"{p['t']}.q{j+1}"; t = q.get("t")
            if t == "tfng":
                if q.get("a") not in ("TRUE", "FALSE", "NOT GIVEN"): err(f"{w}: a 必須 TRUE/FALSE/NOT GIVEN")
            elif t in ("mc", "heading"):
                if not (0 <= q.get("a", -1) < len(q.get("o", []))): err(f"{w}: a 索引錯誤")
                if t == "heading" and not (0 <= q.get("p", -1) < len(p["text"])): err(f"{w}: p 段落索引錯誤")
            elif t == "gap":
                if "___" not in q.get("q", ""): err(f"{w}: gap 要有 ___")
                full = " ".join(p["text"])
                if not any(has_word(full, a) for a in q.get("a", [])): err(f"{w}: gap 答案必須出現在文章中")
            else: err(f"{w}: 未知題型 {t}")
            if not q.get("e"): err(f"{w}: 缺解析")

def writing(name, d):
    for u in d["sentence"]:
        for j, it in enumerate(u["items"]):
            w = f"{u['t']}.{j+1}"
            if it.get("t") not in ("tr", "combine", "rewrite", "expand"): err(f"{w}: 題型錯誤")
            if it["t"] == "expand":
                if not it.get("model"): err(f"{w}: expand 要有 model")
            elif not it.get("a"): err(f"{w}: 要有 a")
    for k in ("paragraph", "task1", "task2"):
        for it in d[k]:
            if not it.get("model"): err(f"{k}/{it.get('title')}: 缺範文")
    for it in d["task1"]:
        for s in it["series"]:
            if len(s["values"]) != len(it["labels"]): err(f"{it['title']}: values 與 labels 長度不同")
        if wc(it["model"]) < 150: err(f"{it['title']}: Task 1 範文至少 150 字（目前 {wc(it['model'])}）")
    for it in d["task2"]:
        if wc(it["model"]) < 250: err(f"{it['title']}: Task 2 範文至少 250 字（目前 {wc(it['model'])}）")

name, data = load(sys.argv[1])
{"GD": grammar, "VX": vocab, "RD": reading, "WT": writing}.get(re.sub(r"_.*", "", name), lambda n, d: err(f"未知變數名 {n}"))(name, data)
if ERR:
    print("\n".join(ERR[:80])); print(f"共 {len(ERR)} 個問題"); sys.exit(1)
print(f"OK {name}")
