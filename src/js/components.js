import { Todo, TodoList } from '../classes/index'

const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const ibtnDeleteAllCompleted = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filter');
const pendings = document.querySelector('#count');

const newTodoList = new TodoList();

export const createTodoHtml = ( todo ) => {

    pendings.innerText = newTodoList.viewPendings();

    const htmlTodo = `
        <li class="${ todo.completed ? 'completed' : ''}" data-id="${ todo.id }">
			<div class="view">
				<input class="toggle" type="checkbox" title="${ todo.completed ? 'Desmarcar como completada' : 'Marcar como completada'}" ${ (todo.completed) ? 'checked' : '' }  >
				<label>${ todo.task }</label>
				<button type="button" class="destroy" title="Borrar tarea"></button>
			</div>
		    <input class="edit" value="Create a TodoMVC template">
		</li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);


    return div.firstElementChild 
}

// Eventos
inputNewTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        console.log(inputNewTodo.value);
        const newTodo = new Todo(inputNewTodo.value);
        newTodoList.addNewTodo(newTodo);
        createTodoHtml( newTodo );
        inputNewTodo.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {
    const elementName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    newTodoList.toggleTodo(todoId);
    elementName.includes('input') && todoElement.classList.toggle('completed');
    elementName.includes('button') && (newTodoList.deleteTodo( todoId ) , divTodoList.removeChild( todoElement ));
    pendings.innerText = newTodoList.viewPendings();

});

ibtnDeleteAllCompleted.addEventListener('click', () => { 
    newTodoList.deleteAllCompleted();
    Array.from(divTodoList.children)
        .reverse()
        .forEach(child => child.classList.contains('completed') && divTodoList.removeChild(child));
        pendings.innerText = newTodoList.viewPendings();
});

ulFilter.addEventListener('click', event => {
    const filter = event.target.text;
    if (!filter) return;

    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const element of divTodoList.children ) {

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch( filter ) {

            case 'Pendientes':
                if( completed ) {
                    element.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completed ) {
                    element.classList.add('hidden');
                }
            break;

        }
    }
    pendings.innerText = newTodoList.viewPendings();

});

