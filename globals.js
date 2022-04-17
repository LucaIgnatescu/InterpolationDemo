
let webglCanvas = document.getElementById("webgl-canvas");
let textCanvas = document.getElementById("text-canvas");

let gl = webglCanvas.getContext("webgl"); //WebGL canvas
let ctx = textCanvas.getContext("2d"); //Overlayed Canvas2D canvas to draw labels.


gl.lineWidth(0.5);


ctx.font = '15px arial';
textOffset = 5;

const WIDTH = webglCanvas.width;
const HEIGHT = webglCanvas.height;

const NUM_VERTICES_PER_CIRCLE = 10; //Number of triangles to be used to draw a point
const POINT_SCALE = 0.03; //Point size
const RESOLUTION = HEIGHT / WIDTH; //Adjust for mapping from screen space to webgl space

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b); //Compare two objects

const NUM_OF_GRID_LINES = 10;

let points = [ //Xcoord, Y coord, Label
  0, 0, 'A',
  0.5, 0.5, 'B'
] //Points for testing 

let gridX = [];
let gridY = []
//Compute X coordinates and Y coordinates for vertical and horizontal line ends
for (i = 0; i <= NUM_OF_GRID_LINES; i++) {  
  gridX.push(2*i/NUM_OF_GRID_LINES - 1);
  gridY.push(2*i/NUM_OF_GRID_LINES - 1);

}




