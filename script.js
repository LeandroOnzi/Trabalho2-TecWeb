// Variáveis 
var frames; 
var cenario = document.getElementById("cenario"); 
var velocidade = 2; 
var tamCenario = 800; 
var tmpCriarObstaculo; 
var gasolina; 
var pontuacao; 
var ponto; 
var velJogador = 2; 
var obstaculos; 
var carro; 
var extra;
var barra; 
var dirX, Xatual; 
var cronometro; 
var menu; 
var telaFinal; 
var telaPontuacao; 
var telaQtdTanque;
var qtdTanque = 0; 
var contadorPonto; 
var tanque; 

// Função para criar obstáculos no cenário.
function criarObstaculo() {
    var y = 0;
    var x = Math.floor(Math.random() * 450 + 150); 
    var imgNum = Math.floor(Math.random() * 7 + 1); 

    var obstaculo = document.createElement("img"); 
    var classe = document.createAttribute("class"); 
    var name = document.createAttribute("name"); 
    var style = document.createAttribute("style"); 
    var src = document.createAttribute("src"); 

    name.value = "" + imgNum; 
    src.value = "img/" + imgNum + ".png"; 
    classe.value = "obstaculo"; 
    style.value = "top:0px; left:" + x + "px"; 
    obstaculo.setAttributeNode(classe); 
    obstaculo.setAttributeNode(style); 
    obstaculo.setAttributeNode(src); 
    obstaculo.setAttributeNode(name); 
    cenario.appendChild(obstaculo); 
}

// Função para controlar os obstáculos
function controlaObstaculo() {
    obstaculos = document.getElementsByClassName("obstaculo"); 
    var qtd = obstaculos.length; 

    for (var i = 0; i < qtd; i++) {
        if (obstaculos[i]) {
            var acelerar = obstaculos[i].offsetTop; 
            acelerar += velocidade; 
            obstaculos[i].style.top = acelerar + "px"; 

            if (acelerar >= tamCenario) {
                if (obstaculos[i].name != "5" && obstaculos[i].name != "7") {
                    pontuacao++; 
                }
                obstaculos[i].remove(); 
            }
        }
    }
}

// Função para controlar o movimento do jogador
function controlaJogador() {
    Xatual += dirX * velJogador; 

    if (Xatual >= 150 && Xatual <= 600) {
        carro.style.left = Xatual + "px"; 
    }
}

// Função que verifica se houve colisão entre o jogador e os obstáculos
function colisao() {
    extra = 0; 
    tanque = 0; 
    var qtd = obstaculos.length; 

    for (var i = 0; i < qtd; i++) {
        if (obstaculos[i]) {
            if (
                obstaculos[i].offsetTop == 580 &&
                obstaculos[i].offsetLeft + 50 > carro.offsetLeft && obstaculos[i].offsetLeft < carro.offsetLeft + 50
            ) {
                if (obstaculos[i].name == "5") {
                    extra = 10; 
                } else if (obstaculos[i].name == "7") {
                    tanque = 1; 
                    if (gasolina + 0.3 <= 100) {
                        gasolina += 0.3; 
                    }
                } else {
                    exibirTelaFinal(); 
                }
            }

            if (
                obstaculos[i].offsetTop > 580 &&
                carro.offsetLeft < obstaculos[i].offsetLeft + 50 &&
                carro.offsetLeft + 50 > obstaculos[i].offsetLeft &&
                obstaculos[i].offsetTop < 680
            ) {
                if (obstaculos[i].name == "5") {
                    extra = 10; 
                } else if (obstaculos[i].name == "7") {
                    tanque = 1; 
                    if (gasolina + 0.3 <= 100) {
                        gasolina += 0.3; 
                    }
                } else {
                    exibirTelaFinal(); 
                }
            }
        }
    }
}

// Função que verifica se a condição de término do jogo foi alcançada, nesse caso da gasolina for igual -1
function controleVitoria() {
    if (gasolina == -1) {
        exibirTelaFinal(); 
    }
}

// Função que atualiza visualmente a barra de gasolina com base na quantidade de gasolina.
function controleGasolina() {
    barra.style.width = gasolina + "%"; 
}

