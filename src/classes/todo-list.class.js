import { Todo } from "../classes";

export class TodoList {


    constructor() {
        this.tasks = this.loadLocalStorage();
    }

    addNewTodo( task ) {
        this.tasks.push(task);
        this.saveLocalStorage();
    }

    deleteTodo( id ) {
        this.tasks = this.tasks.filter(task => task.id != id );
        this.saveLocalStorage();
    }

    toggleTodo ( id ) {

        this.tasks.forEach((task) => {
            if (task.id.toString() === id.toString()) {
                task.completed = !task.completed;
            }
        });
        this.saveLocalStorage();
    }

    deleteAllCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed );
        this.saveLocalStorage();
    }
    
    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.tasks));
    }
    
    loadLocalStorage() {
        return this.tasks = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')).map( Todo.fromJSON ) : [];          
    }
}