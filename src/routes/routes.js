import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import Bio from "../components/Bio";
import Entrar from "../components/Entrar";
import Perfil from "../components/Perfil";
import Home from "../components/Home";
import Descricao from "../components/Descricao";
import Criar from "../components/Criar";
import Usuarios from "../components/Usuarios"
import PerfilPesquisa from "../components/PerfilPesquisa";
import Participantes from "../components/Participantes";
import { useState } from "react";

export const AppRoutes = () => {
  const [postSelecionado, setPostSelecionado] = useState({});
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
            <Route path="/" element={<Entrar />}/>
            <Route path="/Home" element={<PrivateRoutes />}>
                <Route path="/Home" element={<Home setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} />}/>
            </Route>
            <Route path="/Bio" element={<PrivateRoutes />}>
                <Route path="/Bio" element={<Bio />}/>
            </Route>
            <Route path="/Descricao" element={<PrivateRoutes />}>
                <Route path="/Descricao" element={<Descricao setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} />}/>
            </Route>
            <Route path="/Criar" element={<PrivateRoutes />}>
                <Route path="/Criar" element={<Criar />}/>
            </Route>
            <Route path="/Perfil" element={<PrivateRoutes />}>
                <Route path="/Perfil" element={<Perfil setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} />}/>
            </Route>
            <Route path="/Usuarios" element={<PrivateRoutes />}>
                <Route path="/Usuarios" element={<Usuarios setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} />}/>
            </Route>
            <Route path="/PerfilPesquisa" element={<PrivateRoutes />}>
                <Route path="/PerfilPesquisa" element={<PerfilPesquisa setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} />}/>
            </Route>
            <Route path="/Participantes" element={<PrivateRoutes />}>
                <Route path="/Participantes" element={<Participantes setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} />}/>
            </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};