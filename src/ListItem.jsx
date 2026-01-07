import { useState, useContext, useRef } from "react";
import { CheckContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { faCircle} from '@fortawesome/free-regular-svg-icons'

export default function ListItem({item}){
    const {upDateTodoList} = useContext(CheckContext);
    const [checked, setChecked] = useState(item.done);
    const [isEdit, setIsEdit] = useState(false); 
    const [itemText, setItemText] = useState(item.text);
    const contentTextRef = useRef(null); 

    function onCheckChangeHandler(e){
        const target = (e.currentTarget.tagName === 'INPUT')?  e.currentTarget : e.currentTarget.querySelector('input[type="checkbox"]'); 
        const newChecked = target.checked; 
        updateItem({done:newChecked}); 
        setChecked(newChecked);
    }

    function onTextClickHandler(e){
        setIsEdit(true);
    }

    function onTextInputHandler(e){
        const editDom = contentTextRef.current; 
        if(editDom.innerText.length === 0){
            editDom.focus(); 
            return;
        }
        const selection = window.getSelection(); 
        const newRange = document.createRange();
        newRange.selectNodeContents(editDom);
        newRange.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(newRange);

        setItemText(e.target.innerText);
    }

    function onTextBlurHandler(e){
        const newIsEdit = false;
        setIsEdit(newIsEdit);
        const newText = e.target.innerText;
        setItemText(newText); 

        if(item.text !== newText){
            updateItem({text: newText}); 
        }
    }

    function onDelClickHandler(e){
        upDateTodoList({...item}, 'yes'); 
    }

    function updateItem(updateData){
        const newItem = {...item, ...updateData}; 
        upDateTodoList(newItem); 
    }

    return (
        <li className="item">
            <span className="done-check" >
                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={onCheckChangeHandler}
                />
                <FontAwesomeIcon icon={checked? faCircleCheck : faCircle}  color="#8d9597" />
            </span>
            <div className="do-text">
                <p 
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    onBlur={onTextBlurHandler}
                    onClick={onTextClickHandler}
                    onInput={onTextInputHandler}
                    ref={contentTextRef}
                    tabIndex={0}
                >
                    {itemText}
                </p>
            </div>
            <button 
                type="button" 
                className="delete btn" 
                onClick={onDelClickHandler}
            >
                <FontAwesomeIcon icon={faCircleXmark} color="#8d9597" />
            </button>
        </li>
    );
}
/* 

*/