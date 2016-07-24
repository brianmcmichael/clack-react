from flask import Flask, render_template
app = Flask(__name__)

#Settings
app.config['DEBUG'] = True
app.config['PUSHER_CHAT_APP_ID'] = '228760'
app.config['PUSHER_CHAT_APP_KEY'] = '09aa8f6c3429af4d84fe'
app.config['PUSHER_CHAT_APP_SECRET'] = 'f731cd4252908d746509'

import pusher

pusher_client = pusher.Pusher(
    app_id=app.config['PUSHER_CHAT_APP_ID'],
    key=app.config['PUSHER_CHAT_APP_KEY'],
    secret=app.config['PUSHER_CHAT_APP_SECRET'],
    ssl=True
)

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0')