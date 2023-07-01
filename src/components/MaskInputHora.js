import InputMaskHora from 'react-input-mask';

const MaskedInputHora = ({value,onChange}) => {
    return (
        <InputMaskHora mask="99:99" value={value} onChange={onChange} className="inputCriar" placeholder="__:__"/>
    );
}
export default MaskedInputHora;