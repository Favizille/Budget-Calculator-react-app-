import React from "react";
import Item from "./Item";
import {MdDelete} from "react-icons/md"

const List = ({expenses, handleEdit, handleDelete, clearItems}) => {
    return (
        <>
            <ul className="List">
                {expenses.map((expense)=>{
                   return <Item expense={expense} handleEdit={handleEdit} handleDelete={handleDelete} clearItems={clearItems}/>;
                })}
            </ul> 
            {expenses.length > 0 && 
                <button className="btn" onClick={clearItems}>
                clear expenses
                <MdDelete className="btn-icon" />
                </button>
            }
        </>
    );
}

export default List;