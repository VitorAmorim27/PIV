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

var quadrados = [
    { x: 200, y: 150, size: 50 },
    { x: 500, y: 200, size: 50 },
    { x: 600, y: 450, size: 50 },
  ];
  
  function desenharQuadrados() {
    // Defina a cor de preenchimento para os quadrados (você pode ajustar conforme desejado)
    fill(240,230,140); // Cor vermelha para os quadrados
    
    // Itere sobre os quadrados e desenhe cada um
    for (var i = 0; i < quadrados.length; i++) {
      var quad = quadrados[i];
      // Desenhe um retângulo com base na posição (x, y) e tamanho do quadrado
      rect(quad.x, quad.y, quad.size, quad.size);
    }
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
  