import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/style-criar.css";
import Cookies from 'js-cookie';

const Criar = (props) => {
    const navigate = useNavigate();
    const [evento, setEvento] = useState('');
    const [dataEUA, setDataEUA] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [endereco, setEndereco] = useState('');
    const [preencha, setPreencha] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [posts, setPosts] = useState([]);
    const [postExistente, setPostExistente] = useState(false);
    const [email, setEmail] = useState('');
    const [dataBrasil, setDataBrasil] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');
    const [imagemEvento, setImagemEvento] = useState('');
    const [precisaLocal, setPrecisaLocal] = useState(false);
    const [execucoes, setExecucoes] = useState(0);
    const [contador, setContador] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [podeCriar, setPodeCriar] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        // Carrega a API do Google Maps
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZ7VsqZJbfA8KEAo5HgKzz2As_HgkjO2k&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.head.appendChild(script);

        window.initAutocomplete = initAutocomplete;

        return () => {
            // Limpa a tag de script quando o componente é desmontado
            document.head.removeChild(script);
            delete window.initAutocomplete;
        };
    }, [local]);

    const initAutocomplete = () => {
        const input = document.getElementById('autocomplete');
        const newAutocomplete = new window.google.maps.places.Autocomplete(input);
        // Evento disparado quando um local é selecionado
        newAutocomplete.addListener('place_changed', () => {
            const selectedPlace = newAutocomplete.getPlace();
            setLocal(selectedPlace.name);
            setEndereco(selectedPlace.formatted_address);
        });
        setAutocomplete(newAutocomplete);
    };

    useEffect(() => {
        const checkInput = async () => {
            const dataBr = dataEUA.split('-');
            const data = `${dataBr[2]}/${dataBr[1]}/${dataBr[0]}`;
            setDataBrasil(data);
            setPostExistente(false);
            setPodeCriar(false);
            posts.map((post) => {
                if (evento == post.evento && dataBrasil == post.data && hora == post.hora && local == post.local) {
                    setPostExistente(true);
                    setPodeCriar(false);
                }
            });
            if (precisaLocal == true) {
                if (dataEUA == '' || hora == '' || local == '') {
                    setPodeCriar(false);
                    setPostExistente(false);
                    setPreencha('Você não preencheu todos os campos');
                } else {
                    setPreencha('');
                    setPodeCriar(true);
                }
            } else {
                if (dataEUA == '' || hora == '') {
                    setPreencha('Você não preencheu todos os campos');
                    setPodeCriar(false);
                    setPostExistente(false);
                } else {
                    setPreencha('');
                    setPodeCriar(true);
                }
            }
            if (postExistente == true) {
                setPreencha('Você já criou este post');
                setPodeCriar(false);
            }
        };
        checkInput();
    });

    useEffect(() => {
        const getUser = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setNome(response.data.nome);
            setFoto(response.data.foto);
            setEmail(response.data.email);
        };
        getUser();
    }, [email == '']);

    useEffect(() => {
        const getPost = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token,
                "email": email
            };
            const response = await axios.get('https://server-link-minds.vercel.app/postsInfo', { headers });
            setPosts(response.data);
        };
        getPost();
    }, [email == "" && posts.length == 0]);

    useEffect(() => {
        const tipoInteresse = async () => {
            setTipoEvento(props.interesseSelecionado.tipoEvento);
            setImagemEvento(props.interesseSelecionado.imagem);
            setEvento(props.interesseSelecionado.nome);
            if (tipoEvento == 'Esporte') {
                setPrecisaLocal(true);
            }
            if (tipoEvento == 'Jogo') {
                setPrecisaLocal(false);
            }
            if (tipoEvento == 'Festa') {
                setPrecisaLocal(true);
            }
        };
        tipoInteresse();
    }, [execucoes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (podeCriar == false) {
            setPreencha('Você já criou este post ou não preencheu todos os campos');
        } else {
            const dataBr = dataEUA.split('-');
            const data = `${dataBr[2]}/${dataBr[1]}/${dataBr[0]}`;
            const presenca = 0;
            const token2 = Cookies.get('token');
            axios.post('https://server-link-minds.vercel.app/posts', { token2, email, nome, evento, tipoEvento, descricao, data, hora, local, endereco, presenca, foto, imagemEvento });
            navigate('/');
        }
    };

    useEffect(() => {
        if (contador < 30) {
            setExecucoes(execucoes + 1);
            setContador(contador + 1);
        }
    }, [contador]);

    if (precisaLocal == true) {
        return (
            <>
                <div className="main-criar">
                    <div className="criar-header" style={{ backgroundImage: `linear-gradient(to top, #181d22, transparent), url(${imagemEvento})` }}></div>
                    <div id="wrapper-criar">

                        <div className="header-tipo">
                            <p>Data</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="date" placeholder="Digite Aqui" className="input-style" onChange={(e) => setDataEUA(e.target.value)} />
                        </div>

                        <div className="header-tipo">
                            <p>Horário</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="time" placeholder="Digite Aqui" className="input-style" onChange={(e) => setHora(e.target.value)} />
                        </div>

                        <div className="header-tipo">
                            <p>Local</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="text" id="autocomplete" className="input-style" placeholder="Digite o local" onChange={(e) => setLocal(e.target.value)} />
                        </div>

                        <div className="header-tipo">
                            <p>Descrição</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="text" maxLength="100" placeholder="Digite Aqui" className="input-style" onChange={(e) => setDescricao(e.target.value)} />
                        </div>

                        <p className="preencha">{preencha}</p>
                        <button className="btn-criar" onClick={handleSubmit}>Criar Evento</button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="main-criar">
                    <div className="criar-header" style={{ backgroundImage: `linear-gradient(to top, #181d22, transparent), url(${imagemEvento})` }}></div>
                    <div id="wrapper-criar">

                        <div className="header-tipo">
                            <p>Data</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="date" placeholder="Digite Aqui" className="input-style" onChange={(e) => setDataEUA(e.target.value)} />
                        </div>

                        <div className="header-tipo">
                            <p>Horário</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="time" placeholder="Digite Aqui" className="input-style" onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <div className="header-tipo">
                            <p>Descrição</p>
                            <div className="linha-tipo"></div>
                        </div>
                        <div className="editar-input">
                            <input type="text" maxLength="100" placeholder="Digite Aqui" className="input-style" onChange={(e) => setDescricao(e.target.value)} />
                        </div>

                        <p className="preencha">{preencha}</p>
                        <button className="btn-criar" onClick={handleSubmit}>Criar Evento</button>
                    </div>
                </div>
            </>
        );
    }
}
export default Criar;