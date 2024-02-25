import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ToDoList = (props:any) => {
    return <>
        <h1>Create a todo:</h1>
        
        {props.toDoList.map((x:any) => 
            <>
            <b>{x.title}</b>
            <span>{x.description}</span>
            </>
        )}
       
    </>
}

const mapStateToProps = (state:any) => {
    return {
        toDoList:state.toDoList
    }
}

export default connect(mapStateToProps)(ToDoList);