function desenharBandeira() {
    // Defina a cor da bandeira (vermelho)
    fill(255, 0, 0);
  
    // Defina a cor da haste (preto)
    stroke(255);
  
    // Desenhe a haste da bandeira
    line(holeX, holeY , holeX, holeY - 70);
  
    // Desenhe o triângulo da bandeira
    beginShape();
    stroke(0);
    vertex(holeX, holeY - 70);
    vertex(holeX + 35, holeY - 55);
    vertex(holeX, holeY - 40);
    endShape(CLOSE);
  }

  var obstaculos = {
    'Nivel 1': [
        { tipo: 'quadrado', x: 200, y: 150, size: 50 },
        { tipo: 'quadrado', x: 500, y: 200, size: 50 },
        { tipo: 'quadrado', x: 600, y: 450, size: 50 },
        { tipo: 'elipse', x: 350, y: 350, width: 180, height: 80 },
        
    ],
    'Nivel 2': [
        
        { tipo: 'circulo', x: 300, y: 300, radius: 30 },
        { tipo: 'quadrado', x: 400, y: 150, size: 50 },
        { tipo: 'quadrado', x: 800, y: 200, size: 50 },
        { tipo: 'quadrado', x: 600, y: 350, size: 100 },
        { tipo: 'quadrado', x: 150, y: 350, size: 55 },
        { tipo: 'circulo', x: 300, y: 300, radius: 30 },
    ],
    'Nivel 3': [
        
         { tipo: 'retangulo', x: 30, y: 250, width: 600, height: 30 },
         { tipo: 'retangulo', x: 650, y: 450, width: 150, height: 75 },
         { tipo: 'retangulo', x: 200, y: 350, width: 500, height: 30 },
         { tipo: 'retangulo', x: 700, y: 200, width: 100, height: 50 }
    ],
    
};

function desenharObstaculos(nivelAtual) {
  if (obstaculos[nivelAtual]) {
      var obs = obstaculos[nivelAtual];
      
      for (var i = 0; i < obs.length; i++) {
          var obstaculo = obs[i];
          if (obstaculo.tipo === 'quadrado') {
              fill(240, 230, 140);
              rect(obstaculo.x, obstaculo.y, obstaculo.size, obstaculo.size);
          } else if (obstaculo.tipo === 'circulo') {
              fill(102, 0, 204);
              ellipse(obstaculo.x, obstaculo.y, obstaculo.radius * 2);
          } else if (obstaculo.tipo === 'triangulo') {
              fill(255, 0, 0);
             
              triangle(
                  obstaculo.x, obstaculo.y,
                  obstaculo.x - obstaculo.base / 2, obstaculo.y + obstaculo.height,
                  obstaculo.x + obstaculo.base / 2, obstaculo.y + obstaculo.height
              );
          } else if (obstaculo.tipo === 'elipse') {
           
              fill(0, 0, 255); 
              noStroke(); 
              ellipse(obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
          } else if (obstaculo.tipo === 'retangulo') {
            fill(255, 100, 100); // cor para retângulo
            rect(obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
        }
      }
  }
}
function collideRect2(ballX, ballY, rectX, rectY, rectWidth, rectHeight) {
  // Verifica se as coordenadas da bola (ballX, ballY) estão dentro do retângulo
  return (
      ballX > rectX &&  // Verifica se a bola está à direita da borda esquerda do retângulo
      ballX < rectX + rectWidth &&  // Verifica se a bola está à esquerda da borda direita do retângulo
      ballY > rectY &&  // Verifica se a bola está abaixo da borda superior do retângulo
      ballY < rectY + rectHeight  // Verifica se a bola está acima da borda inferior do retângulo
  );
}
  
function collideEllipse(ballX, ballY, ellipseX, ellipseY, width, height) {

  // Normaliza as coordenadas
  const normalizedX = (ballX - ellipseX) / (width / 2);
  const normalizedY = (ballY - ellipseY) / (height / 2);
  
  // Verifica se o ponto normalizado está dentro da elipse
  const distance = (normalizedX ** 2) + (normalizedY ** 2);
  return distance <= 1;
}
  // Função para verificar colisão entre a bola e um quadrado
  function collideRect(ballX, ballY, rectX, rectY, rectSize) {
    return (
      ballX > rectX &&
      ballX < rectX + rectSize &&
      ballY > rectY &&
      ballY < rectY + rectSize
    );
 
  }
  function collideTriangle(ballX, ballY, x1, y1, x2, y2, x3, y3) {
    // Função para verificar se o ponto (ballX, ballY) está dentro do triângulo definido por (x1, y1), (x2, y2) e (x3, y3)
    function sign(x, y, x1, y1, x2, y2) {
        return (x - x2) * (y1 - y2) - (x1 - x2) * (y - y2);
    }
    
    var b1 = sign(ballX, ballY, x1, y1, x2, y2) < 0.0;
    var b2 = sign(ballX, ballY, x2, y2, x3, y3) < 0.0;
    var b3 = sign(ballX, ballY, x3, y3, x1, y1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
}
function collideCircle(ballX, ballY, circleX, circleY, radius) {
  // Calcula a distância entre a bola e o centro do círculo
  var distance = dist(ballX, ballY, circleX, circleY);
  return distance <= radius + 7.5; // 7.5 é o raio da bola (metade do diâmetro de 15)
}
  