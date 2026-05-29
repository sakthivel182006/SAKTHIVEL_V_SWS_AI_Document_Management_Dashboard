import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import UploadDocument from "./pages/employee/UploadDocument";
import MyDocuments from "./pages/employee/MyDocuments";
import UpdateDoucmentstatus from "./pages/employee/UpdateDoucmentstatus";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents" element={<MyDocuments />} />
        <Route
          path="/updatedocuments"
          element={<UpdateDoucmentstatus />}
        />
      </Routes>
    </>
  );
}

export default App;