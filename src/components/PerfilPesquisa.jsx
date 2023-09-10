import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style-perfil.css";

const Perfil = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            document.querySelector('.img-perfil').style.backgroundImage = `url(${props.usuarioSelecionado.foto})`;
            const nome = props.usuarioSelecionado.nome;
            const response = await axios.post('https://server-linkme.onrender.com/postsPerfilPesquisa', { nome });
            setPosts(response.data);
        }
        getPosts();
    }, []);

    return (
        <>
            <div className="main-perfil">
                <div className="wrapper-perfil-top">

                    <div className="img-perfil"></div>

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