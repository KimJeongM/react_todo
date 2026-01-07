import { useState, useEffect, useContext } from 'react'; 
import { createContext } from 'react';
import List from './List';
import TodoInput from './TodoInput';
import './todo.css';

export const CheckContext = createContext(null);

export default function App(){
    const todoStorage = window.localStorage;
    const initTodoList = (todoStorage.getItem('todoData') !== null)? JSON.parse(todoStorage.getItem('todoData')) : []; 
    const [todoList, setTodoList] = useState(initTodoList);
    const doList = todoList.filter((item) => item.done === false); 
    const doneList = todoList.filter((item) => item.done === true); 
    
     
    useEffect(() => {
        sendLocalStorage();
    }, [todoList]);

    function todoAdd(addTodoObj){
        const newTodoItem = {...addTodoObj, key: Date.now()}
        const newTodoList = [...todoList, newTodoItem]; 
        setTodoList(newTodoList);
    }

    function upDateTodoList(newItem, itemDel='no'){
        let newTodoList; 
        if(itemDel == 'yes'){
            newTodoList = [...todoList].filter((item)=> item.key !== newItem.key); 
        }else{
            newTodoList = [...todoList].map((item)=>{
                if(item.key === newItem.key){
                    return {...item, ...newItem};
                }
                return item;
            });
        }
        setTodoList(newTodoList); 
    }

    function sendLocalStorage(){
        const data = JSON.stringify([...todoList]); 
        todoStorage.setItem('todoData', data);
    }

    return(
        <CheckContext.Provider value={{upDateTodoList}}>
            <div className="wrap">
                <div className="title">To do List</div>
                <TodoInput onAddTodo={todoAdd} />
                <div className="list-container">
                    <div className="to-do">
                        <List list={doList} />
                    </div>
                    {
                        doneList.length > 0 &&(
                            <div className="done">
                                <p className="done-title">complete <em>{doneList.length}</em></p>
                                <List list={doneList} />
                            </div>
                        )
                    }
                </div>
            </div>
        </CheckContext.Provider>
    ); 
}


