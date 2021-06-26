const container = document.getElementById('container'); 


const filas = 10;
const columnas = 10;
const tamCelda = 56

let posicionX = 0;


for (let i = 0; i < filas; i++){
    let posicionY = 0;

    for (let j = 0; j < columnas; j++){
        const celda = document.createElement('div');
        
        celda.style.width = '${tamCelda}px';
        celda.style.height = '${tamCelda}px';

        celda.style.position = 'absolute';
        celda.style.left = '${posicionX}px';
        celda.style.top = '${posicionY}px';
        celda.style.border = '1px solid #000';

        posicionY = posicion + tamCelda;

        container.appendChild(celda);

    }
    posicionX = posicionX + tamCelda;
}
document.body.style.position = 'relative';
