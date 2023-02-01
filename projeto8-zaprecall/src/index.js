import ReactDOM from 'react-dom';
import React from "react";
import Meta from './components/Meta';
import EscolhaDeck from './components/EscolhaDeck';
import FlashBacks from './components/Flashbacks';
import './CSS/reset.css';
import './CSS/style.css';

function App() {
    const [tela, setTela] = React.useState(0);
    const [invalido, setInvalido] = React.useState(true);
    const [meta, setMeta] = React.useState(0);
    const [escolhido, setEscolhido] = React.useState();
    const [contador, setContador] = React.useState(0);
    const [ordem, setOrdem] = React.useState([]);
        
    const decks = [
        {
            'nome':'React',
            'perguntas':[{
                'pergunta':'O que é JSX?', 
                'resposta':'Uma extensão de linguagem do JavaScript'
            }, {
                'pergunta':'O React é __', 
                'resposta':'uma biblioteca JavaScript para construção de interfaces'
            }, {
                'pergunta':'Componentes devem iniciar com __', 
                'resposta':'letra maiúscula'
            }, {
                'pergunta':'Podemos colocar __ dentro do JSX', 
                'resposta':'expressões'
            }, {
                'pergunta':'O ReactDOM nos ajuda __', 
                'resposta':'interagindo com a DOM para colocar componentes React na mesma'
            }, {
                'pergunta':'Usamos o npm para __', 
                'resposta':'gerenciar os pacotes necessários e suas dependências'
            }, {
                'pergunta':'Usamos props para __', 
                'resposta':'passar diferentes informações para componentes'
            }, {
                'pergunta':'Usamos estado (state) para __', 
                'resposta':'dizer para o React quais informações quando atualizadas devem renderizar a tela novamente'
            }]
        }, {
            'nome':'React2',
            'perguntas':[{
                'pergunta':'O que é JSX?', 
                'resposta':'Uma extensão de linguagem do JavaScript'
            }, {
                'pergunta':'O React é __', 
                'resposta':'uma biblioteca JavaScript para construção de interfaces'
            }, {
                'pergunta':'Componentes devem iniciar com __', 
                'resposta':'letra maiúscula'
            }]
            
        }
    ];

    function comparador() { 
        return Math.random() - 0.5; 
    }

    function mudarOrdem(){
        let ordemAleatoria = [];
        for (let i = 0; i < decks[escolhido-1].perguntas.length; i++){
            ordemAleatoria.push(i);
        }
        
        ordemAleatoria.sort(comparador);
        setOrdem(ordemAleatoria)
    }

    if (tela === 0){
        const names = [];

        for (let i =0; i < decks.length; i++){
            names.push(decks[i].nome);
        }

        return (
            <>
                {invalido ? (
                    <EscolhaDeck 
                        button={<div className='botão desativado'>Iniciar Recall!</div>} 
                        decksNames={names} 
                        validar={(v) => setInvalido(v)} 
                        escolhido={(e) => setEscolhido(e)} 
                    />
                ) : (
                    <EscolhaDeck 
                        button={<div className='botão ativado' onClick={() => {setTela(tela+1); setInvalido(true); mudarOrdem();}}>Iniciar Recall!</div>} 
                        decksNames={names} 
                        validar={(v) => setInvalido(v)} 
                        escolhido={(e) => setEscolhido(e)} 
                    />
                )}
            </>
        );
    } else if (tela === 1){
        
        return (
            <>
                {invalido ? (
                    <Meta 
                        button={<div className='botão desativado'>Iniciar Recall!</div>} validar={(v) => setInvalido(v)}
                        setMeta={(e) => setMeta(e)}
                        max={decks[escolhido-1].perguntas.length}
                    />
                ) : (
                    <Meta 
                        button={<div className='botão ativado' onClick={() => {setTela(tela+1); setInvalido(true);}}>Iniciar Recall!</div>}  
                        validar={(e) => setInvalido(e)}
                        max={decks[escolhido-1].perguntas.length}
                    />
                )}
            </>
        );
    } else if (tela === 2) {
        return (
            <>
                <FlashBacks 
                    deckEscolhido={decks[escolhido-1].perguntas} 
                    ordem={ordem} contador={contador} 
                    incrementarContador={(e) => {setContador(e)}}
                    meta={meta}
                    mudarTela={setTela}
                />
            </>
        );
    }
   
}

ReactDOM.render(
    <App />, document.querySelector(".root")
);