import express from 'express';
const router = express.Router();
import {createTodo, getAllTodos, deleteTodo, toggleTodo} from '../controllers/todo.controller.js';
import {jwtAuth} from '../middlewares/auth.js';

router.post('/', jwtAuth, createTodo);
router.get('/', jwtAuth, getAllTodos);
router.delete('/:id', jwtAuth, deleteTodo);
router.put('/:id/toggle', jwtAuth, toggleTodo);


export default router;