//shift + alt + down/up arrow:- to copy a line
//alt + down/up arrow:- to move text up/down


// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// The querySelector() method returns the first element that matches a CSS selector.To return all matches (not only the first), use the querySelectorAll() instead.


// Event Listeners

document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

function addTodo(event){
     event.preventDefault();//prevents the form from submitting - ie from refreshing

     //todo div
     const todoDiv = document.createElement('div');
     //To add a new element to the HTML DOM, you must create the element (element node) first, and then append it to an existing element.
     todoDiv.classList.add('todo');
    //The classList property is useful both to add, remove and toggle CSS classes on an element.


     //todo li
     const newTodo = document.createElement('li');
     newTodo.innerText=todoInput.value;
     newTodo.classList.add('todo-item');
     todoDiv.appendChild(newTodo);

     //Save todo to local storage
     saveLocalTodos(todoInput.value);

     //Checkmark button
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<i class="fas fa-check"></i>';
     completedButton.classList.add('complete-btn');
     todoDiv.appendChild(completedButton);

     //Trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add('trash-btn');
     todoDiv.appendChild(trashButton);


     //append to list
     todoList.appendChild(todoDiv);

     //Clear todo input value,after it being added to the list
     todoInput.value="";

     
}


function deleteCheck(e){
    const item = e.target;//The target event property returns the element that triggered the event.The target property gets the element on which the event originally occurred, opposed to the currentTarget property, which always refers to the element whose event listener triggered the event.

    //delete todo
    if(item.classList[0]==="trash-btn"){
        //classList[0] means 1st element of the class
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        
    }
    //checkmark todo
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "complete":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "incomplete":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}
        //e.target.value gives values like all,complete, incomplete because we are adding an event listener to filterOption

        function saveLocalTodos(todo){
            //first check if you already have todos
            let todos;
            if(localStorage.getItem("todos")===null){
                todos=[];
            }
            else{
                todos=JSON.parse(localStorage.getItem("todos"));
            }
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            //The JSON. stringify() method converts a JavaScript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

        }

        function getTodos(todo){
            let todos;
            if(localStorage.getItem("todos")===null){
                todos=[];
            }
            else{
                todos=JSON.parse(localStorage.getItem("todos"));
            }


            todos.forEach(function(todo){

            //todo div
            const todoDiv = document.createElement('div');
            //To add a new element to the HTML DOM, you must create the element (element node) first, and then append it to an existing element.
            todoDiv.classList.add('todo');
            //todo li
            const newTodo = document.createElement('li');
            newTodo.innerText=todo;
            //We need value from local storage.
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
            
            //Checkmark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);
            //Trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);
            //append to list
            todoList.appendChild(todoDiv); 

                 });

             }

             function removeLocalTodos(todo){
                let todos;
                if(localStorage.getItem("todos")===null){
                    todos=[];
                }
                else{
                    todos=JSON.parse(localStorage.getItem("todos"));
                }

                todoIndex= todo.children[0].innerText;
                //removing from array
                todos.splice(todos.indexOf(todoIndex),1);
                //he splice() method adds and/or removes array elements. 
                //arrayname.splice (1st argument:- from what position do you wanna remove,2nd argument:- how many do you wanna remove)
                //removing from local Storage
                localStorage.setItem("todos",JSON.stringify(todos));

    
             }
