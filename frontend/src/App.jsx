import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import UploadDocument from "./pages/employee/UploadDocument";
import Mydocuments from "./pages/employee/MyDocuments";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents" element={<Mydocuments/>} />

      </Routes>
    </>
  );
}

export default App;