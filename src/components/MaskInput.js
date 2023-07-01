import InputMask from "react-input-mask";

const MaskedInput = ({value,onChange}) => {
    return (
        <InputMask mask="99/99/9999" value={value} onChange={onChange} className="inputCriar" placeholder="__/__/____"/>
    );
}
export default MaskedInput;