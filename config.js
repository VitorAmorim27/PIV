// Configurações iniciais e variáveis globais
var holeX;
var holeY;
var x;
var y;
var xSpeed;
var ySpeed;
var strokes;
var treeImage;
var counter;
var strokeDistance;
var radioSticks;
var radioNivel;
var nivelTexto = 'Nivel 1';
var jogoIniciado = false;
var button; // Botão global
var tacoSelecionado = false; // Controle de seleção de taco
var instrucoesButton; // Botão de instruções
var voltarButton; // Botão de voltar ao menu inicial
var menuInicialTexto; // Texto do menu inicial
var LvlTexto; // Texto para seleção de nível

var niveis = {
    'Nivel 1': {
        holeX: 700,
        holeY: 100,
        ballX: 100,
        ballY: 450,
        strokeDistance: 10,
    },
    'Nivel 2': {
        holeX: 600,
        holeY: 200,
        ballX: 200,
        ballY: 400,
        strokeDistance: 10,
    },
    'Nivel 3': {
        holeX: 500,
        holeY: 300,
        ballX: 300,
        ballY: 350,
        strokeDistance: 10,
    }
};

var instrucoes = "Instruções do Jogo:\n\n" +
    "1. Selecione um Nível.\n" +
    "2. Clique em Iniciar Jogo e em seguida selecione um taco.\n" +
    "3. Clique na bola de golfe para ajustar a força e direção do taco.\n" +
    "4. Tente acertar a bola no buraco com o menor número de jogadas possíveis para vencer.\n" +
    "5. Aproveite o jogo!";
