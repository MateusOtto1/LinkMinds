import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../css/style-home.css";
import Cookies from 'js-cookie';
import { BeatLoader } from 'react-spinners';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [interesses, setInteresses] = useState([]);
    const [postsInteresses, setPostsInteresses] = useState([]);
    const [seguindo, setSeguindo] = useState([]);
    const [seguidores, setSeguidores] = useState([]);
    const [postsSeguindo, setPostsSeguindo] = useState([]);
    const [postsSeguidores, setPostsSeguidores] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            if (response.data) {
                setUsuarios(response.data);
                setEmail(response.data.email);
                setInteresses(await response.data.interesses);
                setSeguindo(response.data.usuariosSeguindo);
                setSeguidores(response.data.usuariosSeguidores);
            } else {
                setUsuarios({});
                setEmail('');
                setInteresses([]);
            }
        };
        getUsuario();
    }, [!interesses]);

    useEffect(() => {
        const getPost = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response2 = await axios.get('https://server-link-minds.vercel.app/postsHome', { headers }).then((response2) => { return response2; });
            setPosts(await response2.data.reverse());
            if (interesses) {
                const postsInteresses = response2.data.filter((post) => { return interesses.includes(post.evento); });
                setPostsInteresses(postsInteresses);
            }
            const postsSeguindo = posts.filter((post) => { return seguindo.includes(post.email); });
            setPostsSeguindo(postsSeguindo);
            const postsSeguidores = posts.filter((post) => { return seguidores.includes(post.email); });
            setPostsSeguidores(postsSeguidores);
        };
        getPost();
    }, [interesses]);

    if (usuarios.apelido == "") {
        return <Navigate to="/Cadastro" />
    }
    else {
        return (
            <>
                <div className="main-home">


                    <div id="wrapper">
                        <h1 id="bv">BEM-VINDO</h1>
                        <h1 id="nome" >{usuarios.apelido
                            ? usuarios.apelido
                            : <BeatLoader color={"#fff"} loading={true} size={20} />
                        }</h1>
                    </div>
                    <div className="header-perfil-container">
                        <h1 className="inter-header">Eventos</h1>
                        <div className="linha-verde"></div>
                    </div>
                    <div id="posts">

                        {postsInteresses.map((post, index) => {
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
                                            </div>
                                            <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                        </div>
                                    )
                                }
                            }
                        })}

                    </div>
                    <div className="header-perfil-container">
                        <h1 className="inter-header">Seguindo</h1>
                        <div className="linha-verde"></div>
                    </div>
                    <div id="posts">

                        {postsSeguindo.map((post, index) => {
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
                                            </div>
                                            <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                        </div>
                                    )
                                }
                            } else {
                                return (
                                    <div></div>
                                )
                            }
                        })}

                    </div>

                    <div className="header-perfil-container">
                        <h1 className="inter-header">Seguidores</h1>
                        <div className="linha-verde"></div>
                    </div>
                    <div id="posts">

                        {postsSeguidores.map((post, index) => {
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
                                            </div>
                                            <button className="participar" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Descrição</button>
                                        </div>
                                    )
                                }
                            } else {
                                return (
                                    <div></div>
                                )
                            }
                        })}

                    </div>
                </div>
            </>
        );
    }
}
export default Home;