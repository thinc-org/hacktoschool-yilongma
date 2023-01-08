import slack
import json

with open('token.json') as json_file:
    SLACK_TOKEN = json.load(json_file)['DISCORD_TOKEN']


def send_notification_slack(msg):
    client = slack.WebClient(token=SLACK_TOKEN)
    client.chat_postMessage(channel='#bot', text=msg)
