#!/usr/bin/env python3
"""src/ 의 style.css · body.html · script.js 를 합쳐 dist/ 결과물을 생성합니다."""
from pathlib import Path

ROOT = Path(__file__).parent
src = {n: (ROOT / "src" / n).read_text(encoding="utf-8") for n in ("style.css", "body.html", "script.js")}
dist = ROOT / "dist"
dist.mkdir(exist_ok=True)

# 1) 아임웹 코드 위젯에 그대로 붙여넣는 단일 블록
paste = f"""<!-- CHIC STUDIO : 아임웹 코드 위젯용 (이 파일 전체를 복사해 붙여넣으세요) -->
<style>
{src['style.css']}
</style>

{src['body.html']}
<script>
{src['script.js']}
</script>
"""
(dist / "imweb-paste.html").write_text(paste, encoding="utf-8")

# 2) 브라우저 미리보기용 전체 페이지
page = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CHIC STUDIO — 아임웹 전문 웹 에이전시</title>
<meta name="description" content="아임웹 홈페이지 제작 · 쇼핑몰 구축 · 랜딩페이지 · 유지보수 전문 웹 디자인 스튜디오">
<style>html{{scroll-behavior:auto}}body{{margin:0;background:#f3f0ea}}</style>
</head>
<body>
{paste}
</body>
</html>
"""
(dist / "index.html").write_text(page, encoding="utf-8")
print("built:", *(p.name for p in dist.iterdir()))
