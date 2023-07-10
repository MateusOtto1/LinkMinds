import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criarColorido from "../imagens/CriarColorido.png";
import pessoa from "../imagens/Pessoa.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Criar = () => {
    const navigate = useNavigate();
    const [evento, setEvento] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [preencha, setPreencha] = useState('');
    const [nome, setNome] = useState('');
    const [posts, setPosts] = useState([]);
    const [postExistente, setPostExistente] = useState([false]);

    useEffect(() => {
        const checkInput = async () => {
            posts.map((post) => {
                if (evento == post.evento && data == post.data && hora == post.hora && local == post.local) {
                    setPreencha('Post já existente');
                    setPostExistente(true);
                }
                else {
                    setPostExistente(false);
                }
            });
            if (evento == '' || data == '' || hora == '' || local == '') {
                setPreencha('Preencha todos os campos');
            }else {
                setPreencha('');
            }
        };
        checkInput();
    }, [evento, data, hora, local]);

    useEffect(() => {
        const getUser = async () => {
            const email = localStorage.getItem('email');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { email });
            setNome(response.data.nome);
        };
        getUser();
    }, []);

    useEffect(() => {
        const getPost = async () => {
            const email = localStorage.getItem('email');
            const response = await axios.post('http://localhost:3001/postsInfo', { email });
            setPosts(response.data);
        };
        getPost();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (evento == '' || data == '' || hora == '' || local == '' || postExistente == true) {
            setPreencha('Você já criou este post ou não preencheu todos os campos');
        } else {
            const email = localStorage.getItem('email');
            await axios.post('http://localhost:3001/posts', { email, nome, evento, data, hora, local }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/Home');
        }
    };

    function handleClickHome() {
        navigate('/Home');
    };
    function handleClickCreate() {
        navigate('/Criar');
    };
    function handleClickPerfil() {
        navigate('/Perfil');
    };

    return (
        <>
            <div className="Fundo">
                <h1 className="criar"><span className="spanTexto">Criar</span>post</h1>
                <div className="bordaBio">
                    <div className="fundoMenorBio">
                        <form>
                            <input type="text" placeholder="Nome do Esporte/Jogo" className="inputCriar" onChange={(e) => setEvento(e.target.value)} />
                            <input type="date" className="inputCriar" onChange={(e) => setData(e.target.value)} />
                            <input type="time" className="inputCriar" onChange={(e) => setHora(e.target.value)} />
                            <input type="text" placeholder="Local" className="inputCriar" onChange={(e) => setLocal(e.target.value)} />
                            <p className="preencha">{preencha}</p>
                            <button className="criarPost" onClick={handleSubmit} >Criar</button>
                        </form>
                    </div>
                </div>
                <div className="navbar">
                    <img className="imgCasa" src={casa} onClick={handleClickHome} />
                    <img className="imgCriar" src={criarColorido} onClick={handleClickCreate} />
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Criar;