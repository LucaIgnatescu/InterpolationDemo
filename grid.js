drawGrid = () => {
  //Begin Boilerplate
  const gridVertexShaderText = `
  precision mediump float;
  attribute vec2 position;
  
  void main () {
      gl_Position = vec4(position, 0.0, 1.0);
  }
  `;

  const gridFragmentShaderText = `
  precision mediump float;
  void main () {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.6);
  }
  `;
  let gridVertexShader = gl.createShader(gl.VERTEX_SHADER);
  let gridFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(gridVertexShader, gridVertexShaderText);
  gl.shaderSource(gridFragmentShader, gridFragmentShaderText);

  gl.compileShader(gridVertexShader);
  if (!gl.getShaderParameter(gridVertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling vertex shader!",
      gl.getShaderInfoLog(gridVertexShader)
    );
    return;
  }

  gl.compileShader(gridFragmentShader);
  if (!gl.getShaderParameter(gridFragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling fragment shader!",
      gl.getShaderInfoLog(gridFragmentShader)
    );
    return;
  }

  let gridProgram = gl.createProgram();

  gl.attachShader(gridProgram, gridVertexShader);
  gl.attachShader(gridProgram, gridFragmentShader);

  gl.linkProgram(gridProgram);

  if (!gl.getProgramParameter(gridProgram, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(gridProgram));
    return;
  }

  gl.validateProgram(gridProgram);
  if (!gl.getProgramParameter(gridProgram, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(gridProgram));
    return;
  }


  gl.useProgram(gridProgram);

  //End of webgl boilerplate

  let gridlines = []

  for (i = 1; i < gridX.length; i++) { //Prepare grid endpoints
    gridlines.push(gridX[i], -1, gridX[i], 1);
    gridlines.push(-1, gridY[i], 1, gridY[i]);
  }

  console.log(gridlines);

  //Create a buffer for the grid
  let gridBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);


  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridlines), gl.STATIC_DRAW);


  //Create a vertex attribute for the grid
  let gridPosition = gl.getAttribLocation(gridProgram, "position");

  gl.enableVertexAttribArray(gridPosition);
  gl.vertexAttribPointer(gridPosition, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

  //Draw the grid

  // gl.clearColor(0.5, 0.5, 0.5, 0.9);

  // Enable the depth test
  // gl.enable(gl.DEPTH_TEST);

  // // Clear the color and depth buffer
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the view port
  // gl.viewport(0, 0, WIDTH, HEIGHT);

  // Draw the grid
  gl.drawArrays(gl.LINES, 0, gridlines.length/2);

  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind buffer

}