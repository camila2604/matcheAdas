const container = document.getElementById('container'); 
let emoji = ['🍒','🍑','🍇','🍌','🍉','🍍'];

let gridSize = 600;
let tamMatriz = 9; 

let posicionX = 0;

const emojiRandom = () =>{
    const indexEmoji = Math.round(Math.random() * (emoji.length-1))
        return emoji[indexEmoji];
}


/*
---------- CLICK ----------
*/
let nuevoClick = null;
let viejoClick = null;

let celdaClick = (e) => {
    nuevoClick = e.target;
    //console.log(e.target.dataset);

    if(!viejoClick){
        nuevoClick.classList.add('celda-seleccionada');
        viejoClick = nuevoClick
    }else {
        
        if(viejoClick == nuevoClick){
            nuevoClick.classList.remove('celda-seleccionada');
            viejoClick = null;
            }else if (esAdyacente(viejoClick, nuevoClick)){
                console.log("son adyacentes");
            }else{
            nuevoClick.classList.add('celda-seleccionada');
            viejoClick.classList.remove('celda-seleccionada');
            viejoClick = nuevoClick;
            }
    }
} 

//Adyacente

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
//MATCH






/*
---------- GRILLA ----------
*/


const generarMatriz = () =>{
    for (let i = 0; i < tamMatriz; i++){
        let posicionY = 0;

        for (let j = 0; j < tamMatriz; j++){
        const celda = document.createElement('div');
        celda.style.width = `${gridSize / tamMatriz}px`;
        celda.style.height = `${gridSize / tamMatriz}px`;
        celda.style.position = 'absolute';
        celda.style.left = `${posicionX}px`;
        celda.style.top = `${posicionY}px`;
        //celda.style.border = '1px solid #000';
        celda.style.padding = '8px';

        celda.dataset.x = i;
        celda.dataset.y = j;

        posicionY = posicionY + gridSize / tamMatriz;

        container.style.width = `${gridSize}px`;
        container.style.height = `${gridSize}px`;

        container.appendChild(celda);
    
        celda.innerHTML = emojiRandom();

        celda.addEventListener('click', celdaClick);
        
    }
    
    //twemoji.parse(document.body);
    posicionX = posicionX + gridSize / tamMatriz;
}
container.style.position = 'relative';
}
generarMatriz();





/*
---------- BIENVENIDA ----------
*/

const modalBienvenida = () =>{
    swal({
        title: "¡Bienvenida!",
        text: "En matcheAdas tu objetivo es juntar tres o mas items del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.\n \n Si se forma un grupo, esos ítems se eliminaran y ganaras puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo!.\n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección.\n Flechas o W A S D: movimiento o intercambio.",
        button: {
            text: "A Jugar", 
        },
    }).then(modalNiveles);
}

/*
---------- RELOJ ----------
*/

// const modalJuegoTerminado = ()=>{ 
//     swal({
//         title: "¡Juego terminado!",
//         text: "Puntaje final:\n",
//     buttons: ["Nuevo juego", "Reiniciar"],
//     });
// }
// const tiempoDeJuego = 0.25;
// let seg = 30; 

// const mostrarSegundos = () => {
//     console.log("comienzo")
//     if (seg >= 0){
//         console.log(seg--);
        
//     }else {
//         clearInterval(id);
//         modalJuegoTerminado();
//     }
// }
// const id = setInterval(mostrarSegundos, 1000);


/*
---------- NIVELES ----------
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
                let tamCelda =  56;
                let tamMatriz = 9; 
                generarMatriz();
                break;
//             case "normal":
//                  const tamCelda =  63;
//                  const tamMatriz = 8; 
//                  generarMatriz();
//                  break;
//                    case "dificl":
// //                 const tamCelda =  72;
// //                 const tamMatriz = 7; 
// //                 generarMatriz();
// //                 break;
    }
})
}
    //     title:"Nuevo juego", 
    //     text:"Selecciona una dificultad.",
    //     buttons: {
    //     cancel: "Facil",
    //     catch: {
    //     text: "Normal",
    // },
    //     defeat: "Difícil",
    // },
    

modalBienvenida();
