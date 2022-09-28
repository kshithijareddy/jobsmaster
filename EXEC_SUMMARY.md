# JobsMaster

Jobs Master is a one stop destination for job preparation and search. This portal is intended to target users that are looking for jobs and would want to have all the data regarding their job applications, preparations, daily tasks at one place.  Content like Jobs, Courses can be added by admin from the Swagger link. 

- Users can go to `Daily Planner` tab to view their tasks and to add tasks for a particulate day.
- `Applications` tab is used to view and manage a user’s job applications. 
- `My Courses` tab displays all the courses that the user is enrolled in. 
- User can enroll into a course from the `All Courses` tab. 
- `Practice` tab is used to practice coding questions on leetcode and to schedule meetings with Mentors for mock interviews. 
- The `Job Search` tab has data of the open Internship and Full-time jobs for various companies. 
- The `Community Chat` can be used to communicate with other users and this chat is completely anonymous. 

The application will also send emails every day to all the users to let them know their tasks for that day. We have also implemented censorship in the community chat. Any censored message will not appear in the chat. It will only appear to the person who sent the message as `Censored`.

#### Monthly Usage Estimate (for 1M monthly users and 100K daily active users)
- DataStore
    - Users read from several APIs to get the data belonging to them as well as global data like Jobs, Courses, etc.
    - They also write to the Datastore to store their data like their daily tasks, applications, etc.
    - Approx. ~35 reads per day and ~25 writes per day per user
    - Total: 1050 reads per month and 750 writes per month per user
    - That makes 105M reads per month and 75M writes per month for 1M users
    - Assuming we use Multi-region location, rates will be $$ $0.6 per Million reads and $1.8 per Million writes
    - As it's all text data or JSON, we wouldn't be using much storage and it's not a big deal of a cost.
    - Total expense: 198$ per month
- Firebase Auth
    - As we are only using email and password for authentication, there is no cost for Firebase Auth.
- App Engine
    - Assuming we run 4 F1 instances per hour, estimated cost is $104 per month.
- Cloud Functions
    - Our chat censoring function is a small function that we have written and deployed to Cloud Functions.
    - Assuming every active user sends 5 messages per day, daily messages will be 500K for 100K daily active users.
    - As first 2M cloud functions are free, for the remaining 13M chats, we will be paying at $$ $0.4/million messages, which is $5.2 per month.
- Cloud Scheduler
    - We have scheduled a daily email task to send emails to all the users.
    - Cost for one CRON job is only $0.1 per month.
- SendGrid
    - We have used SendGrid for sending emails.
    - As it's a huge package of ~30M emails per month, we would be taking a Premier Custom package at $$ $36000 annually (estimate is from [web](https://capiche.com/q/how-much-are-you-paying-for-sendgrid)). That's $3000 per month.
    - This is a big deal of a cost and we would be re-evaluating the solution if we were to use SendGrid.
- Netlify
    - We have used Netlify for the UI deployment.
    - This is a free service and we don't have to pay for it.

- This makes the total cost of the project $$ $307 per month without the cost of SendGrid and $3307 per month with the cost of SendGrid.
    
