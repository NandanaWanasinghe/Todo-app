const TodoModel = require("../models/TodoModel");


const createTodo = async (req,resp)=>{

  try {

    const { title, description } = req.body;

    const newTodo = await TodoModel.create({ title, description });
    resp.status(201).json(newTodo);

  } catch (error) {

    console.error('Error creating todo:', error);
    resp.status(500).json({ error: 'Internal Server Error' });

  }
         
}
const findAll = async (req, resp) => {
  try {

    const todos = await TodoModel.findAll();
    return resp.status(200).json(todos);

  } catch (error) {

    console.error(error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteById = async (req,resp) => {
  const { id } = req.params;
  const deleteData = await TodoModel.destroy({
    where:{
      id
    }
  });

  if (deleteData){
      return resp.status(204).json({'message':'deleted'});
  }
  else {
      return resp.status(500).json({'message':'internal server error'});
  }
}
const updateTodo = async (req, resp) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await TodoModel.findByPk(id);

    if (!todo) {
      return resp.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    await todo.save();

    return resp.status(200).json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return resp.status(500).json({ error: 'Internal Server Error' });
  }
}
const findById = async (req, resp) => {
  try {
    const todoId = req.params.id; // Assuming the ID is passed as a route parameter

    const todo = await TodoModel.findByPk(todoId);

    if (todo) {
      return resp.status(200).json(todo);
    } else {
      return resp.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports={
    createTodo,findAll,deleteById,updateTodo,findById
}