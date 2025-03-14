import React, { useState } from "react";
import { db, collection, addDoc } from "../config"; 
import "./Questionsscreen.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    subject: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      await addDoc(collection(db, "form"), formData);
      alert("Form gönderildi!");
      setFormData({ name: "", mail: "", subject: "" }); 
  };

  return (
    <div>
      <h3>Bize Ulaşın</h3>
      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="formRow">
          <input
            name="name"
            type="text"
            placeholder="İsim"
            className="inputField"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="mail"
            type="email"
            placeholder="E-posta"
            className="inputField"
            value={formData.mail}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="subject"
            type="text"
            placeholder="Konu"
            className="inputField subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <button className="submitButton" type="submit">
            GÖNDER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
