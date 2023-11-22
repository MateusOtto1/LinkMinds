import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Entrar from "../components/Entrar";
import NavBar from "../components/NavBar";
import Cadastro from "../components/Cadastro";
import TesteCadastro from "../components/TesteCadastro";

export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Entrar />} />
          <Route path="/TesteCadastro" element={<PrivateRoutes />}>
            <Route path="/TesteCadastro" element={<TesteCadastro />} />
          </Route>         
          <Route path="/Cadastro" element={<PrivateRoutes />}>
            <Route path="/Cadastro" element={<Cadastro />} />
          </Route>
          <Route path="/LinkMinds" element={<PrivateRoutes />}>
            <Route path="/LinkMinds" element={<NavBar />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};