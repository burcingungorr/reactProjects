import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodoAsync,selectFilteredTodos,getTodosAsync,toggleTodoAsync} from '../redux/todos/todosSlice';
import Loading from './Loading';
import Error from './Error';

const ToDo = () => {
    const dispatch = useDispatch(); //action göndermek için
    const filteredTodos = useSelector(selectFilteredTodos); //veriye erişmek için
    const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
    const error = useSelector((state) => state.todos.addNewTodo.error);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    const handleDestroy = async (id) => {
        await dispatch(removeTodoAsync(id));
    };

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: { completed: !completed } }));
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div><Error message={error} /></div>;
    }

    return (
        <ul className="todo-list">
            {filteredTodos.map((item) => (
                <li key={item.id} className={item.completed ? 'completed' : ''}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggle(item.id, item.completed)}
                        />
                        <label>{item.title}</label>
                        <button
                            className="destroy"
                            onClick={() => handleDestroy(item.id)}
                        ></button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ToDo;