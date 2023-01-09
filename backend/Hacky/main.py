from flask import Flask, request
import json
from slack_notification import *
from pocketbase_api import *


app = Flask(__name__)


@app.route('/', methods=["GET"])
def hello_world():
    return {"message": "Hello!"}, 201


@app.route('/courses', methods=["POST", "GET"])
def courses():
    if (request.method == 'GET'):
        return get_all_courses()
    else:
        body = request.get_json()
        return create_course(body['name'], body['instructor_id'])


@app.route('/courses/<string:id>', methods=["GET", "PUT", "DELETE"])
def course(id):
    if (request.method == 'GET'):
        return get_course_by_id(id)
    elif (request.method == 'DELETE'):
        return delete_course_by_id(id)
    else:
        return 0


@app.route('/notification/slack', methods=["POST"])
def slack_noti():

    record = json.loads(request.data)
    try:
        send_notification_slack(record['msg'])
        return {"result": 1}, 201
    except:
        return {"result": 0}, 500


app.run()
