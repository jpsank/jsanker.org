from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=['http://localhost:3000', 'http://localhost:8888', 'http://jsanker.org'])

from app import routes

