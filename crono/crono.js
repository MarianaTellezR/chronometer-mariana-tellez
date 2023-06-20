import style from './style.js';
class Crono extends HTMLElement {
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = `<style>${style}</style>`;
        let slot = document.createElement('slot');
        this.botonIniciarPausar = document.createElement('wc-boton');
        this.botonReiniciar = document.createElement('wc-boton');
        let contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('content-botones');
        shadowRoot.appendChild(slot);
        contenedorBotones.appendChild(this.botonIniciarPausar);
        contenedorBotones.appendChild(this.botonReiniciar);
        shadowRoot.appendChild(contenedorBotones);
        this.contador=0;
        this.iniciarPausarClick = this.iniciarPausarClick.bind(this);
        this.reiniciarClick = this.reiniciarClick.bind(this);
    }
    connectedCallback() {
        this.botonIniciarPausar.titulo = 'Iniciar';
        this.botonReiniciar.titulo = 'Reiniciar';
        this.botonIniciarPausar.addEventListener('customClick', this.iniciarPausarClick);
        this.botonReiniciar.addEventListener('customClick', this.reiniciarClick);
    }
    iniciarPausarClick(event){
        if(event.detail.titulo === 'Iniciar'){
            this.intervalo = setInterval(()=>{
                this.contador++;
                this.dispatchEvent(new CustomEvent('actualizarTiempo',{
                    bubbles:true,
                    detail:{
                        contador:this.contador
                    }
                }));
            }, 10);
            this.botonIniciarPausar.titulo = 'Pausar';
        }else{
            clearInterval(this.intervalo);
            this.botonIniciarPausar.titulo = 'Iniciar';
        }
        event.stopPropagation();
    }
    reiniciarClick(event){
        this.contador=0;
        this.dispatchEvent(new CustomEvent('actualizarTiempo',{
            bubbles:true,
            detail:{
                contador:this.contador
            }
        }));
        event.stopPropagation();
    }

}
export default Crono;