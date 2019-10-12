var spans = document.querySelectorAll('span')
var pessoas = 0

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
    pessoas = snapshot.val()
    h2.innerText = 'Gols: ' + pessoas
})

var h2 = document.querySelector('h2')

spans[0].onclick=function () {
    if(pessoas >= 15){
        h2.innerText = "lotado"
    }
    else {
        pessoas++
        h2.innerText = 'Gols: ' + pessoas
        ref.set(pessoas)
    }
}

spans[1].onclick=function () {
    if(pessoas <= 0) {
        h2.innerText = 'limite minimo'
    }
    else {
        pessoas--
        h2.innerText = 'Gols: ' + pessoas
        ref.set(pessoas)
    }
}


