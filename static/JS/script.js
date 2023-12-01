const forcaImagem = document.getElementById("img-forca");
const palavraDisplay = document.querySelector(".display-palavra");
const chancesText = document.querySelector(".chances b");
const tecladoDiv = document.querySelector(".teclado");
const gameModal = document.querySelector(".resultados");
const jogarNovamenteBtn = document.querySelector(".jogar-novamente");
const palavra = document.querySelector(".word").innerHTML;
const dica = document.querySelector(".hint").innerHTML;
const winorlose = document.getElementById("winlose");

let currentWord, correctLetters, contagemErros; 
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    contagemErros = 0;
    chancesText.innerText = `${contagemErros} / ${maxGuesses}`;
    tecladoDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    palavraDisplay.innerHTML = currentWord.split("").map(() => `<li class="letra"></li>` ).join("");
    gameModal.classList.remove("show");
}

const pegarPalavra = () => {
    currentWord = palavra;
    console.log(palavra);
    document.querySelector(".dica").innerText = ("Dica: ")+dica
    resetGame();
}

const gameOver = (Ganhou) => {
    setTimeout(() => {
        const modalText = Ganhou ? `Você acertou a palavra:` : `A palavra correta era:`;
        console.log(Ganhou)
        winorlose.setAttribute('src', `/static/images/${Ganhou ? 'victory' : 'lost'}.gif`);
        gameModal.querySelector("h4").innerText = `${Ganhou ? 'Parabéns' : 'Fim de Jogo'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        setInterval(showwinlose, 200);
    }, 300); 
}

const showwinlose = () =>{
    gameModal.classList.add("show");
}



const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter)
                console.log(index)
                console.log(letter)
                var li = palavraDisplay.getElementsByTagName("li")
                li[index].innerHTML = letter;
                li[index].classList.add("Adivinhada");
            }
        })
    } else{
        contagemErros++;
        console.log(contagemErros)
        forcaImagem.setAttribute('src', "static/images/hangman-"+contagemErros+".svg");
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

const reload = () =>{
    window.location.href = "/game";
}
jogarNovamenteBtn.addEventListener("click", reload);
