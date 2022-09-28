## Backend:

- We have used FASTAPI for the backend.
- Command to run the backend: `uvicorn main:app --reload` in the microservice directory.
- We should first install the dependencies: `pip install -r requirements.txt` before running the backend.
- The backend will be hosted on port 8000.
- But as we have deployed our backend in Google App Engine, we can access it through the URL: `https://jobsmaster.uc.r.appspot.com/`.
- Our Swagger documentation is available at the following URLs:
    - https://api-dot-jobsmaster.uc.r.appspot.com/docs
    - https://chat-dot-jobsmaster.uc.r.appspot.com/docs
    - https://tasks-dot-jobsmaster.uc.r.appspot.com/docs

### Frontend:

- We have used Angular for the frontend.
- We have hosted our UI with Netlify, so we can access it through the URL: https://jobsmaster.netlify.app or https://jobsmaster.ml.

- Command to run the frontend locally: `ng serve` in the UI\JobsMaster directory to run the JobsMaster UI. We need to install all the necessary packages using `npm install` command before running the frontend.
- We have created a new Angular project called `ChatUI` for the Chat UI. We can run the Chat UI by running the command `ng serve` in the ChatUI directory after installing all the necessary packages using `npm install` command.
- If we are running both UIs at the same time, we need to run the Chat UI on port 4200 and the JobsMaster UI on port 4201, by running the commands `ng serve --port 4200` and `ng serve --port 4201` respectively.
- If you don't have Angular CLI installed, you can install it by running the following command: `npm install -g @angular/cli` or run the project using `npm start` command instead of `ng serve`.
- By default, Angular will run on port 4200.


### Known Issues:
- An issue we realized was that the Angular WebSockets is not compatible with Google App Engine Standard and is only compatible with Google App Engine Flexible. So to test our Chat UI, we have to run our Chat microservice locally with `uvicorn main:app --reload` command inside Backend\chat directory.
- Our Chat UI will then connect to the Chat microservice running on port 8000.
- All other UI components will connect to the api microservice deployed on Google App Engine and there is no need to run the api microservice locally.
