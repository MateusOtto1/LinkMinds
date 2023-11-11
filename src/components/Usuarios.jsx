import { useEffect, useState } from "react";
import axios from "axios";
import "../css/style-pesquisa.css";
import Cookies from 'js-cookie';
import { HashLoader } from 'react-spinners';

const Usuarios = (props) => {
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [Pesquisa, setPesquisa] = useState([]);
    const [pesquisaPost, setPesquisaPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getEmail = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setEmail(response.data.email);
        };
        getEmail();
    }, [email == '']);

    useEffect(() => {
        const getUsuarios = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token,
                "email": email
            };
            const response = await axios.get('https://server-link-minds.vercel.app/pesquisaUsuario', { headers });
            setUsuarios(response.data);
            if (busca == '') {
                setPesquisa(response.data);
            }
        };
        getUsuarios();
    }, [usuarios.length == 0]);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/postsHome', { headers });
            setPosts(response.data.reverse());
            if (busca == "") {
                setPesquisaPost(response.data);
            }
        };
        getPosts();
    }, [posts.length == 0]);

    useEffect(() => {
        const pesquisaInput = async () => {
            const usuariosPesquisa = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(busca.toLowerCase()));
            const postsPesquisa = posts.filter((post) => post.evento.toLowerCase().includes(busca.toLowerCase()));
            setPesquisa(usuariosPesquisa);
            setPesquisaPost(postsPesquisa);
        };
        pesquisaInput();
    }, [busca]);

    return (
        <>
            <div className="main-pesquisa">
                <input type="text" placeholder="O que desejas procurar?" className="pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} />
                <div className="header-perfil-container">
                    <h1 className="inter-header">Usuários</h1>
                    <div className="linha-verde"></div>
                </div>
                <div className="user-container">
                    {Pesquisa.length > 0 ? (
                        Pesquisa.map((usuario, index) => {
                            if (usuario.email != email) {
                                return (
                                    <div className="container-pesquisar">
                                        <div className="user-body" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)} key={index}>
                                            <img src={usuario.foto} alt="" />
                                            <h1 className="username">{usuario.nome}</h1>

                                        </div>
                                        <button className="user-btn" onClick={(e) => props.handleClickPesquisaUsuario(e, usuario)}>&gt;</button>
                                    </div>

                                )
                            }
                        })
                    ) : (
                        <>
                            <HashLoader color={"#fff"} loading={true} size={45} />
                        </>
                    )}
                </div>

                <div className="header-perfil-container">
                    <h1 className="inter-header">Eventos</h1>
                    <div className="linha-verde"></div>
                </div>

                <div className="eventos-container erro-pesquisa">
                    {pesquisaPost.length > 0 ? (
                        pesquisaPost.map((post, index) => {
                            const dia = new Date().getDate();
                            const mes = new Date().getMonth() + 1;
                            const ano = new Date().getFullYear();
                            const dataPost = post.data.split('/');
                            if (dataPost[1] >= mes && dataPost[2] >= ano) {
                                if (post.email != email) {
                                    return (
                                        <div className="card-body" key={index}>
                                            <div className="card" style={{ backgroundImage: `url(${post.imagemEvento})` }}>
                                                <div className="card-top">
                                                    <img src={post.foto} alt="" className="pfp" />
                                                    <div className="textos-card">
                                                        <p className="nome-card">{post.nome}</p>
                                                        <p className="info">{post.evento} as <span>{post.hora} do dia {post.data}</span></p>
                                                    </div>
                                                </div>
                                                <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                            </div>

                                        </div>
                                    )
                                }
                            }
                        })
                    ) : (
                        <>
                            <HashLoader color={"#fff"} loading={true} size={45} style={{ gridColumn: "1/-1", position: "absolute", alignSelf: "center", justifySelf: "center" }} />
                            {setTimeout(function () {
                                function checkErroPesquisa() {
                                    const erroPesquisa = document.querySelector('.erro-pesquisa');
                                    if (erroPesquisa && !erroPesquisa.hasChildNodes()) {
                                        erroPesquisa.innerHTML = "<h3>Nenhum post encontrado.</h3>";
                                    }
                                }
                                checkErroPesquisa();
                            }, 400)}
                        </>
                    )}
                </div>
            </div >

        </>
    );
}
export default Usuarios;