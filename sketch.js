var holeX
var holeY
var x
var y
var xSpeed
var ySpeed
var strokes
var treeImage;
var counter
var strokeDistance
var radioSticks; 
var nivelTexto = 'Nivel 1';

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


function setup() {
  // Cria o canvas
  createCanvas(900, 600);

  // Cria o grupo de botões de opção para selecionar os níveis
  radioNivel = createRadio();
  radioNivel.position(15, height - 75); // Posição no canto inferior esquerdo

  // Adiciona opções para cada nível
  radioNivel.option('Nivel 1');
  radioNivel.option('Nivel 2');
  radioNivel.option('Nivel 3');

  // Função chamada quando o nível é alterado
  radioNivel.changed(changeNivel);

  // Inicializa o jogo com o nível padrão (por exemplo, 'Nivel 1')
  nivelAtual = niveis['Nivel 1'];
  initializeGame(nivelAtual);
}

// Função para inicializar o jogo com base nas configurações do nível escolhido
function initializeGame(nivel) {
  
  holeX = nivel.holeX;
  holeY = nivel.holeY;
  x = nivel.ballX;
  y = nivel.ballY;

  // Inicializa outros parâmetros de jogo
  xSpeed = 0;
  ySpeed = 0;
  counter = 0;
  strokeDistance = nivel.strokeDistance;
  strokes = 0;

  // Cria o grupo de botões de opção para selecionar os tacos
  radioSticks = createRadio();
  radioSticks.position(15, height - 45); // Posição no canto inferior esquerdo

  // Adiciona opções para cada taco
  radioSticks.option('Taco 1');
  radioSticks.option('Taco 2');
  radioSticks.option('Taco 3');

  radioSticks.changed(changeStick);
  // Outros parâmetros do jogo
  // Exemplo: adicionar obstáculos ao campo com base no nível
}

// Função chamada quando o nível é alterado
function changeNivel() {
  var selectedNivel = radioNivel.value();
  nivelAtual = niveis[selectedNivel];
  nivelTexto = selectedNivel;
  // Inicializa o jogo com o nível escolhido
  initializeGame(nivelAtual);
}



function draw() {
  // Define o plano de fundo como verde
  background(0, 220, 0);
  
  // Desenha um retângulo ao redor do canvas
  stroke(0, 0, 0); // Cor da linha preta
  strokeWeight(20); // Espessura da linha
  noFill(); // Não preenche o retângulo
  rect(0, 0, width, height); // Retângulo ao redor do canvas
  
  // Mantém o buraco em sua posição atual
  fill(0, 0, 0);
  ellipse(holeX, holeY, 30);
  
  // Desenha a bola de golfe
  stroke(0, 0, 0); // Cor da linha preta
  strokeWeight(2); // Espessura da linha para a bola
  fill(255); // Cor branca para a bola de golfe
  ellipse(x, y, 20);

// Verifica se o nível atual é o nível 1 e se a bola colidiu com o lago
if (nivelTexto === 'Nivel 1' && collidePointEllipse(x, y, 350, 350, 180, 80)) {
    // Se a bola colidir com o lago, calcule a direção da bola em relação ao centro do lago
    var dx = x - 350; // Diferença na posição x entre a bola e o centro do lago
    var dy = y - 350; // Diferença na posição y entre a bola e o centro do lago
    var distance = dist(x, y, 350, 350); // Distância entre a bola e o centro do lago
    
    // Calcule os novos valores de x e y para posicionar a bola a 40 unidades do centro do lago
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
      // Verifica os limites
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
      // Atualiza a posição da bola de golfe
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
      stroke(255, 0, 0); // Cor vermelha para o círculo
      strokeWeight(2); // Espessura da linha
      noFill(); // Não preencher o círculo
      ellipse(x, y, 75); // Desenha um círculo com raio de 75 ao redor da bola
  }
}

var tacoVelocities = {
  'Taco 1': 0.5, // Velocidade associada ao Taco 1
  'Taco 2': 0.8, // Velocidade associada ao Taco 2
  'Taco 3': 1.2 // Velocidade associada ao Taco 3
};

// Função a ser chamada quando o taco mudar
function changeStick() {
  var selectedStick = radioSticks.value();
  // Aqui definimos ações com base na seleção do taco
  console.log('Taco selecionado:', selectedStick);

  // Obtemos a velocidade associada ao taco selecionado
  var speedMultiplier = tacoVelocities[selectedStick];

  // Atualizamos as velocidades com base na seleção do taco
  xSpeed *= speedMultiplier;
  ySpeed *= speedMultiplier;
}


function mousePressed() {

  // Verifica se o clique ocorreu na área dos botões de opção
  var radioX = radioSticks.elt.offsetLeft;
  var radioY = radioSticks.elt.offsetTop;
  var radioWidth = radioSticks.elt.offsetWidth;
  var radioHeight = radioSticks.elt.offsetHeight;

  if (mouseX >= radioX && mouseX <= radioX + radioWidth &&
    mouseY >= radioY && mouseY <= radioY + radioHeight) {
    // Se o clique ocorreu na área dos botões de opção, não faz nada
    return;
  }

  // Verifica se há um taco selecionado
  var selectedStick = radioSticks.value();
  if (!selectedStick) {
    // Se não houver taco selecionado, exibe um alerta
    alert('Por favor, selecione um taco primeiro.');
    return;
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