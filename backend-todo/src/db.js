const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017");

//09su6umi26xf39Wo
// mongodb+srv://dhiraj:09su6umi26xf39Wo@cluster0.urmzk7m.mongodb.net/?retryWrites=true&w=majority
//mongodb://localhost:27017/newtonDB
// optimize
const getDatabase = async (dbName) => {  // connected to cloud database
  return await mongoose.createConnection(`mongodb+srv://dhiraj:09su6umi26xf39Wo@cluster0.urmzk7m.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const ToDoSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId, if want to explicitely mention object ID
  task: String,
  timestamp: Number,
  done: Boolean,
  by: {
    name: String,
    createdAt: Date,
  },
  tags: [{ tagName: String }],
  // topics: mongoose.Schema.Types.Array -- array with mixed types
  // topics: [mongoose.Schema.Types.Mixed] -- other way of array with mixed types
  topics: [String],
});

const createToDo = async (todoObj, TodoModel) => {
    const newTodo = new TodoModel(todoObj);
    return await newTodo.save(); // saves the newly created todo data within database
}

const getTodoById = async (id, TodoModel) => {
    try{
        return await TodoModel.findById(id);
    } catch(e){
        return null;
    }
}

const main = async () => {

  // to connect to a specific database, preffered as creates connection with db directly
  const newtonDB = await getDatabase("newtonDB");
  const TodoModel = newtonDB.model("Todo", ToDoSchema);

  // Crud Operations

  //Create a todo
  ["Dhiraj", "Manish", "Mrunal", "Rahul", "Sagar"].forEach( async (name)=>{
    return await createToDo({
        task: "Learn about mongoose",
        timestamp: 4324234243234,
        done: false,
        by: {
          name: name,
          createdAt: new Date(),
        },
        tags: [{ tagName: "urgent" }, { tagName: "small-task" }],
        topics: ["education", "mongo"],
      }, TodoModel)
  })

  const newTodo = await createToDo({
    task: "Learn about mongoose",
    timestamp: 4324234243234,
    done: false,
    by: {
      name: "Dhiraj",
      createdAt: new Date(),
    },
    tags: [{ tagName: "urgent" }, { tagName: "small-task" }],
    topics: ["education", "mongo"],
  }, TodoModel)
  
//   console.log("Value of new todo after saving", newTodo.toJSON());
  
  // read existing todo with id
    // const existingTodo = getTodoById('62fa3dc7076d39fe57930970', TodoModel);
    // console.log(existingTodo);

// read all existing todos
// const allTodos = await TodoModel.find();
// const allTodosJSON = allTodos.map((todo)=> todo.toJSON());
// console.log(allTodos);
TodoModel.find

// read todos by specific filter
// const allTodosByFilter = await TodoModel.find({"by.name": "Dhiraj"});
// console.log(allTodosByFilter);


  //update exisiting todo

  // delete existin todo
};

main();
