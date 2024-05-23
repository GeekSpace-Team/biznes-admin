import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h2>Hello</h2>} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
