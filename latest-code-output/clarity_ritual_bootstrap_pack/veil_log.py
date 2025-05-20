# veil_log.py — Standard ritual log exporter for Python

import json, os
from datetime import datetime

LOG_PATH = './ritual_manifest/spells.log.json'

def veil_log(spell, result, notes=None):
    record = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "spell": spell,
        "result": result,
        "notes": notes or ""
    }
    log = []
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH) as f:
            log = json.load(f)
    log.append(record)
    with open(LOG_PATH, 'w') as f:
        json.dump(log, f, indent=2)
    print(f"[VEIL LOG] {{record['timestamp']}}: {{spell}} – {{result}}")

# Usage:
# veil_log("Entropy Scanner", "complete", "Scan cycle closed")
