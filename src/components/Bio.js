import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style-editar.css";
import lapis from "../imagens/editar.svg";

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
            <div className="main-editar">

                <img src={usuarios.foto} alt="" className="pfp-editar" />

                <div className="inputs-editar">

                    <div className="editar-input">
                        <label >Apelido <img src={lapis} alt="" /></label>
                        <input type="text" name="nome" className="input-style" placeholder="Seu Apelido" onChange={(e) => setApelido(e.target.value)} />
                    </div>

                    <div className="editar-input">
                        <label >Idade <img src={lapis} alt="" /></label>
                        <input type="number" name="idade" className="input-style" placeholder="Sua Idade" onChange={(e) => setIdade(e.target.value)} />
                    </div>

                    <div className="editar-input">
                        <label >Interesses <img src={lapis} alt="" /></label>
                        <input type="text" name="idade" className="input-style" placeholder="Seus Interesses" onChange={(e) => setInteresses(e.target.value)} />
                    </div>

                    <div className="editar-input">
                        <label>Bio <img src={lapis} alt="" /></label>
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