import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid"; // ENCRYPTION

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {

    const [filter, setFilter] = useState('All');
    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton 
            key = {name} 
            name = {name}
            isPressed ={name === filter}
            setFilter = {setFilter} 
        />
    ));


    function deleteTask(id){
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }
    function editTask(id, newName){
        const editedTaskList = tasks.map((task) => {
                //checking if the id of edited task and the current task has same id
                if ( id == task.id ) {
                    return {...task, name: newName}
                }
                return task;
            });

        setTasks(editedTaskList);
    }

    const [tasks, setTasks] = useState(props.tasks);

    function addTask(name) {
        const newTask = {
                            id: `todo-${nanoid()}`,
                            name,
                            completed:  false
        };
        setTasks([...tasks, newTask]); // 3 dots is SPREAD SYNTAX. It adds end of tasks newTask. If you remove tasks it types over tasks.
    }

    // tickbox doesnt really change the status of todo, its just html. Lets update it in React app also.
    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => 
    (
        <Todo
            id = {task.id}
            name = {task.name}
            completed = {task.completed}
            key = {task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));

    // changing REMAINING TASKS NUMBER
    // and if there is only 1 task it shouldnt say tasks, should say task.
    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    
    

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}