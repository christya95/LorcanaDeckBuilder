import { writeFile } from 'fs/promises';

async function main() {
  const res = await fetch('https://api.lorcana-api.com/cards/all');
  if (!res.ok) {
    throw new Error(`Failed to fetch cards: ${res.status}`);
  }
  const data = await res.json();
  await writeFile('public/data/cards.merged.json', JSON.stringify(data));
  console.log(`Saved ${Array.isArray(data) ? data.length : 0} cards`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
