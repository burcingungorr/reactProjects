import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../redux/contactSlice';
import { Link } from 'react-router-dom';

const Item = ({item}) => {

const dispatch = useDispatch();

    const handleDelete=(id)=>{
        dispatch(deleteContact(id))
    }
  return (
    <li>
        <span>{item.name}</span>
        <span>{item.phone_number}</span>
        <div className="edit">
        <span > <Link to={`/edit/${item.id}`}>Edit</Link>
       </span>
        <button className='deleteBtn' onClick={()=>handleDelete(item.id)}>X</button>
</div>
    </li>
  )
}

export default Item