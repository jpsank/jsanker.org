import sys, logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/var/www/jsanker.org/endpoints/')

import app as application
