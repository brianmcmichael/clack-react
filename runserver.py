from flask import Flask, render_template, request, session
import cgi
import datetime
import time
import json

app = Flask(__name__)

#Settings
app.config['DEBUG'] = True
app.config['PUSHER_CHAT_APP_ID'] = '228760'
app.config['PUSHER_CHAT_APP_KEY'] = '09aa8f6c3429af4d84fe'
app.config['PUSHER_CHAT_APP_SECRET'] = 'f731cd4252908d746509'
app.config['SECRET_KEY'] = '=y\xe6\xa0\xf6A\xd9\xf8\xbaR\xe7\xa9\x94w\xc8\x95\xe5\x7f\x9b\xc7`(4\xb9'

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

@app.route("/setname/", methods=['POST'])
def set_name():
    session['name'] = request.form['name']

    return "Successful"

@app.route("/pusher/auth/", methods=['POST'])
def pusher_authentication():
    auth = pusher_client.authenticate(
        channel=request.form['channel_name'],
        socket_id=request.form['socket_id'],
        custom_data= {
            'user_id': session['name'],
        }
    )

    return json.dumps(auth)

@app.route("/messages/", methods=['POST'])
def new_message():
    name = request.form['name']
    text = cgi.escape(request.form['text'])
    channel = request.form['channel']

    now = datetime.datetime.now()
    timestamp = time.mktime(now.timetuple()) * 1000
    pusher_client.trigger("presence-" + channel, 'new_message', {
        'text': text,
        'name': name,
        'time': timestamp
    })

    return "Successful"

if __name__ == "__main__":
    app.run(host='0.0.0.0')