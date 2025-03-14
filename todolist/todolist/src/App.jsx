import { useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!newItem) {
      alert("Lütfen bir görev girin");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      isCompleted: false,
    };
    setItems((oldItems) => [...oldItems, item]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  
  const checkBox = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>📝 To-Do List</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Yeni bir görev ekle..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button className="add" onClick={addItem}>
            Ekle
          </button>
        </div>
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <div className="item-content">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => checkBox(item.id)}
                />
                <span className={item.isCompleted ? "checked" : ""}>{item.value}</span>
              </div>
              <button className="delete" onClick={() => deleteItem(item.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;