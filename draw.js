function draw() {
    if (jogoIniciado) {
        // Se o jogo já foi iniciado, desenhe o jogo
        desenharJogo();
    } 
}


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
   
      // Zera as velocidades da bola
    xSpeed = 0;
    ySpeed = 0;
    fill(255); 
    textSize(32);
    text('Ganhaste!', width / 2  - 80, height / 2 - 200);
   
    radioNivel.style('display', 'block');
 

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
    text(nivelTexto, 420, 30);
  
    // Verifica se o nível atual é o 'Nivel 1' e desenha uma elipse azul
    if (nivelTexto === 'Nivel 1') {
      fill(0, 0, 255); 
      noStroke();
      ellipse(350, 350, 180, 80);
    }
    if (tacoSelecionado) {
      // Verifica se há um taco selecionado
      var selectedStick = radioSticks.value();
      if (!selectedStick) {
        // Se não houver taco selecionado, exibe um alerta
        fill(255); 
        textSize(16);
       
        text('Por favor, selecione um taco primeiro.', width / 2 - 150, height - 50);
      }
    }
    if (xSpeed === 0 && ySpeed === 0) {
      // Desenha um círculo ao redor da bola para indicar a área de clique
      stroke(255, 0, 0);
      strokeWeight(2);
      noFill();
      ellipse(x, y, 75);
    }
  
    // Verifica se um taco foi selecionado e se a mensagem de seleção de taco deve ser exibida
  
  }