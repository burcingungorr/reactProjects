import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { changeActiveFilter ,clearCompleted,selectTodos} from '../redux/todos/todosSlice';

const ContentFooter = () => {

    const dispatch=useDispatch();

    const items = useSelector(selectTodos);
    const itemsLeft = items.filter(item=>!item.completed).length;
    console.log(itemsLeft)

    const activeFilter = useSelector(state=>state.todos.activeFilter);


  return (
    <footer className="footer"> 
    <span className="todo-count">
        <strong>{itemsLeft} </strong>
         items left
    </span>

    <ul className="filters">
        <li>
            <a href="#/" className={activeFilter ==='all' ? 'selected' : ''}
            onClick={()=> dispatch(changeActiveFilter('all'))}
            >All</a>
        </li>
        <li>
            <a href="#/"className={activeFilter ==='active' ? 'selected' : ''}
            onClick={()=> dispatch(changeActiveFilter('active'))}
            >Active</a>
        </li>
        <li>
            <a href="#/"className={activeFilter ==='compleated' ? 'selected' : ''}
             onClick={()=> dispatch(changeActiveFilter('completed'))}
            >Completed</a>
        </li>
    </ul>

    <button className="clear-completed"
     onClick={()=> dispatch(clearCompleted('completed'))}

    >
        Clear completed
    </button>
</footer>
  )
}

export default ContentFooter