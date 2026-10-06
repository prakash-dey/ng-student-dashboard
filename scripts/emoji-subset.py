# Builds src/assets/emoji/noto-color-emoji.woff2: Noto Color Emoji 2.047 (the version the reference screenshots
# were rendered with, from Ubuntu's fonts-noto-color-emoji) cut down to the emoji the app uses, and prints the
# unicode-range for src/assets/emoji/emoji.css. Rerun when copy gains a new emoji:
#   docker run --rm -v "$PWD/.cache:/out" mcr.microsoft.com/playwright:v1.63.0-noble cp /usr/share/fonts/truetype/noto/NotoColorEmoji.ttf /out/
#   python3 scripts/emoji-subset.py .cache/NotoColorEmoji.ttf        (needs: pip install fonttools brotli)
import glob, re, subprocess, sys

src = sys.argv[1]
files = glob.glob('src/i18n/*.json') + ['src/logic/design.ts'] + glob.glob('src/ui/**/*.tsx', recursive=True)
text = ''.join(open(f, encoding='utf8').read() for f in files)
pat = re.compile(r'[\U0001F000-\U0001FAFF☀-➿⬀-⯿](?:️)?(?:‍[\U0001F000-\U0001FAFF☀-➿](?:️)?)*')
seqs = sorted(set(pat.findall(text)))
cps = sorted({ord(c) for s in seqs for c in s if c not in '‍️'})
subprocess.run([sys.executable, '-m', 'fontTools.subset', src, '--text=' + ''.join(seqs) + '‍️',
                '--layout-features=*', '--flavor=woff2', '--output-file=src/assets/emoji/noto-color-emoji.woff2'], check=True)
print(len(seqs), 'emoji:', ' '.join(seqs))
print('unicode-range: ' + ','.join(f'U+{c:X}' for c in cps) + ';')
