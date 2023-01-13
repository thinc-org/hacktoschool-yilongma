from flask import Flask, request, jsonify
import json
from slack_notification import *
from pocketbase_api import *
from flask_mail import Mail, Message


import os
import stripe


app = Flask(__name__)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'mailhw1234@gmail.com'
app.config['MAIL_PASSWORD'] = 'sdgmlgsthwjmpixu'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

endpoint_secret = 'whsec_MMHtiLZEuignGR0LshbYYhwFaqtEpyFx'


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


@app.route('/notification/mail', methods=["POST"])
def mail_noti():

    record = json.loads(request.data)

    msg = Message(record['title'], sender='mailhw1234@gmail.com', recipients=record['recipients'])
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


@app.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event['type'] == 'checkout.session.async_payment_failed':
        session = event['data']['object']
    elif event['type'] == 'checkout.session.async_payment_succeeded':
        session = event['data']['object']
    elif event['type'] == 'checkout.session.completed':
        session = event['data']['object']
    elif event['type'] == 'checkout.session.expired':
        session = event['data']['object']
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)


app.run()
