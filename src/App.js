
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Layoutcreater from './components/Layoutcreater'
import Layout from './components/Layout'
function App() {
  return (
    <BrowserRouter>
    <Layout/>
    <Routes>
          
          <Route path="/" element={<Home />} />

          <Route path="layout" element={<Layoutcreater />} />
        
    </Routes>
  </BrowserRouter>
  );
}

export default App;
