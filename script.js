const container = document.getElementById('container'); 
let emoji = ['🍒','🥥','🍇','🍌','🍉','🍍'];

let gridSize;
let tamMatriz; 

let posicionX = 0;

const emojiRandom = () =>{
    const indexEmoji = Math.round(Math.random() * (emoji.length-1))
        return emoji[indexEmoji];
}

/*
---------- Hacer click en una celda ----------
*/

let nuevoClick = null;
let viejoClick = null;

let celdaClick = (e) => {
    nuevoClick = e.target;

    if(!viejoClick){
        nuevoClick.classList.add('celda-seleccionada');
        viejoClick = nuevoClick
    }else {
        
        if(viejoClick == nuevoClick){
            nuevoClick.classList.remove('celda-seleccionada');
            viejoClick = null;
            }else if (esAdyacente(viejoClick, nuevoClick)){
                if(intercambiarAdyacentes(viejoClick,nuevoClick));
                
            }else{
            nuevoClick.classList.add('celda-seleccionada');
            viejoClick.classList.remove('celda-seleccionada');
            viejoClick = nuevoClick;
            }
    }
} 

/*
---------- Verificar si son adyacentes ----------
*/
const esAdyacente = (celda1, celda2) =>{
    
    let celda1X = Number(celda1.dataset.x); 
    let celda1Y = Number(celda1.dataset.y);
    let celda2X = Number(celda2.dataset.x);
    let celda2Y = Number(celda2.dataset.y);

    if (celda1X === celda2X){
        if ((celda1Y === celda2Y +1) || (celda1Y === celda2Y-1)){
            return true;
        }
    } 

    if(celda1Y === celda2Y){
        if ((celda1X === celda2X +1) || (celda1X === celda2X-1)){
            return true;
        }
    }
    return false
}

/*
---------- Hacer match ----------
*/

const buscaMatch =  (eje) =>{

    for (let i = 0; i < tamMatriz; i++){
        const dataY = [] = document.querySelectorAll(`[data-${eje}="${i}"]`);
        for(let j = 0; j < dataY.length-2; j++){
            console.log(dataY[j]);

            if(dataY[j].dataset.icon === dataY[j+1].dataset.icon && 
                dataY[j].dataset.icon === dataY[j+2].dataset.icon){
                
                const eliminarIconos = dataY[j].dataset.icon;

                for ( let k = j; k < tamMatriz; k++){
                    if ( dataY [k].dataset.icon === eliminarIconos){
                        dataY[k].remove();
                    }else{
                        break;
                    }
                }
                    dataY[j].style.border="3px solid #fff"
                }
        }
    }
}        


/*
---------- Intercambiar celdas si son adyacentes ----------
*/

const intercambiarAdyacentes = (viejoClick, nuevoClick) =>{

	const auxLeft = nuevoClick.style.left;
	const auxTop = nuevoClick.style.top;
	const auxX = nuevoClick.dataset.x;
	const auxY = nuevoClick.dataset.y;

	nuevoClick.style.left = viejoClick.style.left;
	nuevoClick.style.top = viejoClick.style.top;
	nuevoClick.dataset.x = viejoClick.dataset.x;
	nuevoClick.dataset.y = viejoClick.dataset.y;

	viejoClick.style.left = auxLeft;
	viejoClick.style.top = auxTop;
	viejoClick.dataset.x = auxX;
	viejoClick.dataset.y = auxY;

    buscaMatch("x");    
    buscaMatch("y");
    rellena()

}



/*
---------- GRILLA ----------
*/

const generarMatriz = (gridSize, tamMatriz) =>{
    for (let i = 0; i < tamMatriz; i++){
        let posicionY = 0;

        for (let j = 0; j < tamMatriz; j++){
        const celda = document.createElement('div');
        celda.style.width = `${gridSize / tamMatriz}px`;
        celda.style.height = `${gridSize / tamMatriz}px`;
        celda.style.position = 'absolute';
        celda.style.left = `${posicionX}px`;
        celda.style.top = `${posicionY}px`;
        celda.style.padding = '8px';

        //celda.classList.add("celda");

        celda.dataset.x = i;
        celda.dataset.y = j;

        posicionY = posicionY + gridSize / tamMatriz;

        container.style.width = `${gridSize}px`;
        container.style.height = `${gridSize}px`;

        container.appendChild(celda);

        const emoji = emojiRandom();

        celda.dataset.icon = emoji;
        celda.innerHTML = emoji;

        celda.addEventListener('click', celdaClick);   
    }
    
    twemoji.parse(document.body);
    posicionX = posicionX + gridSize / tamMatriz;
}
container.style.position = 'relative';

buscaMatch("x");
buscaMatch("y");

}
generarMatriz();



