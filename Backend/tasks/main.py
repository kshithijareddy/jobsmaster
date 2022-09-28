from fastapi import FastAPI
from fastapi.responses import JSONResponse
from google.cloud import datastore
from fastapi.middleware.cors import CORSMiddleware
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from datetime import date
import requests
import uvicorn
import logging

datastore_client = datastore.Client.from_service_account_json('jobsmaster-761921139a35.json')

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


# API for the cron job to send task emails everyday morning
@app.get("/tasks/dailyemail")
async def send_email():
    try:
        response = requests.get('https://jobsmaster.uc.r.appspot.com/api/getusers', headers = {'X-API-Key': 'abcdef123456'})
        if response.status_code == 200:
            data = response.json()
            logging.debug(f"Users : {data}")
            for user in data:
                email = user['email']
                date_today = str(date.today().isoformat())
                html = f'Hello, <br/><br/>'
                tasks = requests.post('https://jobsmaster.uc.r.appspot.com/api/getplanner', json = {"uuid": user['uuid']}, headers = {'X-API-Key': 'abcdef123456'}).json()
                logging.debug(f"User : {user}, tasks : {tasks}")
                tasks_today = []
                for task in tasks:
                    if task['date'] == date_today:
                        tasks_today.append(task)
                if tasks_today:
                    html += 'Below are your tasks for today: <br/><br/>'
                    for task in tasks_today:
                        html += f"{task['title']} <br/>"
                else:
                    html += 'You do not have any tasks for today! <br/>'
                html += '<br/>Regards, <br/> JobsMaster <br/>'
                message = Mail( from_email='yvsaimanikanta@gmail.com',
                                to_emails=email,
                                subject='JobsMaster - Your Tasks for today!',
                                html_content=html)
                logging.debug(f"Email Message : {html}")
                sg = SendGridAPIClient('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')
                response = sg.send(message)
    except Exception as e:
        print(e)
    return JSONResponse(content='Task completed', status_code=200)

if __name__ == "__main__":
    uvicorn.run(app)