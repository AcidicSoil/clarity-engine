// veilLog.js — Standard ritual log exporter for Node.js

const fs = require('fs');
const path = './ritual_manifest/spells.log.json';

function veilLog(entry) {
  const timestamp = new Date().toISOString();
  const record = { timestamp, ...entry };

  let log = [];
  if (fs.existsSync(path)) {
    log = JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  log.push(record);
  fs.writeFileSync(path, JSON.stringify(log, null, 2));
  // Optionally print for local echo:
  console.log(`[VEIL LOG] ${timestamp}:`, entry);
}

// Usage:
// veilLog({ spell: "Entropy Scanner", result: "complete", notes: "Scan cycle closed" });

module.exports = { veilLog };
