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

//Variables de contadores
let contJugadorA = document.getElementById("contJugadorA")
let contJugadorB = document.getElementById("contJugadorB")
let btnReiniciar = document.getElementById("btnReiniciar")

// Inicializar los contadores si están vacíos
contJugadorA.innerHTML = parseInt(contJugadorA.innerHTML) || 0;
contJugadorB.innerHTML = parseInt(contJugadorB.innerHTML) || 0;

//crear una variable que cuente los turnos, el cual debe iniciar en 0
let contadorTurnos = 0;

/*crear una constante (no va a cambiar el valor) que contenga el emoji de cada jugador y una función
que reciba los parámetros turno y posición, donde a posición va ser igual al parámetro turno*/
const TURNOS = ["🧙‍♂️","🪄"]

function jugadorA(turno,pos) {
    pos.innerHTML = turno;
    contadorTurnos++; /* ++ incremento*/
}

//una función creada para el control del juego
/*el forEach va a recorrer cada elemento del array y le va agregar un evento CLICK, donde la condición es 
que si el elemento esta vació se debe colocar el emoji de computadora y si ya esta lleno mostrar una alerta*/

function juego() {
    array.forEach(elemento => elemento.addEventListener("click", function () {
        if (elemento.innerHTML == "") {
            jugadorA(TURNOS[0], elemento) /* si el elemento esta vacío se debe insertar la constante con la posición [0] en el elemento*/
            if (juegoGanador()) {
                array.forEach(arre => arre.setAttribute("disabled", true)) /* deshabilita el juego cuando hay un ganador*/
            } else if (contadorTurnos == 9) { /*si en los 9 movimientos no hubo ganador se cumple la función jugadorEmpate*/
                juegoEmpate()
            }
            else {
                jugadorB(); /*si jugadorB gana se deshabilita sino empate*/
                if (juegoGanador()) {
                    array.forEach(arre => arre.setAttribute("disabled", true))
                }
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
           arrayVacio[aleatorio].innerHTML = TURNOS[1];
           contadorTurnos++;
       }
}


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
posiciones ganadoras consta de tres posiciones. Luego con el if hacemos la condición donde si la posición 1 del
array (contiene todas las posiciones) tiene algo sigue con el if y si la posición 1 es igual a la posición 2, sigue
con el if y si la posición 1 es igual a la posición 3, retorna true y sino retorna false */
    for (const iterador of posicionesGanadoras) {
    let [posicion1, posicion2, posicion3] = iterador
        if (array[posicion1].innerHTML && 
            array[posicion1].innerHTML == array[posicion2].innerHTML && 
            array[posicion1].innerHTML == array[posicion3].innerHTML) {
                
                alert ("GANASTE" + array[posicion1].innerHTML) /*gana + la posición 1 (ya que la 2 y 3 son iguales)*/
            
            if (array[posicion1].innerHTML == "🧙‍♂️") {
                contJugadorA.innerHTML = parseInt(contJugadorA.innerHTML) + 1;
                if (parseInt(contJugadorA.innerHTML) === 3) {
                    setTimeout(()=> alert("La partida se va a reiniciar"), 100)
                    reiniciar(true)
                }
            } /*validamos si es el jugadorA agregar el puntaje (parseInt de texto a número*/
    
            else if (array[posicion1].innerHTML == "🪄") {
                contJugadorB.innerHTML = parseInt(contJugadorB.innerHTML) + 1;
                if (parseInt(contJugadorB.innerHTML) === 3) {
                    setTimeout(()=> alert("La partida se va a reiniciar"), 100)
                    reiniciar(true)
                }
            }
            return true
        } 
    }
    return false
}

//función de empate: si contador turnos es igual (== validación) llega a 9 y el juego ganador es falso poner una alerta de empate
function juegoEmpate() {
    if (contadorTurnos == 9 && !juegoGanador()) {
        alert ("Empate")
        reiniciar()
    }
}

btnReiniciar.addEventListener("click", function () {
    reiniciar(false)
})

function reiniciar(resetCounter=false) {
    array.forEach(elemento => elemento.innerHTML = "");
    array.forEach(elemento => elemento.removeAttribute("disabled"));
    contadorTurnos = 0;
    if (resetCounter) {
        contJugadorA.innerHTML = 0;
        contJugadorB.innerHTML = 0;
    }
}

juego()