import React, { useState } from 'react';
// High order function.
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';

import './NewTodoForm.css';

const NewTodoForm = ( { todos, onCreatePressed } ) => {
    const [inputValue, setInputValue] = useState('');

    return <div className="new-todo-form">
        <input 
            className="new-todo-input" 
            type="text"
            placeholder="Type your new todo here"
            value={inputValue}
            onChange={ e => setInputValue(e.target.value)} />
        <button 
            onClick={() => {
                const isDuplicateText = todos.some(todo => todo.text === inputValue);
                if (!isDuplicateText) {
                    onCreatePressed(inputValue);
                    setInputValue('');
                }
            }}
            className="new-todo-button">Create Todo</button>
    </div>
};

// Object represent redux state.
const mapStateToProps = state => ({
    todos: state.todos,
});
// It takes dispatch, function to allow components to trigger actions that state will respond to.
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);