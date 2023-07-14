import { useNavigate, useContext } from 'react-router-dom';
import casaColorida from "../imagens/CasaColorida.png";
import criar from "../imagens/Criar.png";
import pessoa from "../imagens/Pessoa.png";
import lupa from "../imagens/lupa.png";
import { AuthGoogleContext } from "../contexts/authGoogle";

const Descricao = (props) => {

    const navigate = useNavigate();
    function handleClickHome() {
        navigate('/Home');
    };
    function handleClickCreate() {
        navigate('/Criar');
    };
    function handleClickPerfil() {
        navigate('/Perfil');
    };
    function handleClickPesquisa() {
        navigate('/Usuarios');
    }

    return (
        <>
            <div className="Fundo">
                <h2 className="TextoInfoDescricao"><span className="spanTextoDesc">Informações</span> sobre o evento</h2>
                <div className="bordaDescricao">
                    <div className="fundoMenorDescricao">
                        <h1 className="descricao">Descrição</h1>
                        <h2 className="nomeJogoDescricao">{props.postSelecionado.evento}</h2>
                        <div className="descricoes">
                            <h3 className="dataJogoDescricao"><span className="spanTexto">Data:</span> {props.postSelecionado.data}</h3>
                            <h3 className="horaJogoDescricao"><span className="spanTexto">Hora:</span> {props.postSelecionado.hora}</h3>
                            <h3 className="dataJogoDescricao"><span className="spanTexto">Local:</span> {props.postSelecionado.local}</h3>
                            <h3 className="criadorJogoDescricao"><span className="spanTexto">Criado por:</span> {props.postSelecionado.nome}</h3>
                            <h3 className="marcadosDescricao"><span className="spanTexto">4</span>  Pessoas já marcaram presença neste evento</h3>
                        </div>
                    </div>
                </div>
                <button className="MarcarPresenca">Marcar Presença</button>
                <div className="navbar">
                    <img className="imgCasa" src={casaColorida} onClick={handleClickHome} />
                    <img className="imgCriar" src={criar} onClick={handleClickCreate} />
                    <img className="imgLupa" src={lupa} onClick={handleClickPesquisa} />
                    <img className="imgPessoa" src={pessoa} onClick={handleClickPerfil} />
                </div>
            </div>
        </>
    );
}
export default Descricao;