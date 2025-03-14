import './App.css';
import Contacts from './components/index';
import Edit from './components/Edit';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div id='container'> 
    <Router>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router></div>
  );
}

export default App;
