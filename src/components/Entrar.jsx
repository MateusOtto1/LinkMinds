import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";
import logo from "../imagens/glogo.svg";
import "../css/style.css";

const Entrar = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);
    async function handleLoginFromGoogle() {
        await signInGoogle();
    }

    if (!signed) {
        return (
            <>
                <div className="gradient">
                    <div id="wrapper-login">
                        <h1 className="logo-log">LINKME</h1>
                        <div className="container-text-log">
                            <div className="conecte">
                                <div className="line"></div>
                                <h1>
                                    CONECTE <br></br>
                                    SUA CONTA
                                </h1>
                            </div>
                            
                        </div>
                        <div className="btn-log">
                            <a id="logar" onClick={handleLoginFromGoogle}><div className="caixa-google"><img src={logo} alt="" /></div>Entrar</a>
                            <div className="caixa-cinza"></div>
                            <div className="caixa-preta"></div>
                            
                        </div>

                    </div>
                </div>

            </>
        );
    }
    else {
        return <Navigate to="/LinkMinds" />;
    }
}
export default Entrar;