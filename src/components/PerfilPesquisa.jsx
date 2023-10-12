import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style-perfil.css";
import Cookies from 'js-cookie';

const Perfil = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [verificaSeguir, setVerificaSeguir] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const nome = props.usuarioSelecionado.nome;
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsPerfilPesquisa', { token, nome });
            setPosts(response.data);
        }
        getPosts();
    }, []);

    useEffect(() => {
        const getSeguidores = async () => {
            const seguidores = props.usuarioSelecionado.usuariosSeguidores;
            seguidores.map((seguidor) => {
                if(seguidor == usuario.email){
                    setVerificaSeguir(true);
                }
            })
        }
        getSeguidores();
    });

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuario(response.data);
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getUsuarioSelecionado = async () => {
            const token = Cookies.get('token');
            const email = props.usuarioSelecionado.email;
            const response = await axios.post('http://localhost:3001/usuarioSelecionado', { token, email });
            setUsuarioSelecionado(response.data);
        };
        getUsuarioSelecionado();
    });

    const handleClickSeguir = async () => {
        const token = Cookies.get('token');
        const email = usuario.email;
        const usuarioSelecionadoEmail = props.usuarioSelecionado.email;
        const usuariosSeguindo = usuario.usuariosSeguindo;
        usuariosSeguindo.push(usuarioSelecionadoEmail);
        axios.put('http://localhost:3001/seguindo', { token, email, usuariosSeguindo });

        const usuariosSeguidores = props.usuarioSelecionado.usuariosSeguidores;
        usuariosSeguidores.push(email);
        axios.put('http://localhost:3001/seguidores', { token, usuarioSelecionadoEmail, usuariosSeguidores });
        navigate('/');
    };

    const handleClickPararDeSeguir = async () => {
        const token = Cookies.get('token');
        const email = usuario.email;
        const usuarioSelecionadoEmail = props.usuarioSelecionado.email;
        const usuariosSeguindo = usuario.usuariosSeguindo;
        const index = usuariosSeguindo.indexOf(usuarioSelecionadoEmail);
        usuariosSeguindo.splice(index, 1);
        axios.put('http://localhost:3001/seguindo', { token, email, usuariosSeguindo });

        const usuariosSeguidores = props.usuarioSelecionado.usuariosSeguidores;
        const index2 = usuariosSeguidores.indexOf(email);
        usuariosSeguidores.splice(index2, 1);
        axios.put('http://localhost:3001/seguidores', { token, usuarioSelecionadoEmail, usuariosSeguidores });
        navigate('/');
    };

    return (
        <>
            <div className="main-perfil">
                <div className="wrapper-perfil-top">

                    <div className="img-perfil" style={{ backgroundImage: `url(${props.usuarioSelecionado.foto})`}}></div>

                    <div className="wrapper-perfil-left">
                        <section className="conteudo">
                            <div className="top-perfil">
                                <h1 className="nome-perfil">{props.usuarioSelecionado.apelido}</h1>
                                <h2 className="idade-perfil">{props.usuarioSelecionado.idade} Anos</h2>
                            </div>
                        </section>
                        <section className="bio">
                            <h1 className="bio-header">Bio</h1>
                            <h1 className="bio-text"><span className="verde-aspas">"</span>{props.usuarioSelecionado.descricao}<span className="verde-aspas">"</span></h1>
                        </section>
                        <div>
                            {
                                verificaSeguir ? <button className="btn-parar-seguir" onClick={handleClickPararDeSeguir}>Parar de Seguir</button> : <button className="btn-seguir" onClick={handleClickSeguir}>Seguir</button>
                            }
                            <button className="btn-seguidores" onClick={(e) => props.handleClickSeguidoresPP(e, usuarioSelecionado)}>Seguidores</button>
                            <button className="btn-seguindo" onClick={(e) => props.handleClickSeguindoPP(e, usuarioSelecionado)}>Seguindo</button>
                        </div>
                    </div>
                </div>
                <div className="wrapper-perfil-bottom">
                    <section className="meus-interesses">
                        <h1 className="inter-header">Interesses</h1>
                        <div className="interesse-card">
                            <p className="inter-title">{props.usuarioSelecionado.interesses}</p>
                        </div>
                    </section>
                    <section className="meus-posts">
                        <h1 className="post-header">Posts</h1>
                        <div className="posts-main">
                            {posts.map((post, index) => {
                                return (
                                    <div className="post-card" key={index}>
                                        <div className="post-top">
                                            <div className="img-post"></div>
                                            <div className="post-text">
                                                <h1 className="post-title">{post.evento}</h1>
                                                <p className="post-dia">{post.data}</p>
                                            </div>
                                        </div>
                                        <button className="btn-detalhe" onClick={(e) => props.handleClickAtivaDescricao(e, post)} >Ver detalhes</button>
                                    </div>

                                );
                            })}

                        </div>
                    </section>
                </div>

            </div>

        </>
    );
}
export default Perfil;