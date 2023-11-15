import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style-cadastro.css";
import Cookies from 'js-cookie';

const Bio = () => {
    const [apelido, setApelido] = useState('');
    const [idade, setIdade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [discord, setDiscord] = useState('');
    const [preencha, setPreencha] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [listaInteresse, setListaInteresse] = useState([]);
    const [pesquisaInteresse, setPesquisaInteresse] = useState('');
    const [pesquisa, setPesquisa] = useState([]);
    const [interessesSelecionados, setInteressesSelecionados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const headers = {
                "x-access-token": token
            }
            const response = await axios.get('https://server-link-minds.vercel.app/usuarioInfo', { headers });
            setUsuarios(response.data);
            setApelido(response.data.apelido);
            setIdade(response.data.idade);
            setDescricao(response.data.descricao);
            setDiscord(response.data.discord);
            setInteressesSelecionados(response.data.interesses);
            const response2 = await axios.get('https://server-link-minds.vercel.app/listaInteresse', { headers });
            setListaInteresse(response2.data);
            if (pesquisaInteresse == '') {
                setPesquisa(response2.data);
            }
        };
        getUsuario();
    }, []);

    const handleChangeInteresses = (e) => {
        const valorCheckbox = e.target.value;
        if (e.target.checked) {
            setInteressesSelecionados([...interessesSelecionados, valorCheckbox]);
        } else {
            setInteressesSelecionados(interessesSelecionados.filter((item) => item !== valorCheckbox));
        }
    };

    const handlePesquisaInteresse = (e) => {
        const pesquisa = e.target.value;
        setPesquisaInteresse(pesquisa);
    };

    const handleBlurPesquisa = () => {
        if (pesquisaInteresse === '') {
            setPesquisa(listaInteresse);
        }
    };

    useEffect(() => {
        const pesquisaInput = async () => {
            const interessesPesquisa = listaInteresse.filter((interesse) => interesse.nome.toString().toLowerCase().includes(pesquisaInteresse.toLowerCase()));
            setPesquisa(interessesPesquisa);
        };
        pesquisaInput();
    }, [pesquisaInteresse, listaInteresse]);

    useEffect(() => {
        const checkInput = async () => {
            if (apelido == '' || idade == '' || interessesSelecionados.length === 0 || descricao == '') {
                setPreencha('Preencha todos os campos');
            } else {
                setPreencha('');
            }
        };
        checkInput();
    }, [apelido, idade, interessesSelecionados, descricao]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (apelido == '' || idade == '' || interessesSelecionados.length === 0 || descricao == '') {
            setPreencha('Preencha todos os campos');
        } else {
            const token2 = Cookies.get('token');
            await axios.put('https://server-link-minds.vercel.app/usuario', { token2, apelido, idade, interesses: interessesSelecionados, descricao, discord }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    };

    return (
        <>
            <div className="main-cadastro">

                <div className="cadastro">
                    <h1 className="bv-cad">Editar perfil</h1>
                    <h1 className="cad">Preencha os campos abaixo para editar.</h1>
                </div>
                <div className="cad-pic">
                    <img src={usuarios.foto} alt="" loading="lazy" className="pfp-cadastro" />
                    <div className="cad-text">
                        <h1>Esta é a sua imagem de perfil</h1>
                        <p>Nós puxamos a imagem da sua conta Google</p>
                    </div>
                </div>

                <div className="inputs-cadastro">
                    <div className="header-tipo">
                        <p>Apelido</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="editar-input">
                        <input type="text" maxLength="10" name="nome" className="input-style" placeholder="Seu Apelido" defaultValue={usuarios.apelido} onChange={(e) => setApelido(e.target.value)}/>
                    </div>
                    <div className="header-tipo">
                        <p>Idade</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="editar-input">
                        <input type="number" name="idade" className="input-style" placeholder="Sua Idade" defaultValue={usuarios.idade} onChange={(e) => setIdade(e.target.value)}/>
                    </div>
                    <div className="header-tipo">
                        <p>Discord</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="editar-input">
                        <input type="text" maxLength="10" name="discord" className="input-style" defaultValue={usuarios.discord} placeholder="Seu Discord" onChange={(e) => setDiscord(e.target.value)} />
                    </div>
                    <div className="header-tipo">
                        <p>Bio</p>
                        <div className="linha-tipo"></div>
                    </div>
                    <div className="editar-input">
                        <textarea name="bio" maxLength="150" id="" cols="30" rows="5" className="input-style" defaultValue={usuarios.descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="header-tipo">
                    <p>Interesses</p>
                    <div className="linha-tipo"></div>
                </div>
                <div className="interesse-cad-input">
                    <div className="editar-input">
                        <input type="text" placeholder="Procurar Interesse..." className="input-style" value={pesquisaInteresse} onChange={handlePesquisaInteresse} onBlur={handleBlurPesquisa} />
                    </div>

                    <div className="inter-container inter-editar">
                        {
                            pesquisa.map((interesse, index) => {
                                const isChecked = interessesSelecionados.includes(interesse.nome);
                                return (
                                    <label className="interesse-card inter-bio-cont" key={index} style={{ backgroundImage: `url(${interesse.imagem})` }}>
                                        <input type="checkbox" name="checkbox" className="check-btn" value={interesse.nome} checked={isChecked} onChange={handleChangeInteresses} />
                                        <p className="inter-title" >{interesse.nome}</p>
                                    </label>
                                )
                            })

                        }
                    </div>
                </div>
                {preencha && <p className="preencha">{preencha}</p>}
                <button className="participar cad-part" onClick={handleSubmit}>Confirmar</button>

            </div>
        </>
    );

}
export default Bio;