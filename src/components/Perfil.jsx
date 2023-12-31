import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import axios from "axios";
import lapis from "../imagens/editar.svg";
import "../css/style-perfil.css";
import Cookies from 'js-cookie';
import { HashLoader } from 'react-spinners';
import { BeatLoader } from 'react-spinners';
import Discord from "../imagens/discord.png";

const Perfil = (props) => {
    const { signOut } = useContext(AuthGoogleContext);
    const [usuarios, setUsuarios] = useState({});
    const [posts, setPosts] = useState([]);
    const [email, setEmail] = useState('');
    const [interesses, setInteresses] = useState([]);
    const [novaUrl, setNovaUrl] = useState('');
    const [listaInteresses, setListaInteresses] = useState([]);

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
    }, [usuarios]);

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <div className="main-perfil">
                <div className="wrapper-perfil-top">


                    <div className="img-perfil" style={{ backgroundColor: '#181c22', backgroundImage: `url(${novaUrl})` }} onLoad={handleImageLoad}>

                    </div>

                    <div className="wrapper-perfil-left">

                        <section className="conteudo">
                            <div className="top-perfil">
                                <h1 className="nome-perfil">{usuarios.apelido
                                    ? usuarios.apelido
                                    : <BeatLoader color={"#fff"} loading={true} size={10} />
                                }</h1>
                                <h2 className="idade-perfil">{usuarios.idade
                                    ? usuarios.idade
                                    : <BeatLoader color={"#fff"} loading={true} size={10} />
                                } Anos</h2>
                            </div>
                        </section>
                        <section className="bio">
                            <h1 className="bio-header">Bio</h1>
                            <h1 className="bio-text"><span className="verde-aspas">"</span>{usuarios.descricao
                                ? usuarios.descricao
                                : <BeatLoader color={"#fff"} loading={true} size={10} />
                            }<span className="verde-aspas">"</span></h1>
                            
                        </section>

                        <div className="seg-container">
                                {usuarios.discord ? <div className="dc"><img src={Discord} alt="" /><p>{usuarios.discord}</p></div> : null}
                                <div className="seg-c-2">
                                    <button className="btn-seg" onClick={(e) => props.handleClickSeguidores(e)}>Seguidores</button>
                                    <button className="btn-seg" onClick={(e) => props.handleClickSeguindo(e)}>Seguindo</button>
                                </div>
                                <div className="seg-c-2" onClick={(e) => props.handleClickAlterarBio(e)}>
                                    <img src={lapis} className="lapis" />
                                    <button className="btn-seg">Editar Perfil</button>
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

                        <div className="inter-container">
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
                                            </div><button
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
                <div className="seg-container">
                        <button className="btn-seg" id="deslogar" onClick={signOut}>Deslogar</button>
                    </div>
            </div>

        </>
    );
}
export default Perfil;