
// veil:x4 - Profile Renderer
import React from "react";
import fs from "fs";

export default function ProfileAvatar() {
  const state = JSON.parse(fs.readFileSync("./ritual_manifest/system_state.json"));
  const registry = JSON.parse(fs.readFileSync("./ritual_manifest/form_registry.json"));
  const imagePath = `/assets/forms/${registry[state.form_id] || "default.svg"}`;
  return <img src={imagePath} alt={state.form_id} className="w-64 h-64 rounded-xl shadow-lg" />;
}
