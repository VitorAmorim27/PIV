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
var button; // Adicionado para que o botão seja uma variável global
var tacoSelecionado = false; // Variável para controlar se um taco foi selecionado
var instrucoesButton; // Variável para o botão das instruções
var voltarButton; // Variável para o botão de voltar ao menu inicial
var menuInicialTexto; // Variável para o texto "Menu Inicial"
var LvlTexto; // Variável para o texto "Menu Inicial"

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
    strokeDistance: 7,
  },
  'Nivel 3': {
    holeX: 500,
    holeY: 300,
    ballX: 300,
    ballY: 350,
    strokeDistance: 5,
  },
};
var nivelAtual;

var instrucoes = "Instruções do Jogo:\n\n" +
                 "1. Selecione um Nível.\n" +
                 "2. Clique em Iniciar Jogo e em seguida selecione um taco.\n" +
                 "3. Clique na bola de golfe para ajustar a força e direção do taco.\n" +
                 "4. Tente acertar a bola no buraco com o menor número de jogadas possíveis para vencer.\n" +
                 "5. Aproveite o jogo!";

function setup() {
  // Cria o canvas
  createCanvas(900, 600);

  // Cria elementos do menu inicial
  criarMenuInicial();
}

function draw() {
  if (jogoIniciado) {
    // Se o jogo já foi iniciado, desenhe o jogo
    desenharJogo();
  } else {
    // Se o jogo ainda não foi iniciado, desenhe o menu inicial
    desenharMenuInicial();
  }
}

// Função para criar elementos do menu inicial
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

// Função para iniciar o jogo
function iniciarJogo() {

  // Remover todos os elementos do menu inicial quando o jogo é iniciado
  button.remove();
  instrucoesButton.remove();
  menuInicialTexto.remove();

    // Texto do título
    LvlTexto = createP("Selecione o nível");
    LvlTexto.position(width / 2 - 80, height / 2 - 100);
    LvlTexto.style('font-size', '32px');
    LvlTexto.style('color', 'white');
  
  // Cria o grupo de botões de opção para selecionar os níveis
  radioNivel = createRadio();
  radioNivel.position(width / 2 - 150 , height / 2 ); 

  // Adiciona opções para cada nível
  radioNivel.option('Nivel 1');
  radioNivel.option('Nivel 2');
  radioNivel.option('Nivel 3');

  radioNivel.style('font-size', '24px');
  radioNivel.style('width', '500px');
  radioNivel.style('height', '100px');
  // Função chamada quando o nível é alterado
  radioNivel.changed(changeNivel);

  
}

// Função para ver as instruções
function verInstrucoes() {
  // Remover todos os elementos do menu inicial
  button.remove();
  instrucoesButton.remove();
  menuInicialTexto.remove();
  // Adicionar texto de instruções
  textAlign(LEFT);
  fill(255);
  textSize(16);
  text(instrucoes, 20, 20, width - 40, height - 40);
  // Botão para voltar ao menu inicial
  voltarButton = createButton('Voltar ao Menu Inicial');
  voltarButton.position(width / 2 - 50, height - 70);
  voltarButton.size(200, 50);
  voltarButton.mousePressed(voltarMenuInicial);
}

// Função para voltar ao menu inicial
function voltarMenuInicial() {
  jogoIniciado = false;

  // Remover todos os elementos de instruções
  voltarButton.remove();
  // Criar elementos do menu inicial novamente
  criarMenuInicial();
}

// Função para inicializar o jogo com base nas configurações do nível escolhido
function initializeGame(nivel) {
  jogoIniciado = true;
  holeX = nivel.holeX;
  holeY = nivel.holeY;
  x = nivel.ballX;
  y = nivel.ballY;

  if (radioNivel) {
    radioNivel.style('display', 'none');
}

  if (LvlTexto) {
      LvlTexto.remove();
  }

  // Inicializa outros parâmetros de jogo
  xSpeed = 0;
  ySpeed = 0;
  counter = 0;
  strokeDistance = nivel.strokeDistance;
  strokes = 0;

  radioSticks = createRadio();
  radioSticks.position(15, height - 45); // Posição no canto inferior esquerdo

  // Adiciona opções para cada taco
  radioSticks.option('Taco 1');
  radioSticks.option('Taco 2');
  radioSticks.option('Taco 3');

  radioSticks.changed(changeStick);
}


// Função chamada quando o nível é alterado
function changeNivel() {
  var selectedNivel = radioNivel.value();
  nivelAtual = niveis[selectedNivel];
  nivelTexto = selectedNivel;
  // Inicializa o jogo com o nível escolhido
  initializeGame(nivelAtual);
  
}

// Função para desenhar o menu inicial
function desenharMenuInicial() {
}

