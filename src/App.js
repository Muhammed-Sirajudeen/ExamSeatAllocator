
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Layoutcreater from './components/Layoutcreater'
import Layout from './components/Layout'
import Viewclasses from './components/Viewclasses';
import Viewlayouts from './components/Viewlayouts'
function App() {
  return (
    <BrowserRouter>
    <Layout/>
    <Routes>
          
          <Route path="/" element={<Home />} />

          <Route path="layout" element={<Layoutcreater />} />
          <Route path="viewclasses" element={<Viewclasses/>}/>
          <Route path="viewlayouts/:id" element={<Viewlayouts/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