//Função que exibe o valor da variável extra no console e atualiza a pontuação exibida.
function controlePontuacao() {
    console.log(extra); 
    ponto.innerHTML = +pontuacao + ""; 
}

//Função que exibe a tela final do jogo
function exibirTelaFinal() {
    telaFinal.style.left = "0px"; 
    clearInterval(tmpCriarObstaculo); 
    telaPontuacao.innerHTML = pontuacao + ""; 
    telaQtdTanque.innerHTML = qtdTanque + "";
    window.cancelAnimationFrame(); 
}

// Função principal que controla o loop do jogo
function gameLoop() {
    controleGasolina();
    controlaJogador();
    controlaObstaculo();
    controleVitoria();
    controlePontuacao();
    colisao();
    frames = requestAnimationFrame(gameLoop); 
}

// Função que configura as variáveis iniciais do jogo e inicia os intervalos de criação de obstáculos e outras ações.
function inicia() {
    dirX = 0; 
    extra = 0;
    Xatual = 350; 
    gasolina = 100; 
    pontuacao = 0; 
    tanque = 0; 

    telaPontuacao = document.querySelector(".insert-ponto"); 
    telaQtdTanque = document.querySelector(".insert-tanque"); 
    telaFinal = document.getElementById("fim-game"); 
    ponto = document.getElementById("pontos"); 
    carro = document.getElementById("carro"); 
    barra = document.getElementById("barra"); 
    carro.style.left = Xatual + "px"; 

    clearInterval(tmpCriarObstaculo); 
    clearInterval(cronometro); 
    clearInterval(contadorPonto); 

    tmpCriarObstaculo = setInterval(criarObstaculo, 1000); 

    cronometro = setInterval(() => {
        gasolina -= 1; 
    }, 1000);

    var temporizador = setInterval(() => {
        velocidade += 1; 
        velJogador += 0.5; 
    }, 15000);

    contadorPonto = setInterval(() => {
        if (extra == 10) {
            pontuacao += 10; 
        }
        if (tanque == 1) {
            qtdTanque += tanque; 
        }
    }, 1000);

    gameLoop(); 
}


document.querySelector(".btn-iniciar").addEventListener("click", () => {
    menu = document.getElementById("menu"); 
    menu.style.left = "-100%"; 
    inicia(); // Chama a função para iniciar o jogo.
});


document.querySelector(".btn-reiniciar").addEventListener("click", () => {
    window.location.reload(true); // Recarrega a página para reiniciar o jogo.
});

// Adiciona eventos de mudança de cenário
document.getElementById("btn-diario").addEventListener("click", exibirCenarioDiario); 
document.getElementById("btn-cerracao").addEventListener("click", exibirCenarioCerracao); 
document.getElementById("btn-noturno").addEventListener("click", exibirCenarioNoturno); 
document.getElementById("btn-neve").addEventListener("click", exibirCenarioNeve); 

// Função para lidar com evento de clique no botão - cenário diário
function exibirCenarioDiario() {
    document.body.style.backgroundImage = "url(img/cenario-diario.png)";
}

// Função para lidar com evento de clique no botão - cenário cerração
function exibirCenarioCerracao() {
    document.body.style.backgroundImage = "url(img/cenario-cerracao.png)"; 
}

// Função para lidar com evento de clique no botão - cenário noturno
function exibirCenarioNoturno() {
    document.body.style.backgroundImage = "url(img/cenario-noturno.png)"; 
}

// Função para lidar com evento de clique no botão - cenário neve
function exibirCenarioNeve() {
    document.body.style.backgroundImage = "url(img/cenario-neve.png)"; 
}

// Tecla pressionada
document.addEventListener("keydown", (ev) => {
    switch (ev.key) {
        case "ArrowLeft":
            dirX = -1; 
            break;
        case "ArrowRight":
            dirX = 1; 
            break;
    }
});

// Tecla solta
document.addEventListener("keyup", (ev) => {
    if (ev.key == "ArrowLeft" || ev.key == "ArrowRight") {
        dirX = 0; 
    }
});




