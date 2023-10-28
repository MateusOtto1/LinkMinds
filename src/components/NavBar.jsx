import "../css/style-base.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Perfil from "./Perfil";
import Home from "./Home";
import Presencas from "./Presencas";
import Interesses from "./Interesses";
import Bio from "./Bio";
import Descricao from "./Descricao";
import TipoEvento from "./TipoEvento";
import Criar from "./Criar";
import EventoSeguidores from "./EventoSeguidores";
import Usuarios from "./Usuarios"
import PerfilPesquisa from "./PerfilPesquisa";
import Participantes from "./Participantes";
import Seguidores from "./Seguidores";
import Seguindo from "./Seguindo";
import SeguidoresPP from "./SeguidoresPP";
import SeguindoPP from "./SeguindoPP";
import homeIcon from "../imagens/home.svg";
import pesquisarIcon from "../imagens/pesquisar.svg";
import criarIcon from "../imagens/criar.svg";
import chatsIcon from "../imagens/chats.svg";
import perfilIcon from "../imagens/perfil.svg";
import logo from "../imagens/logo.svg";
import hamburger from "../imagens/hamburger.svg";
import Cookies from "js-cookie";

const NavBar = () => {
    const [nome, setNome] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [flag, setFlag] = useState(0);
    const bodyfalso = document.getElementById("bodyfalso");
    const nav = document.getElementById("navdentro");
    const [home, setHome] = useState(true);
    const [pesquisa, setPesquisa] = useState(false);
    const [criar, setCriar] = useState(false);
    const [presencas, setPresencas] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [interesses, setInteresses] = useState(false);
    const [bio, setBio] = useState(false);
    const [descricao, setDescricao] = useState(false);
    const [perfilPesquisa, setPerfilPesquisa] = useState(false);
    const [verParticipantes, setVerParticipantes] = useState(false);
    const [seguidores, setSeguidores] = useState(false);
    const [seguindo, setSeguindo] = useState(false);
    const [seguidoresPP, setSeguidoresPP] = useState(false);
    const [seguindoPP, setSeguindoPP] = useState(false);
    const [tipoEvento, setTipoEvento] = useState(false);
    const [eventoSeguidores, setEventoSeguidores] = useState(false);

    const [postSelecionado, setPostSelecionado] = useState({});
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
    const [interesseSelecionado, setInteresseSelecionado] = useState({});

    const handleToggleNav = () => {
        if (flag === 0) {
            console.log("abrindo");
            bodyfalso.style.marginRight = "-60%";
            bodyfalso.style.scale = "90%";
            bodyfalso.style.height = "95vh";
            bodyfalso.style.borderRadius = "15px";
            bodyfalso.style.transition = "0.3s";
            bodyfalso.style.cursor = "pointer";
            nav.style.visibility = "visible";
            nav.style.display = "flex";
            nav.style.animation = "fadeIn 0.3s";
            nav.style.transition = "0.3s";
            nav.style.marginLeft = ".5rem";
            nav.style.opacity = "100%";
            setFlag(1);
        }
    };

    const handleBodyClick = () => {
        if (flag === 1) {
            setFlag(0);
            bodyfalso.style.cursor = "";
            nav.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(function () {
                bodyfalso.style.boxShadow = "";
                bodyfalso.style.scale = "";
                bodyfalso.style.marginRight = "";
                bodyfalso.style.borderRadius = "";
                nav.style.display = "";
                nav.style.opacity = "0%";
                nav.style.marginLeft = "";
                setTimeout(function () {
                    nav.style.visibility = "";
                    bodyfalso.style.height = "";
                    document.querySelector("#body").style.backgroundPosition = "";
                    document.querySelector("#body").style.transition = "0s";
                }, 500);
            }, 100);

        }
    };

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setUsuarios(response.data);
            setNome(response.data.nome);
        };
        getUsuario();
    }, []);

    function handleClickHome() {
        setHome(true);
        setPesquisa(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };
    function handleClickTipoEvento() {
        setTipoEvento(true);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };
    function handleClickCreate(e, interesse) {
        e.stopPropagation();
        setInteresseSelecionado(interesse);
        setCriar(true);
        setTipoEvento(false);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };

    function handleClickPresencas() {
        setPresencas(true);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };

    function handleClickPerfil(e) {
        e.stopPropagation();
        setPerfil(true);
        setHome(false);
        setPesquisa(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };

    function handleClickInteresses(e, usuario) {
        e.stopPropagation();
        setUsuarioSelecionado(usuario);
        setInteresses(true);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };

    function handleClickEventoSeguidores() {
        setEventoSeguidores(true);
        setInteresses(false);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setPresencas(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        handleBodyClick();
    };

    function handleClickPesquisa() {
        setPesquisa(true);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
        handleBodyClick();
    };

    function handleClickAtivaDescricao(e, post) {
        e.stopPropagation();
        setPostSelecionado(post);
        setDescricao(true);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickPesquisaUsuario(e, usuario) {
        e.stopPropagation();
        setUsuarioSelecionado(usuario);
        setPerfilPesquisa(true);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setDescricao(false);
        setVerParticipantes(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickVerParticipantes(e, posts) {
        e.stopPropagation();
        setPostSelecionado(posts);
        setVerParticipantes(true);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setBio(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickAlterarBio(e) {
        e.stopPropagation();
        setBio(true);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setSeguidores(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickSeguidores(e) {
        e.stopPropagation();
        setSeguidores(true);
        setBio(false);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setSeguindo(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickSeguindo(e) {
        e.stopPropagation();
        setSeguindo(true);
        setSeguidores(false);
        setBio(false);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setSeguidoresPP(false);
        setSeguindoPP(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickSeguidoresPP(e) {
        e.stopPropagation();
        setSeguidoresPP(true);
        setSeguindoPP(false);
        setSeguindo(false);
        setSeguidores(false);
        setBio(false);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    function handleClickSeguindoPP(e) {
        e.stopPropagation();
        setSeguindoPP(true);
        setSeguidoresPP(false);
        setSeguindo(false);
        setSeguidores(false);
        setBio(false);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setTipoEvento(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setPresencas(false);
        setInteresses(false);
        setEventoSeguidores(false);
    };

    return (
        <>
            <div id="body">
                <div id="navdentro">
                    <div id="nav-perfil">
                        <img src={usuarios.foto} alt="" />
                        <h1 id="nome-perfil">{nome}</h1>
                    </div>
                    <div id="nav-imgs">
                        <a className="nav-titles" onClick={handleClickHome}><img src={homeIcon} alt="" className="navs" />Home</a>
                        <a className="nav-titles" onClick={handleClickPesquisa}><img src={pesquisarIcon} alt="" className="navs" />Pesquisar</a>
                        <a className="nav-titles" onClick={handleClickTipoEvento}><img src={criarIcon} alt="" className="navs" />Criar</a>
                        <a className="nav-titles" onClick={handleClickPresencas}><img src={chatsIcon} alt="" className="navs" />Presenças</a>
                        <a className="nav-titles" onClick={handleClickInteresses}><img src={perfilIcon} alt="" className="navs" />Interesses</a>
                        <a className="nav-titles" onClick={handleClickEventoSeguidores}><img src={perfilIcon} alt="" className="navs" />Eventos de seguidores</a>
                        <a className="nav-titles" onClick={handleClickPerfil}><img src={perfilIcon} alt="" className="navs" />Perfil</a>
                    </div>
                </div>
                <div id="bodyfalso" onClick={handleBodyClick}>
                    <nav id="navbar">
                        <div id="botao">
                            <button id="btn-hamb" onClick={handleToggleNav}><img src={hamburger} alt="" id="hamb" /></button>
                        </div>
                        <img src={logo} onClick={handleClickHome} alt="" id="logo" />
                    </nav>
                    <div className="main">
                        {home ? <Home setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} setDescricao={setDescricao} descricao={descricao} handleClickAtivaDescricao={handleClickAtivaDescricao}/> : null}
                        {pesquisa ? <Usuarios setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} handleClickPesquisaUsuario={handleClickPesquisaUsuario} handleClickAtivaDescricao={handleClickAtivaDescricao}/> : null}
                        {tipoEvento ? <TipoEvento handleClickCreate={handleClickCreate} interesseSelecionado={interesseSelecionado} setInteresseSelecionado={setInteresseSelecionado} /> : null}
                        {criar ? <Criar interesseSelecionado={interesseSelecionado} /> : null}
                        {presencas ? <Presencas setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao}/> : null}
                        {eventoSeguidores ? <EventoSeguidores setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao}/> : null}
                        {perfil ? <Perfil setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao} handleClickAlterarBio={handleClickAlterarBio} handleClickSeguidores={handleClickSeguidores} handleClickSeguindo={handleClickSeguindo}/> : null}
                        {interesses ? <Interesses setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} handleClickPesquisaUsuario={handleClickPesquisaUsuario} /> : null}
                        {descricao ? <Descricao setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickVerParticipantes={handleClickVerParticipantes}/> : null}
                        {bio ? <Bio /> : null}
                        {perfilPesquisa ? <PerfilPesquisa setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao} handleClickPerfil={handleClickPerfil} handleClickSeguidoresPP={handleClickSeguidoresPP} handleClickSeguindoPP={handleClickSeguindoPP}/> : null}
                        {verParticipantes ? <Participantes setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickPesquisaUsuario={handleClickPesquisaUsuario} handleClickPerfil={handleClickPerfil}/> : null}
                        {seguidores ? <Seguidores handleClickPesquisaUsuario={handleClickPesquisaUsuario} setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado}/> : null}
                        {seguindo ? <Seguindo handleClickPesquisaUsuario={handleClickPesquisaUsuario} setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado}/> : null}
                        {seguidoresPP ? <SeguidoresPP handleClickPesquisaUsuario={handleClickPesquisaUsuario} setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} handleClickPerfil={handleClickPerfil}/> : null}
                        {seguindoPP ? <SeguindoPP handleClickPesquisaUsuario={handleClickPesquisaUsuario} setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} handleClickPerfil={handleClickPerfil}/> : null}
                    </div>
                </div>

            </div>
        </>
    )
}
export default NavBar;