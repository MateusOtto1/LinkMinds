import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bio = () => {
    const [apelido, setApelido] = useState('');
    const [idade, setIdade] = useState('');
    const [interesses, setInteresses] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preencha, setPreencha] = useState('');
    const navigate = useNavigate();

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
            await axios.put('http://localhost:3001/usuario', { email, apelido, idade, interesses, descricao }).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/Home');
        }
    }

    return (
        <>
            <div className="Fundo">
                <h1 className="tituloEntrar"><span className="spanTitulo">Sobre</span> você!</h1>
                <div className="bordaBio">
                    <div className="fundoMenorBio">
                        <h1 className="Bio">Bio</h1>
                        <form>
                            <input type="text" placeholder="Apelido" className="inputBio" onChange={(e) => setApelido(e.target.value)} />
                            <input type="number" placeholder="Idade" className="inputBio" onChange={(e) => setIdade(e.target.value)} />
                            <input type="text" placeholder="Interesses" className="inputBio" onChange={(e) => setInteresses(e.target.value)} />
                            <input type="text" placeholder="Sobre Você" className="inputBio" onChange={(e) => setDescricao(e.target.value)} />
                            <p className="preencha">{preencha}</p>
                            <button className="salvarBio" onClick={handleSubmit} >Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Bio;