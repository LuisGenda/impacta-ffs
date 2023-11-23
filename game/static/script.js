const forcaImagem = document.querySelector(".forca-box img");
const palavraDisplay = document.querySelector(".display-palavra");
const chancesText = document.querySelector(".chances b");
const tecladoDiv = document.querySelector(".teclado");
const gameModal = document.querySelector(".resultados");
const jogarNovamenteBtn = document.querySelector(".jogar-novamente");

let currentWord, correctLetters, contagemErros; 
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    contagemErros = 0;
    forcaImagem.scr = `static/hangman-${contagemErros}.svg`;
    chancesText.innerText = `${contagemErros} / ${maxGuesses}`;
    tecladoDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    palavraDisplay.innerHTML = currentWord.split("").map(() => `<li class="letra"></li>` ).join("");
    gameModal.classList.remove("show");
}

const pegarPalavra = () => {
    const { palavra, dica } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = palavra;
    console.log(palavra);
    document.querySelector(".dica b"). innerText = dica
    resetGame();
}

const gameOver = (Ganhou) => {
    setTimeout(() => {
        const modalText = Ganhou ? `Você acertou a palavra:` : `A palavra correta era:`;
        gameModal.querySelector("img").scr = `static/${Ganhou ? 'ganhou' : 'perdeu'}.gif`
        gameModal.querySelector("h4").innerText = `${Ganhou ? 'Parabéns' : 'Fim de Jogo'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300); 
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter)
                palavraDisplay.querySelector("li")[index].innerText = letter;
                palavraDisplay.querySelector("li")[index].classList.add("Adivinhada");
            }
        })
    } else{
        contagemErros++;
        forcaImagem.scr = `static/hangman-${contagemErros}.svg`;
    }
    button.disabled = true;
    chancesText.innerText = `${contagemErros} / ${maxGuesses}`;

    if(contagemErros === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    tecladoDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

pegarPalavra();
jogarNovamenteBtn.addEventListener("click", pegarPalavra);