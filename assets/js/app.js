const manifestPath = 'data/manifest.json';

const getEl = (id) => document.getElementById(id);

function createAudioRow(label, src) {
  const wrapper = document.createElement('div');
  wrapper.className = 'track';

  const name = document.createElement('div');
  name.className = 'track-label';
  name.textContent = label;

  if (src) {
    const player = document.createElement('audio');
    player.controls = true;
    player.preload = 'none';
    player.src = src;
    wrapper.append(name, player);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'Audio path missing in manifest.';
    wrapper.append(name, placeholder);
  }

  return wrapper;
}

function renderUpper(page) {
  const upper = getEl('upper');
  upper.innerHTML = '';

  const title = document.createElement('h1');
  title.textContent = page.title;

  const abstractBlock = document.createElement('div');
  abstractBlock.className = 'abstract-block';

  const absTitle = document.createElement('h2');
  absTitle.textContent = 'Abstract';

  const abs = document.createElement('p');
  abs.textContent = page.abstract;

  const linkWrap = document.createElement('p');
  linkWrap.className = 'meta-link';

  const link = document.createElement('a');
  link.href = page.anonymous4science_url || '#';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'OpenSource Repository';
  if (!page.anonymous4science_url) {
    link.title = 'Please fill this URL in data/manifest.json';
  }

  linkWrap.append(link);
  abstractBlock.append(absTitle, abs, linkWrap);
  upper.append(title, abstractBlock);

  if (page.hero_image) {
    const img = document.createElement('img');
    img.className = 'hero-image';
    img.src = page.hero_image;
    img.alt = 'Framework figure';
    upper.append(img);
  }
}

function renderSection(sectionId, section) {
  const root = getEl(sectionId);
  root.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = section.title;

  const desc = document.createElement('p');
  desc.className = 'section-description';
  desc.textContent = section.description;

  root.append(title, desc);

  const template = getEl('sample-template');
  section.samples.forEach((sample, index) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector('.sample-title').textContent = `Pair ${index + 1} — ${sample.id}`;
    fragment.querySelector('.sample-meta').textContent = `Emotion: ${sample.emotion || 'N/A'}`;
    fragment.querySelector('.sample-text').textContent = sample.text;

    const tracks = fragment.querySelector('.tracks');
    section.systems_order.forEach((systemId) => {
      const label = section.systems_meta?.[systemId] || systemId;
      const src = sample.audio?.[systemId] || '';
      tracks.appendChild(createAudioRow(label, src));
    });

    root.appendChild(fragment);
  });
}

async function main() {
  try {
    const response = await fetch(manifestPath);
    if (!response.ok) {
      throw new Error(`Failed to load manifest: ${response.status}`);
    }

    const manifest = await response.json();
    renderUpper(manifest.page);
    renderSection('mid', manifest.sections.mid);
    renderSection('down', manifest.sections.down);
  } catch (error) {
    document.body.innerHTML = `<main class=\"container\"><section class=\"panel\"><h1>Failed to load demo data</h1><p>${error.message}</p></section></main>`;
  }
}

main();
