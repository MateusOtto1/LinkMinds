import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criarColorido from "../imagens/CriarColorido.png";
import pessoa from "../imagens/Pessoa.png";
import { useState, useContext, useEffect } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";
import axios from "axios";

const Criar = () => {
    const navigate = useNavigate();
    const [evento, setEvento] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const {email} = useContext(AuthGoogleContext);
    const [preencha, setPreencha] = useState('');

    useEffect(() => {
        const checkInput = async () => {
            if(evento=='' || data=='' || hora=='' || local==''){
                setPreencha('Preencha todos os campos');
            }else{
                setPreencha('');
            }
        };
        checkInput();
    } , [evento, data, hora, local]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(evento=='' || data=='' || hora=='' || local==''){
            setPreencha('Preencha todos os campos');
        }else{
            axios.post('http://localhost:3001/posts', {email, evento, data, hora, local}).then(result => console.log(result)).catch(err => console.log(err));
            navigate('/Home');
        }   
    }

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
            <h1 className="homeNome"><span className="spanTexto">Criar</span>post</h1>
                <div className="bordaBio"> 
                    <div className="fundoMenorBio">
                        <form>
                            <input type="text" placeholder="Nome do Esporte/Jogo" className="inputCriar" onChange={(e) => setEvento(e.target.value)}/>
                            <input type="text" placeholder="00/00/0000" className="inputCriar" onChange={(e) => setData(e.target.value)}/>
                            <input type="text" placeholder="00:00" className="inputCriar" onChange={(e) => setHora(e.target.value)}/>
                            <input type="text" placeholder="Local" className="inputCriar" onChange={(e) => setLocal(e.target.value)}/>
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