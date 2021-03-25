//Imports express
const { query } = require("express");
const express = require("express");
const app = express();

//Imports database and models
const connection = require("./database/database");
const QuestionModel = require("./database/QuestionModel");
const AnswerModel = require("./database/AnswerModel");

//Database connection
connection
    .authenticate()    
    .then(() => { console.log("DB OK!") })
    .catch((error) => { console.log(error) });

//Sets ViewEngine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Sets express to get URL info
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Home Page
app.get("/", (req, res) => {
    //Searches for all questions
    QuestionModel
        .findAll({ raw: true, order: [['id', 'DESC']] })
        //Sends questions to EJS file, renders home page
        .then((questions) => { res.render("index", { questions: questions }) })
        //Sends error message
        .catch((error) => { console.log(error) });
});

//Asking Page
app.get("/ask", (req, res) => { res.render("ask") });

//Saving Page
app.post("/savequestion", (req, res) => {
    //Gets the questions info
    var title = req.body.title;
    var description = req.body.description;
    res.status(200);//Sends an success status

    //Using SEQUELIZE to add ROWS into TABLE
    QuestionModel
        .create({ title: title, description: description })
        //After sending info to DB, redirect user to HomePage
        .then(() => { res.redirect("/") })
        //Log error message, if there is one
        .catch((error) => { console.log(error) });
});

//Question Page
app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    console.log(id)

    QuestionModel
        .findOne({ where: { id: id } })
        .then((question) => {
            if(question != undefined){ 
                AnswerModel
                    .findAll({ 
                        where: { questionId: question.id },
                        order: [['id', 'DESC']]
                    })
                    .then((answers) => {
                        res.render("question", {
                            question: question,
                            answers: answers
                    })
                });
            }else {
                res.redirect("/")
            };
        })
});

app.post("/answer", (req, res) => {
    var body = req.body.body;
    var questionId = req.body.question;

    AnswerModel 
        .create({ body: body, questionId: questionId})
        .then(() => {res.redirect("/question/"+questionId)});
});

//Starts server, and LOG if everything Running
app.listen(8080, () => { console.log("Server OK!") });
