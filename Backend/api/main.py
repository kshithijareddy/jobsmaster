from fastapi import FastAPI, Request, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from google.cloud import datastore
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import auth, credentials
from functools import wraps
import uuid
import firebase_admin
import uvicorn
import logging

datastore_client = datastore.Client.from_service_account_json('jobsmaster-761921139a35.json')
cred = credentials.Certificate("jobsmaster-firebase-adminsdk-me96h-3e4de63157.json")
firebase_admin.initialize_app(cred)

# Initializing FastAPI
app = FastAPI(
    title="JobsMaster",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Base Models for FastAPI api's
class userUUID(BaseModel):
    uuid: str

class PutCompany(BaseModel):
    uuid: str
    companies: list

class Course(BaseModel):
    title: str
    description: str
    category: str
    link: str
    image: str

class UpdateCourse(BaseModel):
    uuid: str
    course_id: str

class JobType(BaseModel):
    type: str

class Job(BaseModel):
    company: str
    title: str
    link: str
    category: list
    location: str
    type: str

class Planner(BaseModel):
    uuid: str
    tasks: list

class Question(BaseModel):
    type: str
    question: str
    url: str
    description: str

class Mentor(BaseModel):
    name: str
    image: str
    company: str
    availability: list


# Decorator for API Key Authorization
def require_api_key(f):
    @wraps(f)
    async def decorated_function(*args, request: Request,**kwargs):
        if request.headers.get('X-API-Key') != 'abcdef123456':
            raise Exception401(message= 'Invalid API Key')
        return await f(*args, request, **kwargs)
    return decorated_function


# Dummy home page for the application
@app.get("/")
async def hello():
    return {"message": "Hello World from Mani and Kshithija"}


# API to get all the users registered in the application
@app.get('/api/getusers')
@require_api_key
async def get_users(request: Request, X_API_Key: str = Header(default=None)):
    users = []
    try: 
        for user in auth.list_users().iterate_all():
            logging.debug(user)
            data = {"uuid": user.uid, "email": user.email}
            users.append(data)
        return JSONResponse(status_code=200, content=users)
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to get the job applications for a particular user
@app.post("/api/getapplications")
@require_api_key
async def get_applications(request : Request, user: userUUID, X_API_Key: str = Header(default=None)):
    try:
        uuid = user.dict()['uuid']
        logging.debug(uuid)
        key = datastore_client.key('Applications', uuid)
        if datastore_client.get(key) is None:
            return []
        return datastore_client.get(key)['companies']
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a job application for a partcular user
@app.post("/api/postapplication")
@require_api_key
async def post_application(request : Request, companies: PutCompany, X_API_Key: str = Header(default=None)):
    company_dict = companies.dict()
    logging.debug(f"Input : {company_dict}")
    try:
        key = datastore_client.key('Applications', company_dict['uuid'])
        entity = datastore_client.get(key)        
        if entity is None:
            entity = datastore.Entity(key)
            entity['companies'] = []
        entity['companies'] = company_dict['companies']
        logging.debug(f"Entity : {entity}")
        datastore_client.put(entity)
    except Exception as err:
        logging.error(err)
        raise Exception500(message=err)
    return entity


# API to get all the courses available in the app
@app.get('/api/getcourses')
@require_api_key
async def get_courses(request : Request, X_API_Key: str = Header(default=None)):
    try:
        query = datastore_client.query(kind='Courses')
        logging.debug(f"Courses : {query.fetch()}")
        return list(query.fetch())
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to get the courses that a particular user is enrolled in
@app.post('/api/getusercourses')
@require_api_key
async def get_user_courses( request : Request, user: userUUID, X_API_Key: str = Header(default=None)):
    try:
        uuid = user.dict()['uuid']
        key = datastore_client.key('UserCourses', uuid)
        entity = datastore_client.get(key)
        if entity is None:
            return []
        course_id_list = entity['courses']
        course_list = []
        for id in course_id_list:
            new_key = datastore_client.key('Courses', id)
            new_entity = datastore_client.get(new_key)
            course_list.append(new_entity)
        logging.debug(f"Courses : {course_list}")
        return course_list
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a new course to the app - Used by admin
@app.put('/api/addnewcourse')
@require_api_key
async def add_course(request : Request, course: Course, X_API_Key: str = Header(default=None)):
    try:
        course_dict = course.dict()
        id = str(uuid.uuid4())
        key = datastore_client.key('Courses', id)
        entity = datastore.Entity(key)
        entity['title'] = course_dict['title']
        entity['description'] = course_dict['description']
        entity['category'] = course_dict['category']
        entity['link'] = course_dict['link']
        entity['id'] = id
        entity['image'] = course_dict['image']
        datastore_client.put(entity)
        logging.debug(f"New Course : {entity}")
        return entity
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API for a user to enroll/buy a course
@app.post('/api/buycourse')
@require_api_key
async def buy_course(request : Request, buy_course: UpdateCourse, X_API_Key: str = Header(default=None)):
    try:
        uuid = buy_course.dict()['uuid']
        course_id = buy_course.dict()['course_id']
        key = datastore_client.key('UserCourses', uuid)
        entity = datastore_client.get(key)
        if entity is None:
            entity = datastore.Entity(key)
            entity['courses'] = []
        if course_id in entity['courses']:
            raise Exception409(message="User already bought the course!")
        entity['courses'].append(course_id)
        datastore_client.put(entity)
        logging.debug(f"Bought course : {entity}")
        return entity
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API for a user to drop a course
@app.delete('/api/deleteusercourse')
@require_api_key
async def delete_course(request : Request, course: UpdateCourse, X_API_Key: str = Header(default=None)):
    try:
        uuid = course.dict()['uuid']
        course_id = course.dict()['course_id']
        key = datastore_client.key('UserCourses', uuid)
        entity = datastore_client.get(key)
        entity['courses'].remove(course_id)
        datastore_client.put(entity)
        return entity
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to get all the jobs of a particular type (Internships/Full-time) in the app
@app.post('/api/getjobs')
@require_api_key
async def get_jobs(request : Request, jobType : JobType, X_API_Key: str = Header(default=None)):
    try:
        type = jobType.dict()['type']
        query = datastore_client.query(kind=type)
        logging.debug(f"Jobs : {list(query.fetch())}")
        return list(query.fetch())
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a new job to the app - Used by admin
@app.post('/api/addnewjob')
@require_api_key
async def add_course(request : Request, job: Job, X_API_Key: str = Header(default=None)):
    try:
        job_dict = job.dict()
        id = str(uuid.uuid4())
        key = datastore_client.key(job_dict['type'], id)
        entity = datastore.Entity(key)
        entity['title'] = job_dict['title']
        entity['category'] = job_dict['category']
        entity['link'] = job_dict['link']
        entity['id'] = id
        entity['company'] = job_dict['company']
        entity['location'] = job_dict['location']
        datastore_client.put(entity)
        logging.debug(f"New job : {entity}")
        return entity
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to get daily planner details of a particular user
@app.post("/api/getplanner")
@require_api_key
async def get_planner(request : Request, user: userUUID, X_API_Key: str = Header(default=None)):
    try:
        uuid = user.dict()['uuid']
        key = datastore_client.key('Planner', uuid)
        if datastore_client.get(key) is None:
            return []
        return JSONResponse(status_code=200,content= datastore_client.get(key)['tasks'])
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a daily task for a partcular user
@app.post("/api/postplanner")
@require_api_key
async def post_planner(request : Request, tasks: Planner, X_API_Key: str = Header(default=None)):
    task_dict = tasks.dict()
    try:
        key = datastore_client.key('Planner', task_dict['uuid'])
        entity = datastore_client.get(key)          
        if entity is None:
            entity = datastore.Entity(key)
            entity['tasks'] = []
        entity['tasks'] = task_dict['tasks']
        datastore_client.put(entity)
        logging.debug(f"New task : {entity}")
    except Exception as err:
        logging.error(err)
        raise Exception404(message=err)
    return entity


# API to get all questions for the Coding tab in the app
@app.get('/api/getquestions')
@require_api_key
async def get_questions(request : Request, X_API_Key: str = Header(default=None)):
    try:
        result = {}
        key = datastore_client.key('Questions', 'easy')
        entity = datastore_client.get(key)
        if entity is not None:
            result['easy'] = entity['questions']
        else: 
            result['easy'] = []
        key = datastore_client.key('Questions', 'medium')
        entity = datastore_client.get(key)
        if entity is not None:
            result['medium'] = entity['questions']
        else:
            result['medium'] = []
        key = datastore_client.key('Questions', 'hard')
        entity = datastore_client.get(key)
        if entity is not None:
            result['hard'] = entity['questions']
        else:
            result['hard'] = []
        logging.debug(f"Questions : {result}")
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a new question to the app - Used by admin
@app.post('/api/postquestion')
@require_api_key
async def post_question(request : Request, question : Question, X_API_Key: str = Header(default=None)):
    try:
        question_dict = question.dict()
        key = datastore_client.key('Questions',question_dict['type'])
        entity = datastore_client.get(key)
        del question_dict['type']
        if entity is None:
            entity = datastore.Entity(key)
            entity['questions'] = []
        entity['questions'].append(question_dict)
        datastore_client.put(entity)
        logging.debug(f"New Question : {entity}")
        return JSONResponse(content=entity, status_code=200)
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to get all the mentors in the app
@app.get('/api/getmentors')
async def get_mentors(request : Request, X_API_Key: str = Header(default=None)):
    try:
        query = datastore_client.query(kind='Mentors')
        logging.debug(f"Mentors : {list(query.fetch())}")
        return list(query.fetch())
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# API to add a new mentor to the app - Used by admin
@app.post('/api/addmentor')
async def add_mentor(request : Request, mentor : Mentor, X_API_Key: str = Header(default=None)):
    try:
        mentor_dict = mentor.dict()
        id = str(uuid.uuid4())
        key = datastore_client.key('Mentors', id)
        entity = datastore.Entity(key)
        entity['name'] = mentor_dict['name']
        entity['image'] = mentor_dict['image']
        entity['company'] = mentor_dict['company']
        entity['availability'] = mentor_dict['availability']
        datastore_client.put(entity)
        logging.debug(f"New Mentor : {entity}")
        return JSONResponse(content=entity, status_code=200)
    except Exception as e:
        logging.error(e)
        raise Exception500(message=e)


# Custom Exception Classes
class Exception404(Exception):
    def __init__(self, message: str ):
        self.message = message

class Exception409(Exception):
    def __init__(self, message: str ):
        self.message = message

class Exception401(Exception):
    def __init__(self, message: str ):
        self.message = message

class Exception500(Exception):
    def __init__(self, message: str ):
        self.message = message


# Custom exception handlers
@app.exception_handler(Exception404)
async def Exception404Handler(request: Request, exception : Exception404):
    return JSONResponse(status_code=404, content={"message": exception.message})

@app.exception_handler(Exception409)
async def Exception409Handler(request: Request, exception : Exception409):
    return JSONResponse(status_code=409, content={"message": exception.message})

@app.exception_handler(Exception401)
async def Exception404Handler(request: Request, exception : Exception401):
    return JSONResponse(status_code=401, content={"message": exception.message})

@app.exception_handler(Exception500)
async def Exception404Handler(request: Request, exception : Exception500):
    return JSONResponse(status_code=500, content={"message": exception.message})


if __name__ == "__main__":
    uvicorn.run(app)





