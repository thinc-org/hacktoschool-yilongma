from flask import Flask, request
import json
from slack_notification import *
from pocketbase_api import *


app = Flask(__name__)


@app.route('/users', methods=["GET", "POST"])
def users():
    if (request.method == 'POST'):      # Create new user
        body = request.get_json()
        return create_user(body['username'], body['email'], body['password'], body['passwordConfirm'], body['name'], body['role'])
    elif (request.method == 'GET'):     # Get list of users
        return get_all_users()


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

@app.route('/notification/slack', methods=["GET"])
def login_sso():
    payload = {'service': 'https://jjus.dev', 'ouid': '6000000021','firstname': 'John', 'lastname': 'Doe'}
    r = requests.get('https://sso.thinc.in.th/login', params=payload)
    try:
        send_notification_slack(record['msg'])
        return {"result": r.url.split('?')[1].split('ticket=')[1]}, 201
    except:
        return {"result": 0}, 500


app.run()
