import "../css/style-base.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Perfil from "../components/Perfil";
import Home from "../components/Home";
import Bio from "../components/Bio";
import Descricao from "../components/Descricao";
import Criar from "../components/Criar";
import Usuarios from "../components/Usuarios"
import PerfilPesquisa from "../components/PerfilPesquisa";
import Participantes from "../components/Participantes";
import homeIcon from "../imagens/home.svg";
import pesquisarIcon from "../imagens/pesquisar.svg";
import criarIcon from "../imagens/criar.svg";
import chatsIcon from "../imagens/chats.svg";
import perfilIcon from "../imagens/perfil.svg";
import logo from "../imagens/logo.svg";
import hamburger from "../imagens/hamburger.svg";

const NavBar = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [flag, setFlag] = useState(0);
    // const [isSwiping, setIsSwiping] = useState(false);
    // const btn_hamb = document.getElementById("btn-hamb");
    const bodyfalso = document.getElementById("bodyfalso");
    const nav = document.getElementById("navdentro");
    const [home, setHome] = useState(true);
    const [pesquisa, setPesquisa] = useState(false);
    const [criar, setCriar] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [bio, setBio] = useState(false);
    const [descricao, setDescricao] = useState(false);
    const [perfilPesquisa, setPerfilPesquisa] = useState(false);
    const [verParticipantes, setVerParticipantes] = useState(false);

    const [postSelecionado, setPostSelecionado] = useState({});
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({});

    const handleToggleNav = () => {
        if (flag === 0) {
            console.log("abrindo");
            bodyfalso.style.marginRight = "-55%";
            bodyfalso.style.scale = "85%";
            bodyfalso.style.height = "95vh";
            bodyfalso.style.borderRadius = "35px";
            bodyfalso.style.transition = "0.3s ease-in-out";
            document.querySelector("#body").style.transition = "background 45.5s";
            document.querySelector("#body").style.backgroundPosition = "0% 0%";
            bodyfalso.style.boxShadow = "0px 0px 0px 0px rgba(78, 204, 163, 0.13), -13px 9px 35px 0px rgba(78, 204, 163, 0.13), -51px 38px 64px 0px rgba(78, 204, 163, 0.11), -116px 85px 86px 0px rgba(78, 204, 163, 0.07), -206px 152px 102px 0px rgba(78, 204, 163, 0.02), -322px 237px 112px 0px rgba(78, 204, 163, 0.00)"
            nav.style.visibility = "visible";
            nav.style.display = "flex";
            nav.style.animation = "fadeIn 0.3s ease-in-out";
            nav.style.transition = "0.3s ease-in-out";
            nav.style.marginLeft = "1rem";
            nav.style.opacity = "100%";
            setFlag(1);
        }
    };

    const handleBodyClick = () => {
        if (flag === 1) {
            setFlag(0);
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

    // setIsSwiping(false);
    // const navbar = document.getElementById('navbar');

    // const handleSwipeRight = (event) => {
    //     if (isSwiping) {
    //         return;
    //       }
    //       setIsSwiping(true);
    //       const touch = event.changedTouches[0];
    //       const navbarWidth = navbar.offsetWidth; 
    //       const touchAreaWidth = 1000; // largura
    //       const minHorizontalSwipe = 30;
    //       if (touch.pageX > navbarWidth - touchAreaWidth &&
    //           touch.pageX - touch.clientX < minHorizontalSwipe) {
    //         btn_hamb.click();
    //       }
    //       setTimeout(() => {
    //         setIsSwiping(false);
    //       }, 750);
    // };

    useEffect(() => {
        const getUsuario = async () => {
            const email = localStorage.getItem('email');
            const response = await axios.post('https://server-linkme.onrender.com/usuarioInfo', { email });
            setUsuarios(response.data);
            setNome(response.data.nome);
        };
        getUsuario();
    }, []);

    function handleClickHome() {
        setHome(true);
        setPesquisa(false);
        setPerfil(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        handleBodyClick();
    };
    function handleClickCreate() {
        setCriar(true);
        setHome(false);
        setPesquisa(false);
        setPerfil(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        handleBodyClick();
    };
    function handleClickPerfil() {
        setPerfil(true);
        setHome(false);
        setPesquisa(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        handleBodyClick();
    };
    function handleClickPesquisa() {
        setPesquisa(true);
        setHome(false);
        setPerfil(false);
        setCriar(false);
        setDescricao(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
        handleBodyClick();
    };

    function handleClickAtivaDescricao(e, post) {
        e.stopPropagation();
        setPostSelecionado(post);
        setDescricao(true);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setVerParticipantes(false);
        setBio(false);
    };

    function handleClickPesquisaUsuario(e, usuario) {
        e.stopPropagation();
        setUsuarioSelecionado(usuario);
        setPerfilPesquisa(true);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setCriar(false);
        setDescricao(false);
        setVerParticipantes(false);
        setBio(false);
    };

    function handleClickVerParticipantes(e, posts) {
        e.stopPropagation();
        setPostSelecionado(posts);
        setVerParticipantes(true);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setCriar(false);
        setPerfilPesquisa(false);
        setBio(false);
    };

    function handleClickAlterarBio(e) {
        e.stopPropagation();
        setBio(true);
        setVerParticipantes(false);
        setDescricao(false);
        setPesquisa(false);
        setHome(false);
        setPerfil(false);
        setCriar(false);
        setPerfilPesquisa(false);
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
                        <a className="nav-titles" onClick={handleClickCreate}><img src={criarIcon} alt="" className="navs" />Criar</a>
                        <a className="nav-titles" ><img src={chatsIcon} alt="" className="navs" />Chats</a>
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
                        {criar ? <Criar /> : null}
                        {perfil ? <Perfil setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao} handleClickAlterarBio={handleClickAlterarBio}/> : null}
                        {descricao ? <Descricao setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickVerParticipantes={handleClickVerParticipantes}/> : null}
                        {bio ? <Bio /> : null}
                        {perfilPesquisa ? <PerfilPesquisa setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickAtivaDescricao={handleClickAtivaDescricao}/> : null}
                        {verParticipantes ? <Participantes setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} setPostSelecionado={setPostSelecionado} postSelecionado={postSelecionado} handleClickPesquisaUsuario={handleClickPesquisaUsuario}/> : null}
                    </div>
                </div>

            </div>
        </>
    )
}
export default NavBar;