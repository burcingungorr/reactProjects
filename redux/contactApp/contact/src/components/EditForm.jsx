import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateContact } from '../redux/contactSlice'

const EditForm = ({ contact }) => {
  const [name, setName] = useState(contact.name)  
  const [phone_number, setPhoneNumber] = useState(contact.phone_number)  

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!name || !phone_number) return;

    dispatch(updateContact({
      id: contact.id,
      changes: {
        name,
        phone_number, 
      },
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={name} 
          placeholder='name'
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          value={phone_number} 
          placeholder='number'
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />
        <div className="btn">
          <button type='submit'>UPDATE</button>
        </div>
      </form>
    </div>
    
  );
}

export default EditForm;
