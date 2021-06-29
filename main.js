'use strict'

var todoList = [
    {
        name: 'HTML'
    },
    {
        name: 'CSS'
    },
    {
        name: 'Javascript'
    },
    {
        name: 'MogoDB'
    },
    {
        name: 'ExpressJS'
    },
    {
        name: 'ReactJs'
    },
    {
        name: 'NodeJS'
    }
]

var pendingList = [
]
var  indexTodo;
var editMode = false;
renderTodoList()
renderPendingList()

function renderTodoList () {
    var html = ''
    for(var i = 0; i < todoList.length; i++) {
        var list = todoList[i]
        html+= `
        <li class="todo-item">
           ${list.name}
            <i class='bx bx-x delete-btn' onclick="onDeleteTodo(${i})"></i>
            <i class='bx bxs-edit-alt edit-btn' onclick="onEditTodo(${i})"></i>
        </li>
        `
    }
    setHTML('.todo-list', html)
}

function renderPendingList () {
    var html = ''
    for(var i = 0; i < pendingList.length; i++) {
        var list = pendingList[i]
        html+= `
        <del> 
            <li class="peding-item">
            ${list.name}
            <i class='bx bx-x delete-btn' onclick="onDeletePeding(${i})"></i> 
            <i class='bx bx-rotate-left repair-btn' onclick="onRepairPeding(${i})"></i>
            </li>
        </del>
       
        `
    }
    setHTML('.pending-list', html)
}

function setHTML(selector, html) {
    var element = document.querySelector(selector)
    element.innerHTML = html
}

// Add

function createTodo () {
    if(editMode) {
        editStudentHandle()
        setHTML('.add-btn', 'Add')
        disableEditMode()
    }else {
        var name = getInputValue('.input')
        var todo = {
            name   : name
        }
        addTodo(todo)
        renderTodoList()
    }
}

function getInputValue (selector) {
    var element = document.querySelector(selector)
    return element.value;
}

function addTodo (todo) {
    todoList.push(todo)
}

// Delete

function onDeleteTodo(index) {
    deleteTodo(index)
    renderTodoList()
    renderPendingList()
}

function deleteTodo(index) {
    var name = todoList[index].name;
    var pending = {
        name: name
    }
    pendingList.push(pending)
    todoList.splice(index ,1)
}

function setInputValue (selector, value) {
    var element = document.querySelector(selector)
    element.value = value;
}

function editStudentHandle() {
    var name = getInputValue('.input')
     var todo = {
         name: name
     }
     editTodo(indexTodo, todo)
     renderTodoList()
}

function editTodo(index, todo)  {
    todoList[index] = todo
}

function onEditTodo (index) {
    indexTodo = index;
    setHTML('.add-btn', 'Save')
    var todo = todoList[index]
    setInputValue('.input', todo.name)
    enableEditMode();
}

function enableEditMode() {
    editMode = true;
}

function disableEditMode() {
    editMode = false;
}

function onDeletePeding(index) {
    deletePending(index)
    renderPendingList()
}

function deletePending(index) {
    pendingList.splice(index ,1)
}

function onRepairPeding (index) {
    var todo = pendingList[index];
    todoList.unshift(todo)
    deletePending(index)
    renderPendingList()
    renderTodoList()
}