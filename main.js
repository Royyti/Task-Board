'use strict'
const DOM_TAGNAME = {
    DIV: "DIV",
    BUTTON: "BUTTON",
    I: "I",
    SPAN: "SPAN",
    LABEL: "LABEL"
}
const DOM_EVENT = {
    click: "click",
    hover: "hover",
    blur: "blur"
}
const DOM_CLASSNAME = {
    removeTask: "removeTask",
    BIPEN: "bi-pen",
    BISAVE2: "bi-save2",
    BISAVEFILL: "bi-save-fill"
}
const TASKS_KEY = 'tasks';
var task = [];
let tasksArray;
let counter = 0;
console.log( counter );
let storage = storageModule();
let savedTask = document.querySelector( "#savedTasks" );
console.log( savedTask )
const addButton = document.getElementById( "addButton" )
console.log( addButton )
const clearbutton = document.getElementById( "Clear" );
const removeTaskTag = document.querySelector( ".removeTask" )
const writeTasksFromTheLocalStorage = forEachTasks();

function storageModule ()
{
    function setTaskToTheLocalStorage ( task )
    {
        window.localStorage.setItem( TASKS_KEY, JSON.stringify( task ) );
        return task;
    }
    function getTaskFromLocalStorage ( tasksArray )
    {
        const taskArrayStr = localStorage.getItem( TASKS_KEY );
        tasksArray = JSON.parse( taskArrayStr ) || [];
        if ( Array.isArray( tasksArray ) )
        {
            return tasksArray;
        }
        else
        {
            console.log( 'NOT ARRAY' );
        }
    }
    function removeTaskFromLocalStorage ( task )
    {

        localStorage.removeItem( TASKS_KEY );
        return task;

    }
    return {
        set: setTaskToTheLocalStorage,
        get: getTaskFromLocalStorage,
        remove: removeTaskFromLocalStorage
    }

}


function addTaskToTheBoard ( notes )
{
    const divNotes = document.createElement( 'div' );
    divNotes.className = "col-2 fadeIn box"

    divNotes.innerHTML = `<i title = "close" onclick = "removeTaskFromTheBoard(event)" data-taskidx = "${ notes.counter }" class="bi bi-x-circle-fill removeTask btn btn outline-light btn-sm"></i>
 <label title = "edit" onclick = "editTask(event)" data-taskidx = "${ notes.counter }" class="bi bi-pen"></label>
 <span title = "save" onclick = "saveEdit(event)" data-taskidx = "${ notes.counter }" class="bi bi-save-fill"></span>
        <textarea disabled class = "text">${ notes.task }</textarea>
        <br>
        <input type = "dateIL" value = "${ notes.date }"disabled  class = "date"></input>
        <br>
        <input  value = "${ notes.time }"  disabled class = "time"></input>
        </div>`
    savedTask.appendChild( divNotes );


}


function forEachTasks ()
{
    const savedNotes = storage.get();
    console.log( savedNotes )

    for ( let i = 0; i < savedNotes.length; i++ )
    {
        task.push( savedNotes[ i ] );
        addTaskToTheBoard( savedNotes[ i ] );

        const tempCounter = savedNotes.length - 1;
        counter = Number( savedNotes[ tempCounter ].counter + 1 )
    }
}




function onClickAdd ( e )
{
    if ( e.target.tagName.toUpperCase() !== DOM_TAGNAME.BUTTON.toUpperCase() )
    {
        return;
    }



    e.preventDefault();
    const myTaskInput = document.querySelector( "#myTask" )
    console.log( myTaskInput )
    const dateTaskInput = document.querySelector( "#date" );
    console.log( dateTaskInput )
    const timeTaskInput = document.querySelector( "#time" )
    console.log( timeTaskInput )

    let myTask = myTaskInput.value;
    console.log( myTask )
    let dateTask = dateTaskInput.value;
    let timeTask = timeTaskInput.value;

    const taskObj = {
        task: myTask,
        date: dateTask,
        time: timeTask,
        counter: counter
    }
    task.push( taskObj );
    console.log( taskObj )
    addTaskToTheBoard( taskObj );
    console.log( task );
    storage.set( task );

    myTaskInput.value = "";
    dateTaskInput.value = "";
    timeTaskInput.value = "";
    counter++

}



