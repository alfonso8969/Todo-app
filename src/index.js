import './styles.css'

import { Todo, TodoList } from './classes'
import { createTodoHtml } from './js/components';

const todoList = new TodoList();
todoList.tasks.forEach(task => createTodoHtml(task));
