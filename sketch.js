// Define variables for the golf hole's x and y position, the golf ball's x and y position, the speed of the golf ball, and the number of strokes:
var holeX
var holeY
var x
var y
var xSpeed
var ySpeed
var strokes

// Define variables for strokeDistance and counter to control how far the ball travels for each stroke:
var counter
var strokeDistance

// Set the coordinates for the golf hole to a random location on the canvas, set the coordinates for the golf ball to a random location on the canvas, set the initial speed of the golf ball to 0, set the counter and strokeDistance to 0, and set the number of strokes to 0:
function setup() {
  createCanvas(400, 400);
  holeX = random(50,350)
  holeY = random(50,350)
  x = random(50,350)
  y = random(50,350)
  xSpeed = 0
  ySpeed = 0
  counter = 0
  strokeDistance = 0
  strokes = 0
}

function draw() {
  // Set the background to green:
  background(0,220,0);
  // Keep the hole in its current location:
  fill(0,0,0)
  ellipse(holeX,holeY,30)
  // Move the golf ball toward the hole:
  fill(255,255,255)
  ellipse(x, y, 20)
  
  // If the golf ball lands in the hold, stop it, tell the player they win, and display the number of strokes:
  if(abs(x - holeX) <= 5 && abs(y - holeY) <= 5){
    xSpeed = 0
    ySpeed = 0
    fill(0,0,255)
    textSize(32);
    text('YOU WIN!', 10, 30);
    if(strokes == 1){
      textSize(32);
      text('Hole in One!', 10, 70);
    } else {
      textSize(32);
      text(strokes + ' strokes!', 10, 70);
    } 
  
  // Limit the the golf ball's movement to 10 "steps" for every pixel of strokeDistance:
  } else if(counter > 10*strokeDistance){
    // Stop the ball, and set the counter back to 0:
    xSpeed = 0
    ySpeed = 0
    counter = 0    
    
  // If the golf ball comes close to an edge, stop it:
  } else if(x <= 30 || y <= 30 || x >= width - 30 || y >= height - 30){
    // Stop the ball:
    xSpeed = 0
    ySpeed = 0
    // Bounce the ball off the edge:
    if(x >= width - 30){
      x = x - 1
    }
    if(y >= height - 30){
      y = y - 1
    }
    if(x <= 30){
      x = x + 1
    }
    if(y <= 30){
      y = y + 1
    }
  
  // Otherwise, move the golf ball at a rate of xSpeed in the x direction and ySpeed in the y direction toward the hole, and increase the counter by 1:
  } else {
      if(strokeDistance > 0){
        counter++
      }
      console.log(strokeDistance)
      console.log(counter)
      x = x + xSpeed
      y = y + ySpeed
  }
}

// When the mouse is clicked, move the ball in the opposite direction, and increase the number of strokes by 1:
function mousePressed(){
  if(collidePointEllipse(mouseX,mouseY,x,y,75,75)){
    // Determine the distance from the mouse click and the center of the golf ball:
    var strokeX = abs(mouseX - x)
    var strokeY = abs(mouseY - y)
    strokeDistance = sqrt(strokeX*strokeX + strokeY*strokeY)
    // Set the speed:
    xSpeed = (x - mouseX)/10
    ySpeed = (y - mouseY)/10
    strokes++
  }   
}