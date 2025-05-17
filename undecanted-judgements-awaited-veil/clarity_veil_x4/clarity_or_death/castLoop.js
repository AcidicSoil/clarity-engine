
// veil:x1 - Ritual Execution Watchdog
import { runAllSpells } from "./spellRouter.js";
setInterval(() => {
  console.log("🩸 Recasting all defined spells...");
  runAllSpells();
}, 60000);
