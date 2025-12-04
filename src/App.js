import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import BuildBoard from "./components/BuildBoard";
import Register from "./pages/Register";

function App() {
  return (
      
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sudoku" element={<BuildBoard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        
      </Routes>
    </BrowserRouter>

    // <div>
    //  {/* <BuildBoard/> */}
    // </div>  
  );
}

export default App;
