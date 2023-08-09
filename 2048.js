var tablero;
var puntaje = 0;
var filas = 4;
var columnas = 4;

window.onload = function () {
    FijarJuego();
};

function FijarJuego() {
    tablero = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let mosaico = document.createElement("div");
            mosaico.id = f.toString() + "-" + c.toString();
            let num = tablero[f][c];
            ActualizarMosaico(mosaico, num);
            document.getElementById("tablero").append(mosaico);
        }
    }    

    Agregar2();
    Agregar2();

    document.getElementById("game-over").style.display = "block";
}

function ReiniciarJuego() {
    document.getElementById("game-over").style.display = "none";
    puntaje = 0;
    FijarJuego();
}

function TableroLleno() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (tablero[f][c] === 0) {
                return false;
            }
        }
    }
    return true;
}

function Agregar2() {

    if (TableroLleno()) {
        return;
    }

    let encontrado = false;
    while (!encontrado) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);

        if (tablero[f][c] === 0) {
            tablero[f][c] = 2;
            let mosaico = document.getElementById(f.toString() + "-" + c.toString());
            mosaico.innerText = "2";
            mosaico.classList.add("x2");
            encontrado = true;
        }
    }
}

function ActualizarMosaico(mosaico, num) {
    mosaico.innerText = "";
    mosaico.className = "mosaico";

    if (num > 0) {
        mosaico.innerText = num.toString();
        if (num <= 4096) {
            mosaico.classList.add("x" + num.toString());
        } else {
            mosaico.classList.add("x8192");
        }
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        DeslizarIzquierda();
        Agregar2();
    } else if (e.code === "ArrowUp" || e.code === "KeyW") {
        DeslizarArriba();
        Agregar2();
    } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        DeslizarDerecha();
        Agregar2();
    } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        DeslizarAbajo();
        Agregar2();
    }    
    document.getElementById("puntaje").innerText = puntaje;
});

function FiltrarCero(fila) {
    return fila.filter((num) => num != 0);
}

function Deslizar(fila) {
    fila = FiltrarCero(fila);

    for (let i = 0; i < fila.length - 1; i++) {
        if (fila[i] == fila[i + 1]) {
            fila[i] *= 2;
            fila[i + 1] = 0;
            puntaje += fila[i];
        }
    }

    fila = FiltrarCero(fila);

    while (fila.length < columnas) {
        fila.push(0);
    }

    return fila;
}

function DeslizarIzquierda() {
    for (let f = 0; f < filas; f++) {
        let fila = tablero[f];
        fila = Deslizar(fila);
        tablero[f] = fila;

        for (let c = 0; c < columnas; c++) {
            let mosaico = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            ActualizarMosaico(mosaico, num);
        }
    }
}

function DeslizarDerecha() {
    for (let f = 0; f < filas; f++) {
        let fila = tablero[f];
        fila.reverse();
        fila = Deslizar(fila);
        fila.reverse();
        tablero[f] = fila;

        for (let c = 0; c < columnas; c++) {
            let mosaico = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            ActualizarMosaico(mosaico, num);
        }
    }
}

function DeslizarArriba() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tablero[0][c], tablero[1][c], tablero[2][c], tablero[3][c]];
        fila = Deslizar(fila);

        // tablero[0][c] = fila[0];
        // tablero[1][c] = fila[1];
        // tablero[2][c] = fila[2];
        // tablero[3][c] = fila[3];       

        for (let f = 0; f < filas; f++) {
            tablero[f][c] = fila[f];
            let mosaico = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            ActualizarMosaico(mosaico, num);
        }
    }
}

function DeslizarAbajo() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tablero[0][c], tablero[1][c], tablero[2][c], tablero[3][c]];
        fila.reverse();
        fila = Deslizar(fila);
        fila.reverse();        

        // tablero[0][c] = fila[0];
        // tablero[1][c] = fila[1];
        // tablero[2][c] = fila[2];
        // tablero[3][c] = fila[3];       

        for (let f = 0; f < filas; f++) {
            tablero[f][c] = fila[f];
            let mosaico = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            ActualizarMosaico(mosaico, num);
        }
    }
}