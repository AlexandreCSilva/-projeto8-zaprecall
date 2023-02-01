export default function PerguntaVirada(props){
    const [numero, virar, item, classe, icone] = [props.numero, props.virar, props.item, props.classe, props.icone];

    return (
        <div className={classe} onClick={() => {virar(item)}}>
            <p>Pergunta {numero}</p>
            <ion-icon name={icone}></ion-icon>
        </div>
    );
}