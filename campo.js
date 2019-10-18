var cols = document.querySelectorAll('.column')
var tituloTime1 = cols[0].querySelector('.titulo')
var tituloTime2 = cols[1].querySelector('.titulo')
var buttonReset = document.querySelector('#reset')
var golSpan1 = document.querySelector('.gol')
var golSpan2 = cols[1].querySelector('.gol')
var faltasSpan1 = cols[0].querySelector('.faltas')
var faltasSpan2 = cols[1].querySelector('.faltas')

var jogoAcabou = false
// Mudei a variavel pessoas para gols
var gols = {
    gol1: 0,
    gol2: 0,
}
var faltas = {
    time1: 0,
    time2: 0,
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBwjQAss_8ny2fNuR0MnKXDzBzDXOqoFFc",
    authDomain: "futebol-9901f.firebaseapp.com",
    databaseURL: "https://futebol-9901f.firebaseio.com",
    projectId: "futebol-9901f",
    storageBucket: "futebol-9901f.appspot.com",
    messagingSenderId: "189630363340",
    appId: "1:189630363340:web:9f2833a8d2ef5feda8b469",
    measurementId: "G-4Q2SYKQTGY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Pega as referencias
var ref = firebase.database().ref('/gols')
var refFaltas = firebase.database().ref('/faltas')

// Define evento de quando muda
ref.on('value', function (snapshot) {
    gols = snapshot.val()
    
    checarVitoria()
})

refFaltas.on('value', function (snapshot) {
    faltas = snapshot.val()

    faltasSpan1.innerText = 'Faltas: ' + faltas.time1
    faltasSpan2.innerText = 'Faltas: ' + faltas.time2
})


golSpan1.onclick=function () {
    if (jogoAcabou === false) {
        gols.gol1++
        golSpan1.innerText = 'Gols: ' + gols.gol1
        ref.set(gols)
    }
}

golSpan2.onclick=function () {
    if (jogoAcabou === false) {
        gols.gol2++
        golSpan2.innerText = 'Gols: ' + gols.gol2
        ref.set(gols)
    }
}

// Aqui eu passo a função reset como uma variável para o
// onclick
buttonReset.onclick = reset

// Função reset com nome
function reset() {
    // Aqui reseta o banco de dados
    ref.set({
        gol1: 0,
        gol2: 0,
    })
    refFaltas.set({
        time1: 0,
        time2: 0,
    })

    jogoAcabou = false
    checarVitoria()
}

function checarVitoria() {
    // Aqui exibe os gols de acordo com o objeto
    golSpan1.innerText = 'Gols: ' + gols.gol1
    golSpan2.innerText = 'Gols: ' + gols.gol2

    
    if (gols.gol2 >= 5){
        tituloTime1.innerText = 'TIME 1: DERROTA'
        tituloTime2.innerText = 'TIME 2: VITÓRIA'

        tituloTime1.classList.add('derrota')
        tituloTime2.classList.add('vitoria')

        jogoAcabou = true
    }
    else if (gols.gol1 >= 5){
        tituloTime1.innerText = 'TIME 1: VITÓRIA'
        tituloTime2.innerText = 'TIME 2: DERROTA'

        tituloTime1.classList.add('vitoria')
        tituloTime2.classList.add('derrota')

        jogoAcabou = true
    }
    else {
        tituloTime1.innerText = 'TIME 1'
        tituloTime2.innerText = 'TIME 2'

        tituloTime1.classList.remove('derrota')
        tituloTime2.classList.remove('vitoria')
        tituloTime1.classList.remove('vitoria')
        tituloTime2.classList.remove('derrota')
    }
}

faltasSpan1.onclick=function () {
    if (jogoAcabou === false) {
        faltas.time1++
        refFaltas.set(faltas)
    }
}


faltasSpan2.onclick=function () {
    if (jogoAcabou === false) {
        faltas.time2++
        refFaltas.set(faltas)
    }
}