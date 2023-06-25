import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Bio from "../components/Bio";
import Entrar from "../components/Entrar";
import Perfil from "../components/Perfil";
import Home from "../components/Home";
import Descricao from "../components/Descricao";
import Criar from "../components/Criar";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
            <Route path="/" element={<Entrar />}/>
            <Route path="/Bio" element={<PrivateRoutes />}>
                <Route path="/Bio" element={<Bio />}/>
            </Route>
            <Route path="/Home" element={<PrivateRoutes />}>
                <Route path="/Home" element={<Home />}/>
            </Route>
            <Route path="/Descricao" element={<PrivateRoutes />}>
                <Route path="/Descricao" element={<Descricao />}/>
            </Route>
            <Route path="/Criar" element={<PrivateRoutes />}>
                <Route path="/Criar" element={<Criar />}/>
            </Route>
            <Route path="/Perfil" element={<PrivateRoutes />}>
                <Route path="/Perfil" element={<Perfil />}/>
            </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};