export default function MostrarResultados(props){
    const [classe, icone] = [props.classe, props.icone];

    return (
        <div className={classe}>
            <ion-icon name={icone}></ion-icon>
        </div>
    );
}

