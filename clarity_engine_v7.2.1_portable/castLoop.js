// castLoop.js — Ritual Executor Daemon

const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const logPath = path.join(__dirname, 'spells.log.json');
const statePath = path.join(__dirname, 'system_state.json');

// 🔁 Load ritual memory
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  } catch {
    return { lastSpell: null, runCount: 0 };
  }
}

// 💾 Save system snapshot
function saveState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}

// 🧾 Append to log
function logSpell(spell, result, notes = "") {
  let log = [];
  try {
    log = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
  } catch {}
  log.push({
    id: uuid(),
    spell,
    timestamp: new Date().toISOString(),
    result,
    notes
  });
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));
}

// 🧠 Define your spells
const spells = {
  "Entropy Scanner": () => {
    // placeholder logic
    console.log("🔍 Scanning for entropy...");
    return { result: "complete", notes: "2 orphans found" };
  },
  "Multiverse Simulator": () => {
    console.log("🌀 Simulating multiverse...");
    return { result: "success", notes: "Universe B diverged" };
  }
};

// 🔁 LOOP START
function run() {
  const state = loadState();
  const spellNames = Object.keys(spells);
  const spell = spellNames[state.runCount % spellNames.length];

  const result = spells[spell]();
  logSpell(spell, result.result, result.notes);

  state.lastSpell = spell;
  state.runCount += 1;
  saveState(state);
}

run();
