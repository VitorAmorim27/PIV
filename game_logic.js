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
  function voltarMenuInicial() {
    jogoIniciado = false;
  
    // Remover todos os elementos de instruções
    voltarButton.remove();
    // Criar elementos do menu inicial novamente
    criarMenuInicial();
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
  }
  function changeNivel() {
    var selectedNivel = radioNivel.value();
    nivelAtual = niveis[selectedNivel];
    nivelTexto = selectedNivel;
    // Inicializa o jogo com o nível escolhido
    initializeGame(nivelAtual);
    
  }
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