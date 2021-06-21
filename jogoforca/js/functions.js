/*
Descricao:
-Transforma sa palavras para se aplicar ao array
-Funções para mostrar a letra no seu devido espaço, mostrar número de jogadas restantes, mostrar cada parte do corpo de acordo com o erro.
-Função para escolher uma palavra aleatoria
-Funcão start para iniciar o jogo e desbloquear o teclado
-Função para definir ganhador e perdedor
-Função para atualizar imagens da forca
-Funcao parar atualizar erros
-E a função reset pra reiniciar 
Aluno: João Vitor Souza Santos 
Data: 20/06/2021
*/
var programming_languages = [
    "janauba",
    "salinas",
    "juramento",
    "curiiba",
    "manaus",
    "pirapora",
    "januária",
    "almenara",
    "vitoria",
    "recife",
    "bocaiuva",
    "uberlandia",
    "diamantina"
  
]
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').setAttribute('disabled', true);
}
function start(){
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
          <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
          >
            ` + letter + `
          </button>
        `).join('');
    
      document.getElementById('keyboard').innerHTML = buttonsHTML;
}
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Você Ganhou!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'A palavra era: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Enforcado!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  start();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
