import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style-editar.css";

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
            const email = localStorage.getItem('email');
            const response = await axios.post('https://server-linkme.onrender.com/usuarioInfo', { email });
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
            const email = localStorage.getItem('email');
            await axios.put('https://server-linkme.onrender.com/usuario', { email, apelido, idade, interesses, descricao }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/');
        }
    }

    return (
        <>
            <div class="main-cadastro">

                <h1 className="header-cadastro">Cadastro</h1>

                <img src={usuarios.foto} alt="" class="pfp-editar" />

                <div class="inputs-editar">

                    <div class="editar-input">
                        <label for="nome">Apelido </label>
                        <input type="text" name="nome" class="input-style" placeholder="Seu Apelido" onChange={(e) => setApelido(e.target.value)} />
                    </div>

                    <div class="editar-input">
                        <label for="idade">Idade </label>
                        <input type="number" name="idade" class="input-style" placeholder="Sua Idade" onChange={(e) => setIdade(e.target.value)} />
                    </div>

                    <div class="editar-input">
                        <label for="idade">Interesses </label>
                        <input type="text" name="idade" class="input-style" placeholder="Seus Interesses" onChange={(e) => setInteresses(e.target.value)} />
                    </div>

                    <div class="editar-input">
                        <label>Bio </label>
                        <textarea name="bio" id="" cols="30" rows="5" class="input-style" onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <p className="preencha">{preencha}</p>
                    <button class="editar-btn-confirmar" onClick={handleSubmit}>Confirmar</button>

                </div>

            </div>
        </>
    );

}
export default Bio;