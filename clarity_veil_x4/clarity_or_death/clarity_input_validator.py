
# veil:x2 - Frame Binder
def validate_clarity_input(spell):
    required_fields = ["spell", "phase", "contradiction", "object"]
    for field in required_fields:
        if field not in spell:
            raise ValueError(f"Missing clarity field: {field}")
    print("🧠 Spell frame integrity confirmed.")
