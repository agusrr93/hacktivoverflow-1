# overflow
Vue Cli, Vuex, Firebase database, Mongoose, Express, Cronjob

### ROUTE API

URL| METHOD | DESCRIPTION
---------------------|----------------------|----------------------
`/questions/`| post | create a question input **title, description, category** required token
`/questions/`| get | get all questions
`/questions/pop`| get  |  get popular questions base on answers
`/questions/mine`| get  | get all user login question require token
`/questions/:id`| get  | get question by id
`/questions/:id`| put  | update question by id
`/questions/:id/vote`| patch  | up vote a questions
`/questions/:id/unvote`| patch  | down vote a question
`/questions/:id`| delete  | delete a question
`/questions/:search/search`| get  | search question base title of questions
`/answers/:question` | post | create a question with input **answer** and params **id of question**
`/answers/:id` | delete | delete a answer
`/answers/:id/vote` | patch | up vote a answer
`/answers/:id/unvote` | patch | downvote a answer
`/categories` | post | create a category with input **name** of category
`/categories` | get | get all categories
`/categories/:id` | put | update a category
`/categories/:id` | delete | delete a category
`/users/signup` | post | sign up with email
`/users/fb` | post | sign up or in with facebook
`/users/signin` | post | sign in with email
`/users/one` | get | get user login with token
`/users/` | get | get all users