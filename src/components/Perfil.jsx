import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lapis from "../imagens/editar.svg";
import "../css/style-perfil.css";
import Cookies from 'js-cookie';

const Perfil = (props) => {
    const { signOut } = useContext(AuthGoogleContext);
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState({});
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
            setEmail(response.data.email);
            document.querySelector('.img-perfil').style.backgroundImage = `url(${response.data.foto})`;
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsInfo', { token, email });
            setPosts(response.data);
        };
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
                                <h1 className="nome-perfil">{usuarios.apelido}</h1>
                                <h2 className="idade-perfil">{usuarios.idade} Anos</h2>
                            </div>
                        </section>
                        <section className="bio">
                            <h1 className="bio-header">Bio</h1>
                            <h1 className="bio-text"><span className="verde-aspas">"</span>{usuarios.descricao}<span className="verde-aspas">"</span></h1>
                        </section>
                        <div className="btn-editar" onClick={(e) => props.handleClickAlterarBio(e)}>
                            <img src={lapis} alt="" />
                            <button className="btn">Editar Perfil</button>
                        </div>
                        <div>
                            <button className="btn-seguidores" onClick={(e) => props.handleClickSeguidores(e)}>Seguidores</button>
                            <button className="btn-seguindo" onClick={(e) => props.handleClickSeguindo(e)}>Seguindo</button>
                        </div>

                    </div>


                </div>

                <div className="wrapper-perfil-bottom">
                    <section className="meus-interesses">
                        <h1 className="inter-header">Interesses</h1>
                        <div className="interesse-card">
                            <p className="inter-title">{usuarios.interesses}</p>
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
                                        <button className="btn-detalhe" onClick={(e) => props.handleClickAtivaDescricao(e, post)}>Ver detalhes</button>
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