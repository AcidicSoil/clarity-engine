/** @type {import('codefetch').CodefetchConfig} */
export default {
  projectTree: 5,
  tokenLimiter: "truncated",
  defaultPromptFile: "default.md",

  meta: {
    veilIdentity: "SIGMA_VEIL",
    projectName: "clarity_or_death",
    projectDirectoryPath: "/mnt/data/clarity_or_death",
    description: "Ritual-forged agentic clarity engine with executable judgment layers."
  },

  include: [
    "clarity-engine/daemon/",
    "clarity-engine_GPT-outputs_needs-judgement",
    "clarity-or-death-bootstrap/*",
    "clarity-engine/ritual_manifest/",
    "clarity-engine/rituals/",
    "clarity-engine/ui/",
    "ritual_manifest/spells.log.json",
    "ritual_manifest/system_state.json",
    "index.js",
    "codefetch.config.mjs"
  ],

  exclude: [
    ".git/",
    "scratch.txt",
    "README.md",
    "node_modules/",
    "undecanted-judgements-awaited-veil/"
  ]
};