// Função para desenhar o jogo
function desenharJogo() {
  // Define o plano de fundo como verde
  background(0, 220, 0);

  // Desenha um retângulo ao redor do canvas
  stroke(0, 0, 0);
  strokeWeight(20); 
  noFill(); 
  rect(0, 0, width, height); 

  // Mantém o buraco em sua posição atual
  fill(0, 0, 0);
  ellipse(holeX, holeY, 30);

  // Desenha a bola de golfe
  stroke(0, 0, 0); 
  strokeWeight(2); 
  fill(255); 
  ellipse(x, y, 20);

  // Verifica se o nível atual é o nível 1 e se a bola colidiu com o lago
  if (nivelTexto === 'Nivel 1' && collidePointEllipse(x, y, 350, 350, 180, 80)) {

    var dx = x - 350; 
    var dy = y - 350; 
    var distance = dist(x, y, 350, 350); 

    x = 350 + (dx / distance) * (180 / 2 + 40);
    y = 350 + (dy / distance) * (80 / 2 + 40);

    // Zere as velocidades da bola
    xSpeed = 0;
    ySpeed = 0;

    // Aumenta o contador de jogadas
    strokes++;
  }

  // Se a bola de golfe cair no buraco
  if (abs(x - holeX) <= 5 && abs(y - holeY) <= 5) {
    xSpeed = 0;
    ySpeed = 0;
    fill(0, 0, 255);
    textSize(32);
    text('YOU WIN!', 10, 30);
    if (strokes == 1) {
      text('Hole in One!', 10, 70);
    } else {
      text(strokes + ' strokes!', 10, 70);
    }
  } else if (counter > 10 * strokeDistance) {
    // Para a bola e reseta o counter
    xSpeed = 0;
    ySpeed = 0;
    counter = 0;
  } else if (x <= 30 || y <= 30 || x >= width - 30 || y >= height - 30) {
    // Para a bola e ajusta a posição se necessário
    xSpeed = 0;
    ySpeed = 0;

    if (x >= width - 30) {
      x -= 1;
    }
    if (y >= height - 30) {
      y -= 1;
    }
    if (x <= 30) {
      x += 1;
    }
    if (y <= 30) {
      y += 1;
    }
  } else {

    if (strokeDistance > 0) {
      counter++;
    }
    x += xSpeed;
    y += ySpeed;
  }

  // Adiciona o texto com as strokes e a distância
  fill(255);
  textSize(16);
  var distance = dist(x, y, holeX, holeY);
  text('Jogadas: ' + strokes, 15, 30);
  text('Distância: ' + distance.toFixed(2), 15, 60);

  // Adiciona o texto do nível selecionado
  fill(255);
  textSize(18);
  text(nivelTexto, 350, 30);

  // Verifica se o nível atual é o 'Nivel 1' e desenha uma elipse azul
  if (nivelTexto === 'Nivel 1') {
    fill(0, 0, 255); // Cor azul
    noStroke();
    ellipse(350, 350, 180, 80);
  }

  if (xSpeed === 0 && ySpeed === 0) {
    // Desenha um círculo ao redor da bola para indicar a área de clique
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    ellipse(x, y, 75);
  }

  // Verifica se um taco foi selecionado e se a mensagem de seleção de taco deve ser exibida
  if (tacoSelecionado) {
    // Verifica se há um taco selecionado
    var selectedStick = radioSticks.value();
    if (!selectedStick) {
      // Se não houver taco selecionado, exibe um alerta
      fill(255, 0, 0); // Cor vermelha
      textSize(16);
      textAlign(CENTER, CENTER);
      text('Por favor, selecione um taco primeiro.', width / 2, height - 10);
    }
  }
}

var tacoVelocities = {
  'Taco 1': 0.5,
  'Taco 2': 0.8, 
  'Taco 3': 1.2
};

// Função a ser chamada quando o taco mudar
function changeStick() {
  var selectedStick = radioSticks.value();

  console.log('Taco selecionado:', selectedStick);

  var speedMultiplier = tacoVelocities[selectedStick];

  xSpeed *= speedMultiplier;
  ySpeed *= speedMultiplier;

  // Define que um taco foi selecionado
  tacoSelecionado = true;
}

function mousePressed() {
  // Verifica se o clique ocorreu na área dos botões de opção
  var radioX = radioSticks.elt.offsetLeft;
  var radioY = radioSticks.elt.offsetTop;
  var radioWidth = radioSticks.elt.offsetWidth;
  var radioHeight = radioSticks.elt.offsetHeight;

  if (mouseX >= radioX && mouseX <= radioX + radioWidth &&
    mouseY >= radioY && mouseY <= radioY + radioHeight) {

    return;
  }

  // Verifica se há um taco selecionado apenas se o jogo estiver iniciado
  if (jogoIniciado) {
    var selectedStick = radioSticks.value();
    if (!selectedStick) {
      // Se não houver taco selecionado, exibe um alerta
      alert('Por favor, selecione um taco primeiro.');
      return;
    }
  }

  // Verifica se o clique do mouse está próximo à bola de golfe
  if (collidePointEllipse(mouseX, mouseY, x, y, 75, 75)) {

    // Calcula a distância entre o clique e a bola
    var strokeX = abs(mouseX - x);
    var strokeY = abs(mouseY - y);
    strokeDistance = sqrt(strokeX * strokeY);

    // Calcula o fator de velocidade com base no taco selecionado
    var speedMultiplier = tacoVelocities[selectedStick];

    // Define as velocidades, considerando o fator de velocidade
    xSpeed = (x - mouseX) / 10 * speedMultiplier;
    ySpeed = (y - mouseY) / 10 * speedMultiplier;
    strokes++;

    // Exibe as velocidades calculadas para depuração
    console.log(xSpeed);
    console.log(ySpeed);
  }
}
