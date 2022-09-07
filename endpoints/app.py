import json
import os
import random
from flask import Flask, abort, send_from_directory
from flask_cors import CORS

current_dir = os.path.dirname(os.path.realpath(__file__))
patterns_dir = os.path.join(current_dir, "patterns")

# with open(path.join(current_dir, 'config.json'), 'r') as f:
#     config = json.load(f)

app = Flask(__name__)

CORS(app, support_credentials=True)


@app.route('/pattern', methods=['GET'])
@app.route('/pattern/<name>', methods=['GET'])
def fetch_pattern(name=None):
    patterns = os.listdir(patterns_dir)
    filename = None
    if name is None:
        filename = random.choice(patterns)
    else:
        if name in patterns:
            filename = name
        else:
            abort(404)
    return send_from_directory(patterns_dir, filename, as_attachment=True, cache_timeout=0)


if __name__ == "__main__":
    app.run()


