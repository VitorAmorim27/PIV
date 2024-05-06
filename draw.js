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
  stroke(255, 255, 255); 
  strokeWeight(2); 
  fill(255); 
  ellipse(x, y, 15);

  // Chama a função para desenhar a bandeira na posição do buraco
  desenharBandeira();
  
  // Verifica e desenha obstáculos com base no nível atual
  desenharObstaculos(nivelTexto);

  // Verifique colisões com obstáculos
  verificarColisoesObstaculos(nivelTexto);

 
  // Lógica para verificar se a bola de golfe caiu no buraco
  if (abs(x - holeX) <= 5 && abs(y - holeY) <= 5) {
      xSpeed = 0;
      ySpeed = 0;
      fill(255);
      textSize(32);
      text('Ganhaste!', width / 2 - 80, height / 2 - 200);
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

  // Adiciona o texto com as jogadas (strokes) e a distância
  fill(255);
  textSize(16);
  var distance = dist(x, y, holeX, holeY);
  text('Jogadas: ' + strokes, 15, 30);
  text('Distância: ' + distance.toFixed(2), 15, 60);

  // Adiciona o texto do nível selecionado
  fill(255);
  textSize(18);
  text(nivelTexto, 420, 30);

  // Verifica se há um taco selecionado
  if (tacoSelecionado) {
      var selectedStick = radioSticks.value();
      if (!selectedStick) {
          fill(255);
          textSize(16);
          text('Por favor, selecione um taco primeiro.', width / 2 - 150, height - 50);
      }
  }

  // Desenha um círculo ao redor da bola para indicar a área de clique
  if (xSpeed === 0 && ySpeed === 0) {
      stroke(255, 0, 0);
      strokeWeight(2);
      noFill();
      ellipse(x, y, 75);
  }
}

// Função para verificar colisões com obstáculos com base no nível atual
function verificarColisoesObstaculos(nivelAtual) {
  if (obstaculos[nivelAtual]) {
      var obs = obstaculos[nivelAtual];
      for (var i = 0; i < obs.length; i++) {
          var obstaculo = obs[i];
          var colisaoDetectada = false;

          if (obstaculo.tipo === 'quadrado') {
              colisaoDetectada = collideRect(x, y, obstaculo.x, obstaculo.y, obstaculo.size);
          } else if (obstaculo.tipo === 'circulo') {
              colisaoDetectada = collideCircle(x, y, obstaculo.x, obstaculo.y, obstaculo.radius);
          } else if (obstaculo.tipo === 'elipse') {
              colisaoDetectada = collideEllipse(x, y, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
          }else if (obstaculo.tipo === 'triangulo') {
            // Verifique a colisão com o triângulo
            colisaoDetectada = collideTriangle(x, y, obstaculo.x, obstaculo.y, obstaculo.x - obstaculo.base / 2, obstaculo.y + obstaculo.height, obstaculo.x + obstaculo.base / 2, obstaculo.y + obstaculo.height);
        }else if (obstaculo.tipo === 'retangulo') {
          // Verifique a colisão com o retângulo usando a função collideRect2
          colisaoDetectada = collideRect2(x, y, obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
      }
      

        if (colisaoDetectada) {
          // Posicione a bola para fora do obstáculo
          if (obstaculo.tipo === 'quadrado') {
              var dx = x - obstaculo.x;
              var dy = y - obstaculo.y;
              var distance = dist(x, y, obstaculo.x + obstaculo.size / 2, obstaculo.y + obstaculo.size / 2);
              x = obstaculo.x + obstaculo.size / 2 + (dx / distance) * (obstaculo.size / 2);
              y = obstaculo.y + obstaculo.size / 2 + (dy / distance) * (obstaculo.size / 2);
          } else if (obstaculo.tipo === 'circulo') {
              var dx = x - obstaculo.x;
              var dy = y - obstaculo.y;
              var distance = dist(x, y, obstaculo.x, obstaculo.y);
              x = obstaculo.x + (dx / distance) * (obstaculo.radius + 10);
              y = obstaculo.y + (dy / distance) * (obstaculo.radius + 10);
          } else if (obstaculo.tipo === 'elipse') {
              var dx = x - obstaculo.x;
              var dy = y - obstaculo.y;
              var distance = dist(x, y, obstaculo.x, obstaculo.y);
              x = obstaculo.x + (dx / distance) * (Math.max(obstaculo.width, obstaculo.height) / 2 + 15);
              y = obstaculo.y + (dy / distance) * (Math.max(obstaculo.width, obstaculo.height) / 2 + 15);
          } else if (obstaculo.tipo === 'triangulo') {
              // Lógica para ajustar a posição da bola para fora do triângulo
              var dx = x - obstaculo.x;
              var dy = y - obstaculo.y;
              var distance = Math.sqrt(dx ** 2 + dy ** 2);
              
              // Ajuste a posição da bola fora do triângulo
              // Ajuste os parâmetros conforme necessário
              x = obstaculo.x + (dx / distance) * (obstaculo.base / 2 + 45);
              y = obstaculo.y + (dy / distance) * (obstaculo.height / 2 + 45);
          }
          else if (obstaculo.tipo === 'retangulo') {
            // Obtenha as posições iniciais da bola com base no nível atual
            var posicoesIniciais = niveis[nivelAtual];
            var ballX = posicoesIniciais.ballX;
            var ballY = posicoesIniciais.ballY;
        
            // Reinicie a posição da bola para as posições iniciais
            x = ballX;
            y = ballY;
        
            // Zere as velocidades da bola
            xSpeed = 0;
            ySpeed = 0;
        }


          // Zere as velocidades da bola
          xSpeed = 0;
          ySpeed = 0;

          // Saia do loop após lidar com a colisão
          break;
      }
  }
}
}