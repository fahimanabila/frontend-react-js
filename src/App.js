import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<><Navbar /><Dashboard /><ProductList/></>}/>
        <Route path="/add" element={<><Navbar /><AddProduct/></>}/>
        <Route path="/edit/:id" element={<><Navbar /><EditProduct/></>}/>
      </Routes>
    </Router>
  );
}

export default App;
