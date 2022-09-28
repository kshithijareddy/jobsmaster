# API SPECIFICATION


# API Microservice :

# /api/getusers :
    GET :   returns all the registered users.

# /api/getapplications :
    POST :  body - userUUID (BaseModel)
            returns all the job applications of a particular user

# /api/postapplication :
    POST :  body - PutCompany (BaseModel)
            creates a new job application for the particular user

# /api/getcourses :
    GET :   returns all the courses in the web app.

# /api/getusercourses :
    GET :   body - userUUID (BaseModel)
            returns all the enrolled courses of a user.

# /api/addnewcourse :
    PUT :   body - Course (BaseModel)
            adds a new course for the All Cources tab in the web app (used by admins).

# /api/buycourse :
    POST :  body - UpdateCourse (BaseModel)
            enrolls a user to a course.

# /api/deleteusercourse :
    DELETE :body - UpdateCourse (BaseModel)
            Drops a user from an enrolled course.

# /api/getjobs :
    GET :   body - JobType (BaseModel)
            returns all the jobs in the web app for a particulat type(Internships/Fulltime).

# /api/addnewjob :
    POST :  body - Job (BaseModel)
            adds a job to the web app (Used by admins).

# /api/getplanner :
    GET :   body - userUUID (BaseModel)
            returns all the daily tasks of a user.

# /api/postplanner :
    POST :  body - Planner (BaseModel)
            adds a new daily task for a user.

# /api/getquestions :
    GET :   returns all the questions for the 'Coding' tab of the web app.

# /api/postquestion :
    POST :  body - Question (BaseModel)
            adds a new question to the web app (used by admins).

# /api/getmentors :
    GET :   returns all the mentor details.

# /api/addmentor :
    POST :  body - Mentor (BaseModel)
            adds a new mentor to the web app (used by admins).


# Chat Microservice :

# /chat/getchats :
    GET :   returns all the previous messages in the community chat.


# Tasks Microservice :

# /tasks/dailyemail :
    GET :   runs a cron job to send emails about tasks to every user every day.
