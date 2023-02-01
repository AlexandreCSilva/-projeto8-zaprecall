import setinha from '../img/setinha.png';

export default function Pergunta(props){
    const [pergunta, virar, item, voltar] = [props.pergunta, props.virar, props.item, props.voltar];

    return(
        <div className='perguntaVisivel' onClick={() => {voltar(item)}}>
            <p>{pergunta}</p>
            <img src={setinha} onClick={(event) => {event.stopPropagation(); virar(item)}} />
        </div>
    );
} 