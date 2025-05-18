from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__)

@app.route("/ritual/openapi.yaml")
def serve_spec():
    return send_from_directory(".", "openapi.yaml", mimetype="application/yaml")

@app.route("/ritual/veil", methods=["POST"])
def veil():
    return jsonify({"result": "Veil engaged."})

@app.route("/ritual/castEntropy", methods=["POST"])
def cast_entropy():
    return jsonify({"result": "Entropy cast."})

@app.route("/ritual/cut", methods=["POST"])
def cut_contradiction():
    input_data = request.json.get("input", "")
    return jsonify({"interrogation": f"Cut executed on input: {input_data}"})

@app.route("/ritual/query", methods=["POST"])
def query_reveal():
    return jsonify({"phase": "REVEAL", "status": "Queried successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4621)
