// MODULE DEPENDENCIES
const express = require("express");
const app = express();

// MODULE DEPENDENCIES
const dotenv = require("dotenv");
dotenv.config();

// MODELS
const TodoTask = require("./models/TodoTask");

// MODULE DEPENDENCIES
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    // PORT LISTENER
    app.listen(3000, () => console.log("Server Up and running"));
});

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// HTTP METHODS 
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    // CONTROL FLOW
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

// HTTP METHODS 
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

// HTTP METHODS 
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

// HTTP METHODS 
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    // CONTROL FLOW
    if (err) return res.send(500, err);
        res.redirect("/");
    });
});