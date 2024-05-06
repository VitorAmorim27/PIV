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
var jogoIniciado = false;
var button; 
var tacoSelecionado = false; 
var instrucoesButton; 
var voltarButton; 
var menuInicialTexto; 
var LvlTexto; 

var niveis = {
    'Nivel 1': {
        holeX: 700,
        holeY: 100,
        ballX: 100,
        ballY: 450,
        strokeDistance: 13,
    },
    'Nivel 2': {
        holeX: 200,
        holeY: 130,
        ballX: 800,
        ballY: 500,
        strokeDistance: 10,
    },
    'Nivel 3': {
        holeX: 450,
        holeY: 150,
        ballX: 450,
        ballY: 500,
        strokeDistance: 10,
    }
};

var instrucoes = "Instruções do Jogo:\n\n" +
    "1. Selecione um Nível.\n" +
    "2. Clique em Iniciar Jogo e em seguida selecione um taco.\n" +
    "3. Clique na bola de golfe para ajustar a força e direção do taco.\n" +
    "4. Tente acertar a bola no buraco com o menor número de jogadas possíveis para vencer.\n" +
    "5. Aproveite o jogo!";
