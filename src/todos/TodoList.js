import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
} from './selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoListEmptyWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const TodoListEmpty = <TodoListEmptyWrapper>Empty</TodoListEmptyWrapper>;

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading Todos...</div>
    const content = <ListWrapper>
        <NewTodoForm />
        <h3>Incomplete:</h3>
        {incompleteTodos.length > 0 
         ? incompleteTodos.map(todo => <TodoListItem 
            key={todo.id}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
        />)
         : TodoListEmpty }
        <h3>Completed:</h3>
        {completedTodos.length > 0 
         ? completedTodos.map(todo => <TodoListItem 
            key={todo.id}
            todo={todo}
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}
            />)
         : TodoListEmpty}
        </ListWrapper>

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);