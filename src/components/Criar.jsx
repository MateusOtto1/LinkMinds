import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/style-criar.css";
import Cookies from 'js-cookie';

const Criar = () => {
    const navigate = useNavigate();
    const [evento, setEvento] = useState('');
    const [dataEUA, setDataEUA] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [preencha, setPreencha] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [posts, setPosts] = useState([]);
    const [postExistente, setPostExistente] = useState([false]);
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const checkInput = async () => {
            posts.map((post) => {
                if (evento == post.evento && dataEUA == post.data && hora == post.hora && local == post.local) {
                    setPreencha('Post já existente');
                    setPostExistente(true);
                }
                else {
                    setPostExistente(false);
                }
            });
            if (evento == '' || dataEUA == '' || hora == '' || local == '') {
                setPreencha('Preencha todos os campos');
            } else {
                setPreencha('');
            }
        };
        checkInput();
    }, [evento, dataEUA, hora, local]);

    useEffect(() => {
        const getUser = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setNome(response.data.nome);
            setFoto(response.data.foto);
            setEmail(response.data.email);
        };
        getUser();
    }, []);

    useEffect(() => {
        const getPost = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/postsInfo', { token, email });
            setPosts(response.data);
        };
        getPost();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (evento == '' || dataEUA == '' || hora == '' || local == '' || postExistente == true) {
            setPreencha('Você já criou este post ou não preencheu todos os campos');
        } else {
            const dataBr = dataEUA.split('-');
            const data = `${dataBr[2]}/${dataBr[1]}/${dataBr[0]}`;
            const presenca = 0;
            const token = Cookies.get('token');
            axios.post('http://localhost:3001/posts', { token, email, nome, evento, data, hora, local, presenca, foto });
            navigate('/');
        }
    };

    return (
        <>
            <div className="main-criar">
                <h1 id="criar-header" data-text="Criar Post">Criar Post</h1>
                <div id="wrapper-criar">
                    <div className="body-inp">
                        <p className="inp-header">Nome do evento</p>
                        <input type="text" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setEvento(e.target.value)} />
                    </div>
                    <div className="body-inp">
                        <p className="inp-header">Data</p>
                        <input type="date" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setDataEUA(e.target.value)} />
                    </div>
                    <div className="body-inp">
                        <p className="inp-header">Horário</p>
                        <input type="time" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setHora(e.target.value)} />
                    </div>
                    <div className="body-inp">
                        <p className="inp-header">Local do evento</p>
                        <input type="text" placeholder="Digite Aqui" className="inp-criar" onChange={(e) => setLocal(e.target.value)} />
                    </div>
                    <p className="preencha">{preencha}</p>
                    <button id="btn-criar" onClick={handleSubmit}>Criar Evento</button>
                </div>
            </div>
        </>
    );
}
export default Criar;