/*
----------RELLENA----------
*/ 



const rellena = () => {

    let celdasRellenas = document.getElementsByClassName('celda');

    const emoji2 = emojiRandom();
    for(let i=0; i< celdasRellenas.length; i++) {
    
        if(celdasRellenas[i].innerText==="") {

            celdasRellenas[i].innerText=emoji2

        
        }
    }
};
rellena()




/*
----------DESCIENDE----------
// */

const desciende = () =>{
    for(let x = tamMatriz-1; x >=0; x--) {
        for(let y = tamMatriz-1; y >=1 ; y--) {
            const iconos = document.querySelector(`[dataset-y="${y}"][dataset-x="${x}"]`)
            if(iconos.innerText==="") {
                let celdaVacia=iconos
                for(let w = y; w > 0; w--){
                    const celdaSuperior = document.querySelector(`[data-y="${w-1}"][data-x="${x}"]`)
                    if(celdaSuperior.innerHTML !== ""){
                        intercambiarAdyacentes(celdaVacia, celdaSuperior)
                        break;
                    }
                }
            }        
        }
    }
}
desciende();




/*
---------- Modal de bienvenida ----------
*/

const modalBienvenida = () =>{
    swal({
        title: "¡Bienvenida!",
        text: "En matcheAdas tu objetivo es juntar tres o mas items del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.\n \n Si se forma un grupo, esos ítems se eliminaran y ganaras puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo!.\n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección.\n Flechas o W A S D: movimiento o intercambio.",
        button: {
            text: "A Jugar", 
            color: 'rgb(255, 82, 111)',
        },
    }).then(modalNiveles);
}

/*
---------- Modal de niveles de dificultad ----------
*/

const modalNiveles = () =>{
    swal({
        title: "Nuevo juego",
        text:"Selecciona una dificultad",
        buttons: {
            facil: {
                text: "Facil",
                value: "facil",
            },
            normal: {
                text: "Normal",
                value: "normal",
            },
            dificil: {
                text: "Dificil",
                value: "dificil",
            },
        },
    }).then((value) => {
        switch(value){
            case "facil":
                gridSize = 500;
                tamMatriz = 9; 
                generarMatriz(gridSize, tamMatriz);
                break;

            case "normal":
                gridSize = 500;
                tamMatriz = 8; 
                generarMatriz(gridSize, tamMatriz);
                break;

            case "dificil":
                gridSize = 500;
                tamMatriz = 7;
                generarMatriz(gridSize, tamMatriz);
                break;
        }
    })
}
modalBienvenida();


/*
---------- Boton informacion ----------
*/

const btnInfo = document.getElementById('btn-info');

const info = () => {
    swal({
        title: "¡Bienvenida!",
        text: "En matcheAdas tu objetivo es juntar tres o mas items del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.\n \n Si se forma un grupo, esos ítems se eliminaran y ganaras puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo!.\n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección.\n Flechas o W A S D: movimiento o intercambio.",
        button: {
            text: "A Jugar",
        }
    })
}
btnInfo.addEventListener('click', info)


/*
---------- Juego nuevo ----------
*/

const btnRefresh = document.getElementById('btn-refresh');
const reiniciar = ()=>{ 
    swal({
            title: "¿Reiniciar Juego?",
            text: "¡Perderás el puntaje acumulado!", 
            buttons: {
                aceptar: {
                    text:'Nuevo Juego',
                    value:'aceptar',
                },
                cancelar: {
                    text:'Cancelar',
                },
            }
        }).then((value) => {
            if (value === 'aceptar') {
                modalNiveles();
            } 
        });
}
btnRefresh.addEventListener('click', reiniciar)



/*
---------- TIEMPO ----------
*/


const modalJuegoTerminado = ()=>{ 
    swal({
        title: "¡Juego terminado!",
        text: "Puntaje final:",
    buttons: {
            aceptar: {
                text:'Reiniciar',
            },
            cancelar: {
                text:'Cancelar',
            },
        }
    });
}


const tiempoDelJuego = 0.25;
let seg = 30;

const mostrarSegundos = () => {
    if (seg >= 0){
        console.log(seg--);
    }else {
        clearInterval(id);
        modalJuegoTerminado();
        }
}
let id = setInterval(mostrarSegundos, 1000);