function onClickClear ( e )
{
    if ( e.target.tagName.toUpperCase() !== DOM_TAGNAME.BUTTON.toUpperCase() )
    {
        return;
    }
    e.preventDefault()
    const myTaskInput = document.querySelector( "#myTask" )
    const dateTaskInput = document.querySelector( "#date" );
    const timeTaskInput = document.querySelector( "#time" )

    myTaskInput.value = "";
    dateTaskInput.value = "";
    timeTaskInput.value = "";
}




function removeTaskFromTheBoard ( event )
{
    event.preventDefault();
    if ( event.target.tagName.toUpperCase() !== DOM_TAGNAME.I.toUpperCase() )
    {
        return;
    }
    const taskcounter = Number( event.target.dataset.taskidx );
    console.log( taskcounter )
    if ( !Number.isNaN( taskcounter ) )
    {
        let removeTaskTarget = event.target
        console.log( removeTaskTarget )
        let removeTask = removeTaskTarget.parentElement
        console.log( removeTask )

        removeTask.remove()
    }
    function findnoteIndex ( note )
    {
        return note.counter == taskcounter;
    }
    const idx = task.findIndex( findnoteIndex )
    console.log( idx );
    task.splice( idx, 1 );
    storage.remove( task );
    storage.set( task )

}


function editTask ( event )
{
    event.preventDefault();

    const taskcounter = Number( event.target.dataset.taskidx );
    console.log( taskcounter )
    if ( !Number.isNaN( taskcounter ) )
    {
        const idx = task.findIndex( findnoteIndex )
        console.log( idx );
        const editButton = document.querySelector( `.bi-pen` );
        const textareaNote = document.querySelectorAll( `.text` );
        console.log( textareaNote[ idx ] )
        textareaNote[ idx ].disabled = false;
        const dateILNote = document.querySelectorAll( `.date` );
        dateILNote[ idx ].disabled = false;
        dateILNote[ idx ].type = "date";
        const timeNote = document.querySelectorAll( `.time` );
        timeNote[ idx ].disabled = false;
        timeNote[ idx ].type = "time"

    }
    function findnoteIndex ( note )
    {

        return note.counter == taskcounter;
    }


}
const editButton = document.querySelector( `.bi-pen` );
console.log( editButton )


function saveEdit ( event )
{

    const taskcounter = Number( event.target.dataset.taskidx );
    console.log( taskcounter )
    if ( !Number.isNaN( taskcounter ) )
    {
        const idx = task.findIndex( findnoteIndex )
        console.log( idx )
        const textareaNote = document.querySelectorAll( `.text` );
        let textareaNoteValue = textareaNote[ idx ].value;
        console.log( textareaNoteValue );
        task[ idx ].task = textareaNoteValue;
        textareaNote[ idx ].disabled = true;
        const dateILNote = document.querySelectorAll( `.date` );
        let dateILNoteValue = dateILNote[ idx ].value;
        task[ idx ].date = dateILNoteValue;
        dateILNote[ idx ].disabled = true;
        dateILNote[ idx ].type = "dateIL";
        const timeNote = document.querySelectorAll( `.time` );
        let timeNoteValue = timeNote[ idx ].value;
        task[ idx ].time = timeNoteValue;
        timeNote[ idx ].disabled = true;
        timeNote[ idx ].type = "text"
    }
    function findnoteIndex ( note )
    {

        return note.counter == taskcounter;
    }

    storage.set( task );

}
const saveButton = document.querySelector( ".bi-save-fill" )
console.log( saveButton );
