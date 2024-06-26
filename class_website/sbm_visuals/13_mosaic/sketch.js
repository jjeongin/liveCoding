// this sketch shows how to use texture coordinates to create a fly's eye mosaic effect


// the shader variable
let camShader;

// the camera variable
let cam;


function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();


}

function draw() {


  // shader() sets the active shader with our shader
  shader(camShader);

  // send the camera and the resolution to the shader
  camShader.setUniform('tex0', cam);
  camShader.setUniform('resolution', [width, height]);
  camShader.setUniform('amount', map(mouseX,0,width,0,1));
  camShader.setUniform('power', map(mouseY,0,height,0,10));

  // rect gives us some geometry on the screen
  rect(0,0,width, height);


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
