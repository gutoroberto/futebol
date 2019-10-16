var spans = document.querySelectorAll('span')
// Mudei a variavel pessoas para gols
var gols = {
    gol1: 0,
    gol2: 0,
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

// Lê o banco
var database = firebase.database()

// Pega a referencia
var ref = firebase.database().ref('/')

// Define evento de quando muda
ref.on('value', function (snapshot) {
    gols = snapshot.val()
    // Agora pega dos gols
    h2.innerText = 'Gols: ' + gols.gol1
    h3.innerText = 'Gols: ' + gols.gol2
})

var h2 = document.querySelector('h2')
var h3 = document.querySelector('h3')

spans[0].onclick=function () {
    if(gols.gol1 >= 5){
        h2.innerText = "vencedor"
        h3.innerText = "perdedor" // Adicionei isso
    }
    else {
        gols.gol1++ // Mudado para gols.gol1
        h2.innerText = 'Gols: ' + gols.gol1 // Mudado para gols.gol1
        ref.set(gols)
    }
}

spans[1].onclick=function () {
    if(gols.gol2 >= 5){
        h3.innerText = "vencedor"
        h2.innerText = "perdedor" // Adicionei isso
    }
    else {
        gols.gol2++ // Mudado para gols.gol2
        h3.innerText = 'Gols: ' + gols.gol2 // Mudado para gols.gol2
        ref.set(gols)
    }
}

// Aqui eu passo a função reset como uma variável para o
// onclick
spans[2].onclick = reset

// Função reset com nome
function reset() {
    // Aqui reseta o banco de dados
    ref.set({
        gol1: 0,
        gol2: 0,
    })

    // Aqui exibe os gols de acordo com o objeto
    h2.innerText = 'Gols: ' + gols.gol1
    h3.innerText = 'Gols: ' + gols.gol2
}

