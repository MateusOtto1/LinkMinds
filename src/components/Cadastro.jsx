import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style-editar.css";
import Cookies from 'js-cookie';

const Cadastro = () => {
    const [apelido, setApelido] = useState('');
    const [idade, setIdade] = useState('');
    const [interesses, setInteresses] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [preencha, setPreencha] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const [listaInteresse, setListaInteresse] = useState([]);
    const [pesquisaInteresse, setPesquisaInteresse] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
            const response2 = await axios.get('http://localhost:3001/listaInteresse');
            setListaInteresse(response2.data);
            if(pesquisaInteresse == ''){
                setPesquisa(response2.data);
            }
        };
        getUsuario();
    }, []);

    useEffect(() => {
        const checkInput = async () => {
            if (apelido == '' || idade == '' || interesses == '' || descricao == '') {
                setPreencha('Preencha todos os campos');
            } else {
                setPreencha('');
            }
        };
        checkInput();
    }, [apelido, idade, interesses, descricao]);

    const handleChangeInteresses = (e) => {
        const valorCheckbox = e.target.value;
        const indice = interesses.indexOf(valorCheckbox);
        if (e.target.checked) {
            setInteresses([...interesses, valorCheckbox]);
        } else {
            setInteresses(interesses.filter((item) => item !== valorCheckbox));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (apelido == '' || idade == '' || interesses.length == 0 || descricao == '') {
            setPreencha('Preencha todos os campos');
        } else {
            const token = Cookies.get('token');
            await axios.put('http://localhost:3001/usuario', { token, apelido, idade, interesses, descricao }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    };

    useEffect(() => {
        const pesquisaInput = async () => {
            const interessesPesquisa = listaInteresse.filter((interesse) => interesse.nome.toLowerCase().includes(pesquisaInteresse.toLowerCase()));
            setPesquisa(interessesPesquisa);
        };
        pesquisaInput();
    }, [pesquisaInteresse]);

    return (
        <>
            <div className="main-cadastro">

                <h1 className="header-cadastro">Cadastro</h1>

                <img src={usuarios.foto} alt="" className="pfp-editar" />

                <div className="inputs-editar">

                    <div className="editar-input">
                        <label >Apelido </label>
                        <input type="text" name="nome" className="input-style" placeholder="Seu Apelido" onChange={(e) => setApelido(e.target.value)} />
                    </div>

                    <div className="editar-input">
                        <label >Idade </label>
                        <input type="number" name="idade" className="input-style" placeholder="Sua Idade" onChange={(e) => setIdade(e.target.value)} />
                    </div>
                    <div className="editar-input">
                        <label>Bio </label>
                        <textarea name="bio" id="" cols="30" rows="5" className="input-style" onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <div className="editar-input">
                        <label >Interesses </label>
                        <input type="text" placeholder="Procurar Interesse..." className="pesquisar" value={pesquisaInteresse} onChange={(e) => setPesquisaInteresse(e.target.value)} />
                        {
                           pesquisa.map((interesse, index) => {
                                return(
                                    <div key={index}>
                                        <h1>{interesse.nome}</h1>
                                        <input type="checkbox" name="checkbox" value={interesse.nome} onChange={handleChangeInteresses}/>
                                    </div>
                                )
                           })
                        }
                    </div>

                    <p className="preencha">{preencha}</p>
                    <button className="editar-btn-confirmar" onClick={handleSubmit}>Confirmar</button>

                </div>

            </div>
        </>
    );

}
export default Cadastro;