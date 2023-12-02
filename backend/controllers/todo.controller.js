import { Todo } from "../models/todo.model.js";
import { CustomAPIError } from "../errors/custom_error.js";

const createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return next(new CustomAPIError(400, "All filed are required"));
    }
    const todo = await Todo.create({ text });
    res.status(201).json({ todo, msg: "Todo is created" });
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    if (!todos) {
      return next(new CustomAPIError(404, "Todos not found"));
    }
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return next(new CustomAPIError(404, "Todo not found"));
    }
    res.status(200).json({ msg: "todo deleted successfull" });
  } catch (error) {
    next(error);
  }
};



const toggleTodo = async (req, res, next) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json({ todo, msg: "Toggle successfull" });
  } catch (error) {
    next(error);
  }
};

export { createTodo, getAllTodos, deleteTodo,toggleTodo };
