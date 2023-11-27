
from flask import abort, send_from_directory
from flask_cors import CORS
import json
import os
import random
from app import app
from config import DATADIR


PATTERN_DIR = os.path.join(DATADIR, 'patterns')

# Load the list of patterns
with open(os.path.join(PATTERN_DIR, '_index_.json')) as f:
    PATTERN_LIST = json.load(f)


@app.route('/pattern', methods=['GET'])
@app.route('/pattern/<name>', methods=['GET'])
def fetch_pattern(name=None):
    filename = None
    if name is None:
        filename = random.choice(PATTERN_LIST)
    else:
        if name in PATTERN_LIST:
            filename = name
        else:
            abort(404)
    return send_from_directory(PATTERN_DIR, filename, as_attachment=True, max_age=0)

