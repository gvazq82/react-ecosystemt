import React, { useState } from 'react';
// High order function.
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import { getTodos } from './selectors';
import styled from 'styled-components';

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;
const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewTodoForm = ( { todos, onCreatePressed } ) => {
    const [inputValue, setInputValue] = useState('');

    return <FormContainer>
        <NewTodoInput 
            type="text"
            placeholder="Type your new todo here"
            value={inputValue}
            onChange={ e => setInputValue(e.target.value)} />
        <NewTodoButton 
            onClick={() => {
                const isDuplicateText = todos.some(todo => todo.text === inputValue);
                if (!isDuplicateText) {
                    onCreatePressed(inputValue);
                    setInputValue('');
                }
            }}
            className="new-todo-button">Create Todo</NewTodoButton>
    </FormContainer>
};

// Object represent redux state.
const mapStateToProps = state => ({
    todos: getTodos(state),
});
// It takes dispatch, function to allow components to trigger actions that state will respond to.
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);