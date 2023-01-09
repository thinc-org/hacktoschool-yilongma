import requests
import json


def get_all_courses(sort='', filter=''):
    response = requests.get('https://pb.jjus.dev/api/collections/courses/records?sort='+sort+'&filter='+filter)
    return response.json()


def get_course_by_id(id):
    response = requests.get('https://pb.jjus.dev/api/collections/courses/records/'+id)
    return response.json()


def delete_course_by_id(id):
    try:
        response = requests.delete('https://pb.jjus.dev/api/collections/courses/records/'+id)
        return {'status': 205}
    except:
        return {'status': 500}


def create_course(name, instructor_id):
    data = {'name': name, 'instructor_id': instructor_id}
    print(data)
    response = requests.post('https://pb.jjus.dev/api/collections/courses/records', json=data)
    return response.json()
