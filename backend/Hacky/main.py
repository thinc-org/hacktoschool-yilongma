from flask import Flask, request
import json
from slack_notification import *


app = Flask(__name__)


@app.route('/', methods=["GET"])
def hello_world():
    return {"message": "Hello!"}, 201


@app.route('/notification/slack', methods=["POST"])
def slack_noti():
    record = json.loads(request.data)
    try:
        send_notification_slack(record['msg'])
        return {"result": 1}, 201
    except:
        return {"result": 0}, 500


app.run()
