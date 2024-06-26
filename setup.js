let bgImage;
let gifImage;
let tacoSounds = {};


function preload() {
    
    bgImage = loadImage('images/golf.jpg');  
    gifImage = loadImage('images/giphy.gif'); 
    tacoSounds['Taco 1'] = loadSound('sounds/hit1.wav');
    tacoSounds['Taco 2'] = loadSound('sounds/hit2.wav');
    tacoSounds['Taco 3'] = loadSound('sounds/hit3.wav');
}

function setup() {
    // Cria o canvas
    createCanvas(900, 600);

    // Define a imagem como plano de fundo
    background(bgImage);

    // Cria elementos do menu inicial
    criarMenuInicial();

  
}

function criarMenuInicial() {
    // Texto do título
    menuInicialTexto = createP("Golfe do Vitinha");
    menuInicialTexto.position(width / 2 - 190, height / 2 - 250);
    menuInicialTexto.style('font-size', '52px');
    menuInicialTexto.style('color', 'white');

    // Botão para iniciar o jogo
    button = createButton('Iniciar Jogo');
    button.position(width / 2 - 160, height / 2 - 100);
    button.size(300, 50);
    button.mousePressed(iniciarJogo);

    // Botão para ver as instruções
    instrucoesButton = createButton('Instruções');
    instrucoesButton.position(width / 2 - 160, height / 2 -30);
    instrucoesButton.size(300, 50);
    instrucoesButton.mousePressed(verInstrucoes);
}
