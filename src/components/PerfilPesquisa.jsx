import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style-perfil.css";
import Cookies from "js-cookie";
import { BeatLoader } from 'react-spinners';
import Discord from "../imagens/discord.png";

const PerfilPesquisa = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [verificaSeguir, setVerificaSeguir] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState([]);
    const [interesses, setInteresses] = useState([]);
    const [novaUrl, setNovaUrl] = useState("");
    const [listaInteresses, setListaInteresses] = useState([]);

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get("token");
            const headers = {
                "x-access-token": token,
            };
            const response = await axios.get(
                "https://server-link-minds.vercel.app/usuarioInfo",
                { headers }
            );
            setUsuario(response.data);
        };
        getUsuario();
    }, [usuario.length == 0]);

    useEffect(() => {
        const getPosts = async () => {
            const email = props.usuarioSelecionado.email;
            const token = Cookies.get("token");
            const headers = {
                "x-access-token": token,
                email: email,
            };
            const response = await axios.get(
                "https://server-link-minds.vercel.app/postsPerfilPesquisa",
                { headers }
            );
            setPosts(response.data.reverse());
        };
        getPosts();
    }, [posts.length == 0]);

    useEffect(() => {
        const getInteresses = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/listaInteresse', { headers });
            setListaInteresses(response.data);
        };
        getInteresses();
    }, [listaInteresses.length == 0]);

    useEffect(() => {
        const getSeguidores = async () => {
            const seguidores = props.usuarioSelecionado.usuariosSeguidores;
            seguidores.map((seguidor) => {
                if (seguidor == usuario.email) {
                    setVerificaSeguir(true);
                }
            });
        };
        getSeguidores();
    }, [usuario]);

    useEffect(() => {
        const getUsuarioSelecionado = async () => {
            const token = Cookies.get("token");
            const email = props.usuarioSelecionado.email;
            const headers = {
                "x-access-token": token,
                email: email,
            };
            const response = await axios.get(
                "https://server-link-minds.vercel.app/usuarioSelecionado",
                { headers }
            );
            setUsuarioSelecionado(response.data);
            const urlOriginal = props.usuarioSelecionado.foto;
            setNovaUrl(urlOriginal.replace(/s96-c/, "s1000-c"));
            setInteresses(props.usuarioSelecionado.interesses);
        };
        getUsuarioSelecionado();
    }, [usuarioSelecionado.length == 0]);

    const handleClickSeguir = async () => {
        const token2 = Cookies.get("token");
        const email = usuario.email;
        const usuarioSelecionadoEmail = props.usuarioSelecionado.email;
        const usuariosSeguindo = usuario.usuariosSeguindo;
        usuariosSeguindo.push(usuarioSelecionadoEmail);
        axios.put("https://server-link-minds.vercel.app/seguindo", {
            token2,
            email,
            usuariosSeguindo
        });
        const nome = usuario.nome;
        const usuariosSeguidores = props.usuarioSelecionado.usuariosSeguidores;
        const apelido = props.usuarioSelecionado.apelido;
        usuariosSeguidores.push(email);
        axios.put("https://server-link-minds.vercel.app/seguir", {
            token2,
            usuarioSelecionadoEmail,
            usuariosSeguidores,
            nome,
            apelido
        });
        navigate("/");
    };

    const handleClickPararDeSeguir = async () => {
        const token2 = Cookies.get("token");
        const email = usuario.email;
        const usuarioSelecionadoEmail = props.usuarioSelecionado.email;
        const usuariosSeguindo = usuario.usuariosSeguindo;
        const index = usuariosSeguindo.indexOf(usuarioSelecionadoEmail);
        usuariosSeguindo.splice(index, 1);
        axios.put("https://server-link-minds.vercel.app/seguindo", {
            token2,
            email,
            usuariosSeguindo
        });

        const usuariosSeguidores = props.usuarioSelecionado.usuariosSeguidores;
        const index2 = usuariosSeguidores.indexOf(email);
        usuariosSeguidores.splice(index2, 1);
        axios.put("https://server-link-minds.vercel.app/seguidores", {
            token2,
            usuarioSelecionadoEmail,
            usuariosSeguidores
        });
        navigate("/");
    };

    return (
        <>
            <div className="main-perfil">
                <div className="wrapper-perfil-top">
                    <div
                        className="img-perfil"
                        style={{ backgroundImage: `url(${novaUrl})` }}
                    ></div>

                    <div className="wrapper-perfil-left">
                        <section className="conteudo">
                            <div className="top-perfil">
                                <h1 className="nome-perfil">
                                    {props.usuarioSelecionado.apelido
                                        ? props.usuarioSelecionado.apelido
                                        : <BeatLoader color={"#fff"} loading={true} size={10} />
                                    }
                                </h1>
                                <h2 className="idade-perfil">
                                    {props.usuarioSelecionado.idade
                                        ? props.usuarioSelecionado.idade
                                        : <BeatLoader color={"#fff"} loading={true} size={10} />
                                    } Anos
                                </h2>
                            </div>
                        </section>
                        <section className="bio">
                            <h1 className="bio-header">Bio</h1>
                            <h1 className="bio-text">
                                <span className="verde-aspas">"</span>
                                {props.usuarioSelecionado.descricao
                                    ? props.usuarioSelecionado.descricao
                                    : <BeatLoader color={"#fff"} loading={true} size={10} />
                                }
                                <span className="verde-aspas">"</span>
                            </h1>
                        </section>
                        <div className="seg-container">
                        {props.usuarioSelecionado.discord ? <div className="dc" onClick={() => window.open(`https://discord.com/users/${props.usuarioSelecionado.discord}, '_blank'`)} ><img src={Discord} alt="" /><p>{props.usuarioSelecionado.discord}</p></div> : null}
                            {verificaSeguir ? (
                                <button
                                    className="btn-seg"
                                    id="deslogar"
                                    onClick={handleClickPararDeSeguir}
                                >
                                    Deixar de Seguir
                                </button>
                            ) : (
                                <button className="btn-seg" onClick={handleClickSeguir}>
                                    Seguir
                                </button>
                            )}
                            <div className="seg-c-2">


                                <button
                                    className="btn-seg"
                                    onClick={(e) =>
                                        props.handleClickSeguidoresPP(e, usuarioSelecionado)
                                    }
                                >
                                    Seguidores
                                </button>
                                <button
                                    className="btn-seg"
                                    onClick={(e) =>
                                        props.handleClickSeguindoPP(e, usuarioSelecionado)
                                    }
                                >
                                    Seguindo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper-perfil-bottom">
                    <section className="meus-interesses">
                        <div className="header-perfil-container">
                            <h1 className="inter-header">Interesses</h1>
                            <div className="linha-verde"></div>
                        </div>
                        <div className="inter-container" >
                            {
                                listaInteresses
                                    .filter((interesse) => interesses.includes(interesse.nome))
                                    .map((interesse, index) => (
                                        <div
                                            className="interesse-card"
                                            key={index}
                                            style={{ backgroundImage: `url(${interesse.imagem})` }}
                                        >
                                            <p className="inter-title">{interesse.nome}</p>
                                        </div>
                                    ))
                            }
                        </div>
                    </section>
                    <section className="meus-posts">
                        <div className="header-perfil-container">
                            <h1 className="inter-header">Posts</h1>
                            <div className="linha-verde"></div>
                        </div>
                        <div className="posts-main">
                            {posts.map((post, index) => {
                                return (
                                    <div className="card-body" key={index}>
                                        <div
                                            className="card"
                                            style={{ backgroundImage: `url(${post.imagemEvento})` }}
                                        >
                                            <div className="card-top" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>
                                                <img src={post.foto} alt="" className="pfp" />
                                                <div className="textos-card">
                                                    <p className="nome-card">{post.nome}</p>
                                                    <p className="info">
                                                        {post.evento} as{" "}
                                                        <span>
                                                            {post.hora} do dia {post.data}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className="participar"
                                                onClick={(e) => props.handleClickAtivaDescricao(e, post)}
                                            >
                                                Descrição
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
export default PerfilPesquisa;
