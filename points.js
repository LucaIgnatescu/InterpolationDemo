drawCircle = (program, xCoord, yCoord, name) => {
  let circlePoints = [];

  for (let i = 0; i <= NUM_VERTICES_PER_CIRCLE; i++) { //Calculate circle points
    let point = [
      Math.cos(((2 * Math.PI) / NUM_VERTICES_PER_CIRCLE) * i) * //Rotate
      POINT_SCALE * //Scale
      RESOLUTION + //Adjust for resolution
      xCoord,
      Math.sin(((2 * Math.PI) / NUM_VERTICES_PER_CIRCLE) * i) * POINT_SCALE + //Rotate and scale
      yCoord,
    ];
    circlePoints.push(point[0], point[1]);
  }

  let buffer = gl.createBuffer(); //Prepare buffer

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circlePoints), gl.STATIC_DRAW); // Buffer vertices

  //Prepare attribute 
  let positionLocation = gl.getAttribLocation(program, "position");

  gl.enableVertexAttribArray(positionLocation);

  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, circlePoints.length / 2); //Draw circle
  if (name) { //Add label if necessary
    ctx.fillText(
      name,
      ((xCoord + 1) * WIDTH) / 2 + textOffset,
      ((-yCoord + 1) * HEIGHT) / 2 - textOffset
    );
  }
};

drawPoints = (points) => {
  //Begin boilerplate
  const vertexShaderText = `
precision mediump float;
attribute vec2 position;

void main () {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fragmentShaderText = `
precision mediump float;
void main () {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling vertex shader!",
      gl.getShaderInfoLog(vertexShader)
    );
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling fragment shader!",
      gl.getShaderInfoLog(fragmentShader)
    );
    return;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
    return;
  }
  //End of webgl boilerplate 

  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height); //Clear text canvas

  drawGrid(); //Draw the grid (in grid.js)

  gl.useProgram(program); // load point program


  for (let i = 0; i < points.length; i += 3) {
    drawCircle(program, points[i], points[i + 1], points[i + 2]); //Draw every point
  }



  // gl.clearColor(0.4, 0.7, 0.7, 1);

  // gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);


};
