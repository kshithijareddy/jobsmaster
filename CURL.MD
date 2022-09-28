# CURL Commands

### Example command for CREATE ( adding a new internship) :
curl -X POST -H "Content-Type: application/json" -H "X-API-Key:abcdef123456" -d '{"type":"Internships","title":"Data Engineer Intern","link":"https://www.amazon.jobs/en/jobs/1649144/data-engineer","company":"Amazon","location":"Remote","category":["cs"]}' "https://jobsmaster.uc.r.appspot.com/api/addnewjob"


### Example READ command (getting all the questions) :
curl -X GET -H "Content-Type: application/json" -H "X-API-Key:abcdef123456" "https://jobsmaster.uc.r.appspot.com/api/getquestions"

### Example UPDATE command (update a users application) :
curl -X POST -H "Content-Type: application/json" -H "X-API-Key:abcdef123456" -d '{"uuid":"pyAzjqoKCeVW4Zq2z8n9Arkvur13","companies" : [{"location":"California","company":"Amazon","status":"Applied","title":"SDE I","id":"1","link":null},{"title":"New Grad","status":"Applied","location":"Remote","link":"https://www.uber.com/us/en/careers/","company":"Uber","id":"2"},{"location":"Remote","link":"https://careers.pypl.com/home/default.aspx","status":"Rejected","title":"SDE I","id":"3","company":"Paypal"}]}' "https://jobsmaster.uc.r.appspot.com/api/postapplication"

### Example DELETE command (delete a user enrolled course) :
curl -X DELETE -H "Content-Type: application/json" -H "X-API-Key:abcdef123456" -d '{"uuid":"pyAzjqoKCeVW4Zq2z8n9Arkvur13","course_id":"bd48514a-55c7-4b20-8d84-a57e9dcde792"}' "https://jobsmaster.uc.r.appspot.com/api/deleteusercourse"