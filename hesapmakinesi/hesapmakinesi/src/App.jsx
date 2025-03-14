import { useState } from "react";
import "./App.css";
import Tuslar from "./tuslar.jsx";
import "./tuslar.css";

function App() {
  const [input, setInput] = useState("0");

  return (

<div className="container">
    <div className="app">
      <div className="ekran">{input}</div>
      <Tuslar setInput={setInput} input={input} />
    </div>
</div>
  
  );
}

export default App;
