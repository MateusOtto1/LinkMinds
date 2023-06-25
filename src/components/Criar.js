import { useNavigate } from "react-router-dom";
import casa from "../imagens/Casa.png";
import criarColorido from "../imagens/CriarColorido.png";
import pessoa from "../imagens/Pessoa.png";

const Criar = () =>{
    const navigate = useNavigate();
    function handleClickHome(){
        navigate('/Home');
    };
    function handleClickCreate(){
        navigate('/Criar');
    };
    function handleClickPerfil(){
        navigate('/Perfil');
    };
    return(
        <>
        <div className="Fundo">
            <div className="navbar">
                <img className="imgCasa" src={casa} onClick={handleClickHome}/>
                <img className="imgCriar" src={criarColorido} onClick={handleClickCreate}/>
                <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil}/>
            </div>
        </div>
    </>
    );
}
export default Criar;