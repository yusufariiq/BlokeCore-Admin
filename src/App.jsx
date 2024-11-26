import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  )
}

export default App
