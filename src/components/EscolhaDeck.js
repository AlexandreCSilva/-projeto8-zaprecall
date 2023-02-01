import logo from '../img/logo.png';

export default function EscolhaDeck(props){
    const [validar, escolhido, deck, button] = [props.validar, props.escolhido, props.decksNames, props.button];

    const deckValido = (e) => {
        validar(false);
        escolhido(e.target.value);
    };

    return (
        <>
            <div className='decks'>
                <img src={logo} />
                <h1>ZapRecall</h1>
                <select onChange={deckValido}>
                    <option value='' disabled selected hidden>Escolha seu deck</option>
                    {deck.map((nome, item) => {
                        return (
                            <Opcoes 
                                value={item+1} 
                                name={nome}
                            />);
                    })}
                </select>
                {button}
            </div>
        </>
    );
}

function Opcoes(props){
    const [value, name] = [props.value, props.name];

    return (
        <option value={value}>{name}</option>
    );
}