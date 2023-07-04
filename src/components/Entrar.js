import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";

const Entrar = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);
    async function handleLoginFromGoogle() {
        await signInGoogle();
    }
    if (!signed) {
        return (
            <>
                <div className="Fundo">
                    <div className="tituloEntrar">
                        <h1><span className="spanTitulo">Link</span>Minds</h1>
                    </div>
                    <div className="textoInfo">
                        <h3>"Esse é um <span className="spanTexto">aplicativo</span> feito com o intuito de melhorar a <span className="spanTexto">vida social</span> de <span className="spanTexto">pessoas</span> de uma maneira mais <span className="spanTexto">eficiente</span>"</h3>
                    </div>
                    <div className="bordaEntrar">
                        <div className="fundoMenorEntrar">
                            <h3 className="textoEmail"><span className="spanTexto">Entre</span> através de sua conta do <span className="spanTexto">Google</span></h3>
                            <button className="Google" onClick={handleLoginFromGoogle}><span className="spanTexto">Logar</span> com Google</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return <Navigate to="/Home" />;
    }
}
export default Entrar;