import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function TodoInput({onAddTodo}){
    const [inputValue, setInputValue] = useState('')
    function onClickHandler(){
        const todoObj = {text : inputValue, done : false}; 
        
        onAddTodo(todoObj);
        setInputValue('');
    }

    return (
        <div className="input-container">
            <input 
                type="text" 
                placeholder="To do" 
                value={inputValue}
                onChange={
                    (e)=>{
                        setInputValue(e.target.value);
                    }
                }
            />
            <button 
                type="button" 
                className="add-handler" 
                onClick={onClickHandler}>
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    ); 
}