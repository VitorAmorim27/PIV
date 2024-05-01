function setup() {
    // Cria o canvas
    createCanvas(900, 600);

    // Cria elementos do menu inicial
    criarMenuInicial();
}

function criarMenuInicial() {
    // Define o plano de fundo como verde
    background(0, 220, 0);

    // Texto do título
    menuInicialTexto = createP("Golfe do Vitinha");
    menuInicialTexto.position(width / 2 - 80, height / 2 - 100);
    menuInicialTexto.style('font-size', '32px');
    menuInicialTexto.style('color', 'white');

    // Botão para iniciar o jogo
    button = createButton('Iniciar Jogo');
    button.position(width / 2 - 50, height / 2);
    button.size(100, 50);
    button.mousePressed(iniciarJogo);

    // Botão para ver as instruções
    instrucoesButton = createButton('Instruções');
    instrucoesButton.position(width / 2 - 50, height / 2 + 70);
    instrucoesButton.size(100, 50);
    instrucoesButton.mousePressed(verInstrucoes);
}
