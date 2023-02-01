import logo from '../img/logo.png';

export default function Meta(props){
    const [validar, button, setMeta, max] = [props.validar, props.button, props.setMeta, props.max];

    const metaValida = (e) => {
        if ((isNaN(e.target.value) === false) && (parseInt(e.target.value) >= 1) && (e.target.value !== '') && (parseInt(e.target.value) <= max)){
            validar(false);
            setMeta(parseInt(e.target.value));
        } else {
            validar(true);
        }
    };

    return (
        <>
            <div className='meta'>
                <img src={logo} />
                <h1>ZapRecall</h1>
                <input placeholder='Digite sua meta de zaps...' onChange={metaValida}></input>
                {button}
            </div>
        </>
    );
}