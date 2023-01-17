from flask import Flask, request, jsonify
import json
from slack_notification import *
from pocketbase_api import *
from flask_mail import Mail, Message
from discord_webhook import DiscordWebhook

app = Flask(__name__)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '<sender_gmail>'
app.config['MAIL_PASSWORD'] = '<gmail_app_key>'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

endpoint_secret = '<stripe_token>'

@app.route('/notification/slack', methods=["POST"])
def slack_noti():

    record = json.loads(request.data)
    try:
        send_notification_slack(record['msg'])
        return {"result": 1}, 201
    except:
        return {"result": 0}, 500


@app.route('/notification/discord', methods=["POST"])
def discord_noti():

    record = json.loads(request.data)
    try:

        webhook = DiscordWebhook(url='<discord_webhook_url>', rate_limit_retry=True,
                                 content=record['msg'])
        response = webhook.execute()
        return {"result": 1}, 201
    except:
        return {"result": 0}, 500


@app.route('/notification/mail', methods=["POST"])
def mail_noti():

    record = json.loads(request.data)

    msg = Message(record['title'], sender='<sender_gmail>', recipients=record['recipients'])
    msg.body = record['msg']
    mail.send(msg)
    return {"result": 1}, 201


@app.route('/notification/sso', methods=["GET"])
def login_sso():
    payload = {'service': 'https://jjus.dev', 'ouid': '6000000021', 'firstname': 'John', 'lastname': 'Doe'}
    r = requests.get('https://sso.thinc.in.th/login', params=payload)
    try:
        send_notification_slack("")
        return {"result": r.url.split('?')[1].split('ticket=')[1]}, 201
    except:
        return {"result": 0}, 500


app.run()