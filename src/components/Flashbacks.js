import logopequeno from '../img/logo-pequeno.png';
import PerguntaVirada from './PerguntasViradas';
import React from "react";
import Pergunta from './Pergunta';
import RespostasViradas from './RespostasViradas.js';
import MostrarResultados from './MostrarResultado';
import sad from '../img/sad.png';
import party from '../img/party.png';

export default function FlashBacks(props){
    const [ordem, deckEscolhido, contador, incrementarContador, meta, mudarTela] = [props.ordem, props.deckEscolhido, props.contador, props.incrementarContador, props.meta, props.mudarTela];
    const [resultados, setResultados] = React.useState([]);
    let arr1 = [];
    let [v, v1, v2] = [false, false, false];
    let c = 0;

    for (let i=0; i < ordem.length; i++){
        arr1.push(false);  
    }

    const [virado, setVirado] = React.useState(arr1);
    const [resposta, setResposta] = React.useState(arr1);
    const [respondeu, setRespondeu] = React.useState(arr1);

    const virar = (e) => {
        let arr = [...virado];
        arr[parseInt(e)] = !arr[parseInt(e)];
        setVirado(arr);
    }

    const respostas = (e) => {
        let arr = [...resposta];
        arr[parseInt(e)] = !arr[parseInt(e)];
        setResposta(arr);
    }

    const respondidas = (e) => {
        let arr2 = [];
        for (let i=0; i < ordem.length; i++){{
            if (i === parseInt(e)){
                arr2.push(true)
            } else {
                arr2.push(false);  
            }
        }}
        setRespondeu(arr2);
    }

    return (
        <>
            <div className='flashbacks'>
                <div className='topo'>
                    <img src={logopequeno} />
                    <h1>ZapRecall</h1>
                </div>

                <div className='perguntas'>

                    {/* Para cada pergunta dentro do deck escolhido eu faço:  */}
                    {Object.keys(deckEscolhido).map((item) => {

                        /* Primeiro caso a pergunta tiver sido respondida eu coloca a pergunta de acordo com a resposta dada */
                        if (respondeu[item] === 2){
                            return (
                                <PerguntaVirada 
                                    numero={parseInt(item)+1} 
                                    virar={virar} 
                                    item={item}
                                    icone='close-circle'
                                    classe='pergunta errado'
                                />
                            );
                        } else if (respondeu[item] === 3){
                            return (
                                <PerguntaVirada 
                                    numero={parseInt(item)+1} 
                                    virar={virar} 
                                    item={item}
                                    icone='help-circle'
                                    classe='pergunta meiocerto'
                                />
                            );
                        }  else if (respondeu[item] === 4){
                            return (
                                <PerguntaVirada 
                                    numero={parseInt(item)+1} 
                                    virar={virar} 
                                    item={item}
                                    icone='checkmark-circle'
                                    classe='pergunta certo'
                                />
                            );
                        } 

                        /* Caso contrario eu verifico se a pergunta esta virada ou não */
                        if (virado[item]){
                            if (!resposta[item]){
                                return (
                                    <Pergunta 
                                        pergunta={deckEscolhido[ordem[item]].pergunta} 
                                        virar={respostas} 
                                        item={item}
                                        voltar={virar}
                                    />
                                );
                            } 
                            
                            if (!respondeu[item]){
                                return (
                                    <RespostasViradas 
                                        resposta={deckEscolhido[ordem[item]].resposta} 
                                        incrementarContador={incrementarContador} 
                                        contador={contador}
                                        virar={respondidas}
                                        item={item}
                                        respondeu={respondeu}
                                        setRespondeu={setRespondeu}
                                        resultados={resultados}
                                        setResultados={setResultados}
                                        voltar1={virar}
                                        voltar2={respostas}
                                    />
                                );
                            }
                        } else {
                            return (
                                <PerguntaVirada 
                                    numero={parseInt(item)+1} 
                                    virar={virar} 
                                    item={item}
                                    icone='play-outline'
                                    classe='pergunta'
                                />
                            );
                        }
                    })}
                </div>
                
                <div className='bottom'>
                    {resultados.map((item) => {
                        if (item === 2){
                            c++;
                            if (c === meta){
                                v = true;
                            }
                        }
                        
                        if (c === meta){
                            v = true;
                        }

                        if (v1 === false){
                            if (contador === deckEscolhido.length && v === true){
                                v1 = true;
                                
                                return (
                                    <>
                                        <div className='titulo'>
                                            <img src={sad} /> 
                                            <h1>Putz...</h1>
                                            
                                        </div>
                                        <p>Ainda faltam alguns... Mas não desanime!</p>
                                    </>
                                );
                            } else if (contador === deckEscolhido.length){
                                v1 = true;
                                
                                return (
                                    <>
                                        <div className='titulo'>
                                            <img src={party} /> 
                                            <h1>Parabéns!</h1>
                                            
                                        </div>
                                        <p>Você não esqueceu de nenhum flashcard!</p>
                                    </>
                                    
                                );
                            }
                        }
                        
                    })}
                    
                    {contador}/{deckEscolhido.length} CONCLUÍDOS

                    <div className='resultados'>
                        {resultados.map((item) => {
                            if (item === 2){
                                return(
                                    <MostrarResultados 
                                        classe='errado'
                                        icone='close-circle'
                                    />
                                );
                            } else if (item === 3){
                                return (
                                    <MostrarResultados 
                                        classe='meiocerto'
                                        icone='help-circle'
                                    />
                                );
                            } else if (item === 4){
                                return(
                                    <MostrarResultados 
                                        classe='certo'
                                        icone='checkmark-circle'
                                    />
                                );
                            }
                        })}
                    </div>

                    {resultados.map(() => {
                        if (contador === deckEscolhido.length && v2 === false){
                            v2 = true;
                            
                            return (
                                <div className='reiniciar' onClick={() => {mudarTela(0); incrementarContador(0)}}>
                                    REINICIAR RECALL
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}