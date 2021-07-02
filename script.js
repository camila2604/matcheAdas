const container = document.getElementById('container'); 
let emoji = ['🍒','🍑','🍇','🍌','🍉','🍍'];

const tamCelda =  56
const tamMatriz = 9; 

let posicionX = 0;

const emojiRandom = () =>{
    const indexEmoji = Math.round(Math.random() * (emoji.length-1))
        return emoji[indexEmoji];
}
console.log(emojiRandom());

let celdaClick = (e) => {
    e.target.style.border = '1px solid #999';
} 

const generarMatriz = () =>{
    for (let i = 0; i < tamMatriz; i++){
        let posicionY = 0;

        for (let j = 0; j < tamMatriz; j++){
        const celda = document.createElement('div');
        celda.style.width = `${tamCelda}px`;
        celda.style.height = `${tamCelda}px`;
        celda.style.position = 'absolute';
        celda.style.left = `${posicionX}px`;
        celda.style.top = `${posicionY}px`;
        //celda.style.border = '1px solid #000';
        celda.style.padding = '8px';

        celda.dataset.x = j;
        celda.dataset.y = i;

        posicionY = posicionY + tamCelda;

        container.appendChild(celda);
    
        celda.innerHTML = emojiRandom()
        celda.addEventListener('click',celdaClick)

    }
    
    twemoji.parse(document.body)
    posicionX = posicionX + tamCelda;
}
container.style.position = 'relative';
}
generarMatriz();

/**
 * 
 * 
 **/



/**
 * 
 * 
 * 
 **/




const popUpBienvenida = () =>{
    swal({
        title: "¡Bienvenida!",
        text: "En matcheAdas tu objetivo es juntar tres o mas items del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.\n \n Si se forma un grupo, esos ítems se eliminaran y ganaras puntos. ¡Sigue armando grupos de tres o más antes de que se acabe el tiempo!.\n \n Controles \n Click izquierdo: selección. \n Enter o espacio: selección.\n Flechas o W A S D: movimiento o intercambio.",
        button: {
            text: "A Jugar", 
        },
    }).then(popUpNiveles);
}

const popUpNiveles = () =>{
    swal({
        title: "Nuevo juego",
        text: "Selecciona una dificultad.\n",
        button: {
            text: "Fácil", 
    },
    });
}

popUpBienvenida();

//   swal("Are you sure you want to do this?", {
    
    //buttons: ["Oh noez!", "Aww yiss!","algo"],
// });





// const mensajeBienvenida = ()=>{
//     alert = ("")
// }
