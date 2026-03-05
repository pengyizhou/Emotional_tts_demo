# Emotional TTS Demo (Static Webpage)

This repository contains a static, manifest-driven demo page suitable for hosting on GitHub Pages or anonymous4science.

## Structure

- `index.html`: page shell with three parts (upper / medium / down).
- `assets/css/style.css`: layout and visual style.
- `assets/js/app.js`: reads `data/manifest.json` and renders all sections.
- `data/manifest.json`: single source of truth for title, abstract, links, sample text, and audio paths.
- `data/section_mid/sample_XXX/`: audio files for the ablation comparison section.
- `data/section_down/sample_XXX/`: audio files for the baseline comparison section.

## How to update content

1. Edit `data/manifest.json`:
   - Fill `page.anonymous4science_url`.
   - Replace placeholder texts in `sections.mid.samples[*].text` and `sections.down.samples[*].text`.
2. Put your figure under `assets/img/` and update `page.hero_image` if needed.
3. Add audio files at paths listed in `audio` for each sample.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
