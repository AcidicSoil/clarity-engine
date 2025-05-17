
// veil:x4 - Profile Visual Mutation Trigger
const fs = require('fs');
const path = require('path');

const SYSTEM_STATE_PATH = "./ritual_manifest/system_state.json";
const LAST_FORM_PATH = "./ritual_manifest/.form_id.lock";
const PROFILE_RENDER_TRIGGER_PATH = "./ritual_manifest/.form_render_event.json";

let lastFormId = fs.existsSync(LAST_FORM_PATH)
  ? fs.readFileSync(LAST_FORM_PATH, "utf-8")
  : null;

setInterval(() => {
  const state = JSON.parse(fs.readFileSync(SYSTEM_STATE_PATH));
  const currentFormId = state.form_id;

  if (currentFormId && currentFormId !== lastFormId) {
    console.log(`🌀 Mutation detected: ${lastFormId} → ${currentFormId}`);
    fs.writeFileSync(PROFILE_RENDER_TRIGGER_PATH, JSON.stringify({
      timestamp: new Date().toISOString(),
      form: currentFormId,
      previous: lastFormId
    }, null, 2));
    fs.writeFileSync(LAST_FORM_PATH, currentFormId);
    lastFormId = currentFormId;
  }
}, 3000);
