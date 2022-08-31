const mongoose = require("mongoose");

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

const createNewToDo = async( todoObj , TDModel) => {
    const newTodo = new TDModel(todoObj);
    return await newTodo.save();
}

const updateTodo = async (TDModel, id, newTask) => {
    return await TDModel.updateOne({_id:id}, {task: newTask});
}

const updateTodoStatus = async (TDModel, id, status) => {
    return await TDModel.updateOne({_id:id}, {done: status});
}

const deleteTodo = async (TDModel, id) => {
    return await TDModel.deleteOne({_id:id});
}

const main = async () => {
    const todoDB = await getDatabase("todoDB");
    const TDModel = todoDB.model("todo", TDSchema);
    
    // create todo 
    // const newTodo = await createNewToDo({task: "React Project", done: false}, TDModel);
    // console.log("First Query", newTodo);

    // update existing data
    // const todoUpdate = await TDModel.updateOne({_id:"62ffd4f3450e495b57c3815f"}, {task: "Updated task"});
    // console.log(todoUpdate);

    // delete existing data single and many
    // const deleteRecord = await TDModel.deleteOne({_id:"62ffd4f3450e495b57c3815f"});
    // console.log("Deleted record", deleteRecord);

    // retrieve all data
    // const getData = await TDModel.find();
    // console.log("All records within collection", getData);
    // const res = await updateTodoStatus(TDModel,"62ffd4a5ccdb828811c355a8", true);
    // console.log(res)
}

main();