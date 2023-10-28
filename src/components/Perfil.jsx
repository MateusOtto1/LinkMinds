import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import axios from "axios";
import lapis from "../imagens/editar.svg";
import "../css/style-perfil.css";
import Cookies from 'js-cookie';

const Perfil = (props) => {
    const { signOut } = useContext(AuthGoogleContext);
    const [usuarios, setUsuarios] = useState({});
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [interesses, setInteresses] = useState([]);
    const [novaUrl, setNovaUrl] = useState('');

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setUsuarios(response.data);
            setEmail(usuarios.email);
            setInteresses(response.data.interesses);
            if (!usuarios || !usuarios.foto) {
                return null;
            }
            const urlOriginal = usuarios.foto;
            const novaFoto = urlOriginal.replace(/s96-c/, 's1000-c');
            setNovaUrl(novaFoto);
        };
        getUsuario();
    }, [email == '']);

    useEffect(() => {
        const getPosts = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token,
                "email": email
            };
            const response = await axios.get('https://server-link-minds.vercel.app/postsInfo', { headers });
            setPosts(response.data.reverse());
        };
        getPosts();
    },[usuarios]);

    return (
        <>
            <div className="main-perfil">
                <div className="wrapper-perfil-top">

                    <div className="img-perfil" style={{backgroundImage: `url(${novaUrl})`}}></div>

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
                            <button className="btn-deslogar" onClick={signOut}>Deslogar</button>
                        </div>

                    </div>


                </div>

                <div className="wrapper-perfil-bottom">
                    <section className="meus-interesses">
                        <h1 className="inter-header">Interesses</h1>
                        {
                            interesses.map((interesse, index) => {
                                return (
                                    <div className="interesse-card" key={index}>
                                        <p className="inter-title">{interesse}</p>
                                    </div>
                                );
                            })
                        } 
                    </section>
                    <section className="meus-posts">
                        <h1 className="post-header">Posts</h1>
                        <div className="posts-main">
                            {posts.map((post, index) => {
                                return (
                                    <div className="post-card" key={index}>
                                        <div className="post-top">
                                            <div className="img-post" style={{backgroundImage: `url(${post.imagemEvento})`}}></div>
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