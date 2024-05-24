//creamos varibles para llamar a todos los botones del HTML

let botonA = document.getElementById("botonA")
let botonB = document.getElementById("botonB")
let botonC = document.getElementById("botonC")
let botonD = document.getElementById("botonD")
let botonE = document.getElementById("botonE")
let botonF = document.getElementById("botonF")
let botonG = document.getElementById("botonG")
let botonH = document.getElementById("botonH")
let botonI = document.getElementById("botonI")

//crear un arreglo que contenga todas las variables para luego recorrer cada elemento
let array = [botonA, botonB, botonC, botonD, botonE, botonF, botonG, botonH, botonI]

/*crear una constante (no va a cambiar el valor) que contenga el emoji de cada jugador y una función
que reciba los parámetros turno y posición, donde a posición va ser igual al parámetro turno*/
const TURNOS = ["💻","🎶"]
function jugadorA(turno,pos) {
    pos.innerHTML = turno
}
//una función creada para el control del juego
/*el forEach va a recorrer cada elemento del array y le va agregar un evento CLICK, donde la condición es 
que si el elemento esta vació se debe colocar el emoji de computadora y si ya esta lleno mostrar una alerta*/
let tableroJuego = document.getElementById("tableroJuego")
function juego() {
    array.forEach(elemento => elemento.addEventListener("click", function () {
        if (elemento.innerHTML == "") {
            jugadorA(TURNOS[0], elemento) /* si el elemento esta vacío se debe insertar la constante con la posición [0] en el elemento*/
            if(!juegoGanador()){
                jugadorB()
            }
            if (juegoGanador()) {
                array.forEach(arre => arre.setAttribute("disabled", true)) /* hace que ya no se pueda jugar cuando hay un ganador*/
            }
        }       
        else {
            alert ("Casillero ocupado")
        }
     }))   
}

//voy a crear otra juegada2 con una función que reciba el parámetro turno 
/*se debe crear un array vacio para que la computadora ocupe esos lugares y no las posiciones del 
jugador A.
*/
function jugadorB() {
    let arrayVacio = array.filter(index => index.innerHTML == "")
    let aleatorio = Math.floor(Math.random() * arrayVacio.length);
    /*crear una condición (if) para que el jugador 2 (computadora) ocupe los lugares mayores a 0 (cuadros 
        no llenados). El arrayVacio va a entrar a los indices, en este caso [aleatorio] y se va a asignar 
        un valor con el emoticon*/
        if (arrayVacio.length > 0) {
           arrayVacio[aleatorio].innerHTML = TURNOS[1]
       }
}

juego()

/* crear una función que contenga las posiciones ganadoras*/
function juegoGanador() {
    let posicionesGanadoras = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
/* usamos la función for of la cual tiene una constante iterador para iterar en posicionesGanadoras. Las
posiciones ganadoras consta de tres posiciones. Luego con if hacemos la condición donde la posición 1 del
array (contiene todas las posiciones) tiene algo sigue con el if y si la posición 1 es igual a la posición 2, sigue
con el if y si la posición 1 es igual a la posición 3, retorna true y sino retorna false */
    for (const iterador of posicionesGanadoras) {
    [posicion1, posicion2, posicion3] = iterador
        if (array[posicion1].innerHTML && array[posicion1].innerHTML == array[posicion2].innerHTML && array[posicion1].innerHTML == array[posicion3].innerHTML) {
            alert ("Ganador")
            return true
        } 
    }
    return false
}