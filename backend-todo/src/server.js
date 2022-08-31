const express = require('express');
const mongoose = require("mongoose"); //
const fs = require('fs')
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

const getDatabase = async (dbName) => {
    return await mongoose.createConnection(`mongodb+srv://dhiraj:09su6umi26xf39Wo@cluster0.urmzk7m.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const TDSchema = new mongoose.Schema({
    task: String,
    done: Boolean,
})


const getModel = async() => {
    const todoDB = await getDatabase("todoDB");
    return todoDB.model("todo", TDSchema);
}

//create data
app.post('/todo', async (req, res)=>{
    const data = req.body;
    const newTask = data.task;
    TDModel = await getModel();
    const newTodo = new TDModel({task:newTask, done:false});
    const savedb = await newTodo.save();
    console.log("Data base response"+savedb);
    if(!savedb._id){
        res.status(500).send("Something went wrong", savedb)
    } else{
        res.status(201).send(savedb);
    }
    // data.id = new Date().valueOf()

    // fs.writeFile(`todos/${data.id}.json`, JSON.stringify(data), 'utf-8', (err)=> {
    //     if(err){
    //         res.status(500).send(err)
    //     } else{
    //         res.status(201).send(data)
    //     }
    // })
})

// update existing data
app.put('/todo/:todoID', (req, res)=> {
    const data = req.body;
    const todoID = req.params.todoID;
    fs.readFile(`todos/${todoID}.json`, 'utf-8', (err, fileData)=>{
        if(err){
            res.status(404).send("File Not Found");
        }else{
            const existingData = JSON.parse(fileData);
            existingData.task = data.task;
            fs.writeFile(`todos/${todoID}.json`, JSON.stringify(existingData), 'utf-8', (err)=>{
                if(err){
                    res.status(500).send(err)
                } else{
                    res.status(201).send(existingData);
                }
            })
        }
    })
})

// delete existing data

app.delete('/todo/:todoId', (req, res)=>{
    const todoId = req.params.todoId

    fs.unlink(`todos/${todoId}.json`, (err)=>{
        if(err){
            res.status(404).send('Record not found')
        } else{
            res.sendStatus(200)
        }
    })
})

app.get('/todo', (req,res)=> {
    const arr = []
    fs.readdir('todos', (err, files)=>{
        if(err){
            res.status(404).send("files not found", err)
        } else{
            files.map((file)=> {
                fs.readFile('todos/'+ file, 'utf-8', (err, fileData)=>{
                    if(err){
                        res.status(404).send(err);
                    } else {
                        const jsonData = JSON.parse(fileData)
                        arr.push(jsonData);
                        if(arr.length === files.length){
                            res.status(200).send(arr);
                        }
                    }
                })
            })
        }
    })
})

app.listen(9090)