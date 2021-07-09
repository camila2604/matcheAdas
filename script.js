const container = document.getElementById('container'); 
let emoji = ['🍒','🍑','🍇','🍌','🍉','🍍'];

let gridSize = 600;
let tamMatriz = 9; 

let posicionX = 0;

const emojiRandom = () =>{
    const indexEmoji = Math.round(Math.random() * (emoji.length-1))
        return emoji[indexEmoji];
}
console.log(emojiRandom());


/*
---------- CLICK ----------
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
        }//else if (){ 
            //hay que hacer una resta para saber las posiciones 
        //}
            // NO ME FUNCIONO JA
            // else if(viejoClick !== nuevoClick){
            // nuevoClick.classList.add('celda-seleccionada');
            // viejoClick = null;
            // }
    }
    
    
} 
//x1 = 1 x2=1 xresultante = x1-x2 = 0
//y1= 0 y2 = 1 y resultante = y1-y2 = -1


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

        celda.dataset.x = j;
        celda.dataset.y = i;

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


//es para leer la matriz, si haces un cambio lo hizo Belen
// const matrizFinder = () => {
//     let matriz;
//     matriz = new Array(matrizSize);
//     for(let i = 0; i < matrizSize; i++) {
//         matriz[i] = new Array(matrizSize)
//     };
//     for(let i = 0; i < matrizSize; i++) {
//         for(let j = 0; j < matrizSize; j++) {
//             matriz[i][j] = document.querySelector(`[data-x="${j}"][data-y="${i}"]`).innerText;
//         }
//     }
//     console.log("+++matriz+++", matriz)
//     return matriz;
// }
//Lo hizo el profe
// const initialRander = () =>{
//     createGrid();
// };
// window.onload = () =>{
//     initialRander();
//     showWelcomeModal();
// }
// const fx = async () =>{
//     for (let y = 0; y < 10; y++){
//         for(let x = 0; x < 10; x++){
//             await DelayNode(500);
//                 console.log(document.querySelectorAll(`[data-x-"${x}"][data-y-"${y}"]`));
//         }
//     }
// }






/*
---------- BIENVENIDA ----------
*/

const popUpBienvenida = () =>{
    swal({
        title: "¡Bienvenida!",
        text: "En matcheAdas tu objetivo es juntar tres o mas items del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.\n \n Si se forma un grupo, esos ítems se eliminaran y ganaras puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo!.\n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección.\n Flechas o W A S D: movimiento o intercambio.",
        button: {
            text: "A Jugar", 
        },
    }).then(popUpNiveles);
}

/*
---------- RELOJ ----------
*/

const alertJuegoTerminado = ()=>{ 
    swal({
        title: "¡Juego terminado!",
        text: "Puntaje final:\n",
    buttons: ["Nuevo juego", "Reiniciar"],
    });
}
const tiempoDeJuego = 0.25;
let seg = 30; 

const mostrarSegundos = () => {
    console.log("comienzo")
    if (seg >= 0){
        console.log(seg--);
        
    }else {
        clearInterval(id);
        alertJuegoTerminado();
    }
}
const id = setInterval(mostrarSegundos, 1000);


/*
---------- NIVELES ----------
*/

const popUpNiveles = () =>{

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
    

popUpBienvenida();
