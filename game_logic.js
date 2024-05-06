function iniciarJogo() {

    // Remover todos os elementos do menu inicial quando o jogo é iniciado
    button.remove();
    instrucoesButton.remove();
    menuInicialTexto.remove();
  
      // Texto do título
      LvlTexto = createP("Selecione o nível");
      LvlTexto.position(width / 2 - 120, height / 2 - 270);
      LvlTexto.style('font-size', '32px');
      LvlTexto.style('color', 'black');
    
    // Cria o grupo de botões de opção para selecionar os níveis
    radioNivel = createRadio();
    radioNivel.position(width / 2 - 150 , height / 2 - 150); 
  
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

  function verInstrucoes() {
    // Remover todos os elementos do menu inicial
    button.remove();
    instrucoesButton.remove();
    menuInicialTexto.remove();
    
    // Adicionar texto de instruções
    adicionarInstrucoes();
  
    // Botão para voltar ao menu inicial
    voltarButton = createButton('Voltar ao Menu Inicial');
    voltarButton.position(width / 2 - 50, height - 70);
    voltarButton.size(200, 50);
    voltarButton.mousePressed(voltarMenuInicial);
  }
  
  function adicionarInstrucoes() {
    // Adicionar texto de instruções
    textAlign(LEFT);
    fill(0);
    textSize(16);
    text(instrucoes, 20, 20, width - 40, height - 40);
  }
  
  // Função para voltar ao menu inicial
  function voltarMenuInicial() {
    jogoIniciado = false;
  
    // Remover todos os elementos de instruções
    voltarButton.remove();
    
    // Remover o texto de instruções
    removerInstrucoes();
    
    // Criar elementos do menu inicial novamente
    criarMenuInicial();
  }
  function reiniciarJogo() {
   
    initializeGame(nivelAtual);
}
  function voltarAoInicio() {
    // Remova todos os elementos do jogo atual
    if (radioSticks) {
        radioSticks.style('display', 'none');
    }

    if (AgainButton) {
        AgainButton.remove();
    }

    if (SairButton) {
        SairButton.remove();
    }

    if (LvlTexto) {
        LvlTexto.remove();
    }

    if (radioNivel) {
        radioNivel.remove();
    }

    background(bgImage);
    
    jogoIniciado = false;
    tacoSelecionado = false;
    exibirMensagemErro = false;

    // Restabelece o menu inicial
    criarMenuInicial();
}


  function removerInstrucoes() {
    // Remover texto de instruções
    textAlign(LEFT);
    fill(255);
    noStroke();
    rect(0, 0, width, height);
    background(bgImage);
  }
  

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

      
      AgainButton = createButton('Começar de novo');
      AgainButton.position(650, 530);
      AgainButton.size(130, 50);
      AgainButton.mousePressed(reiniciarJogo);
       
      SairButton = createButton('Sair');
      SairButton.position(AgainButton.width + 660, 530);
      SairButton.size(80, 50);
      SairButton.mousePressed(voltarAoInicio);

  }
  function changeNivel() {
    var selectedNivel = radioNivel.value();
    nivelAtual = niveis[selectedNivel];
    nivelTexto = selectedNivel;
    // Inicializa o jogo com o nível escolhido
    initializeGame(nivelAtual);
    
  }
  var tacos = {
    'Taco 1': {
        speedMultiplier: 0.5,
        precision: 1.0,
        distanceFactor: 1.0, // Alcance normal
    },
    'Taco 2': {
        speedMultiplier: 0.8,
        precision: 0.9,
        distanceFactor: 1.2, // Alcance ligeiramente maior
    },
    'Taco 3': {
        speedMultiplier: 1.2,
        precision: 0.6,
        distanceFactor: 1.5, // Alcance significativamente maior
    }
};

function changeStick() {
  // Obtém o taco selecionado
  var selectedStick = radioSticks.value();
  
  // Exibe a seleção do taco para depuração
  console.log('Taco selecionado:', selectedStick);
  
  // Obtém as características do taco selecionado
  var taco = tacos[selectedStick];
  
  // Atualize as velocidades de xSpeed e ySpeed com o multiplicador de velocidade do taco
  xSpeed *= taco.speedMultiplier;
  ySpeed *= taco.speedMultiplier;

  // Define que um taco foi selecionado
  tacoSelecionado = true;
}


function mousePressed() {
  // Verifica se o clique ocorreu na área dos botões de opção
  var radioX = radioSticks.elt.offsetLeft;
  var radioY = radioSticks.elt.offsetTop;
  var radioWidth = radioSticks.elt.offsetWidth;
  var radioHeight = radioSticks.elt.offsetHeight;

  if (mouseX >= radioX && mouseX <= radioX + radioWidth && mouseY >= radioY && mouseY <= radioY + radioHeight) {
      return;
  }

  

  // Verifica se o clique está próximo à bola de golfe
  if (collidePointEllipse(mouseX, mouseY, x, y, 75, 75)) {
      // Calcula a distância entre o clique e a bola
      var strokeX = abs(mouseX - x);
      var strokeY = abs(mouseY - y);
      strokeDistance = sqrt(strokeX * strokeY);

      // Obtém o taco selecionado
      var selectedStick = radioSticks.value();

      // Obtém as características do taco selecionado
      var taco = tacos[selectedStick];

      // Calcula o fator de velocidade com base no taco selecionado
      var calculatedXSpeed = (x - mouseX) / 10 * taco.speedMultiplier;
      var calculatedYSpeed = (y - mouseY) / 10 * taco.speedMultiplier;

      // Adiciona variação às velocidades com base na precisão do taco
      var variationX = (Math.random() * 2 - 1) * (1 - taco.precision);
      var variationY = (Math.random() * 2 - 1) * (1 - taco.precision);

      // Ajusta as velocidades com a variação e o fator de distância
      xSpeed = (calculatedXSpeed + calculatedXSpeed * variationX) * taco.distanceFactor;
      ySpeed = (calculatedYSpeed + calculatedYSpeed * variationY) * taco.distanceFactor;

      // Incrementa o contador de tacadas
      strokes++;

      // Exibe as velocidades calculadas para depuração
      console.log("Velocidades calculadas: ", xSpeed, ySpeed);
     
      // Toca o som do taco selecionado
      if (tacoSounds[selectedStick]) {
          tacoSounds[selectedStick].play();
      }
      
  }
}
