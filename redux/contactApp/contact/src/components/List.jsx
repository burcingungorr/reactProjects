import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { contactSelectors, removeAllContact } from '../redux/contactSlice'
import Item from './Item'


const List = () => {
    const dispatch=useDispatch();
    const contacts=useSelector(contactSelectors.selectAll)
    const total=useSelector(contactSelectors.selectTotal)

    const handleDeleteAll=()=>{
        dispatch(removeAllContact());
    }

  return (
    <div>
        {
            total>0 &&
            <div className='deleteAllBtn' onClick={handleDeleteAll}>
            Delete All
        </div>
        }

   
    <div><ul className='list'>
    {contacts.map(contact => (
    <Item key={contact.id} item={contact} />
))}
</ul> </div> </div>
    
  )
}

export default List