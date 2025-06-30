import { useState } from "react";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponents from "./components/HeaderComponents";
import FooterComponent from "./components/FooterComponent";
import AddEmployeeComponent from "./components/AddEmployeeComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter>

        <HeaderComponents />
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
          <Route path="/addEmployee" element={<AddEmployeeComponent/>}></Route>
          <Route path="/edit-Employee/:id" element={<AddEmployeeComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
