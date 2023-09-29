import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style-editar.css";
import Cookies from 'js-cookie';

const Bio = () => {
    const [apelido, setApelido] = useState('');
    const [idade, setIdade] = useState('');
    const [interesses, setInteresses] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preencha, setPreencha] = useState('');
    const [usuarios, setUsuarios] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUsuario = async () => {
            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:3001/usuarioInfo', { token });
            setUsuarios(response.data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (apelido == '' || idade == '' || interesses == '' || descricao == '') {
            setPreencha('Preencha todos os campos');
        } else {
            const token = Cookies.get('token');
            await axios.put('http://localhost:3001/usuario', { token, apelido, idade, interesses, descricao }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    }

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
                        <label >Interesses </label>
                        <input type="text" name="idade" className="input-style" placeholder="Seus Interesses" onChange={(e) => setInteresses(e.target.value)} />
                    </div>

                    <div className="editar-input">
                        <label>Bio </label>
                        <textarea name="bio" id="" cols="30" rows="5" className="input-style" onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <p className="preencha">{preencha}</p>
                    <button className="editar-btn-confirmar" onClick={handleSubmit}>Confirmar</button>

                </div>

            </div>
        </>
    );

}
export default Bio;