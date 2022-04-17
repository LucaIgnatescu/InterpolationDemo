// gl.clearColor(0.4, 0.7, 0.7, 1);

// gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);


drawPoints(points);

let mouseDown = false; //Is the mouse pressed

let position = []; //Store previous positions in drag motion

let prevPosition = []; //Store last position

recomputeCoordinates = (x, y) => { //Recompute coordinates based on current position
  for (i = 0; i < points.length; i += 3) {
    points[i] += x;
    points[i + 1] -= y;
  }
}

positionLogger = (event) => {
  webglCanvas.removeEventListener("mousemove", positionLogger);

  let currPosition = [ //Current position of camera based on drag mapped to webgl space
    ((event.clientX - WIDTH / 2) / WIDTH) * 2,
    ((event.clientY - HEIGHT / 2) / HEIGHT) * 2
  ];

  if (!equals(currPosition, prevPosition)) { //If position has changed redraw points
    recomputeCoordinates(currPosition[0] - prevPosition[0], currPosition[1] - prevPosition[1]);
    drawPoints(points);
    prevPosition = currPosition;
  }

  position.push(currPosition); 

  setTimeout(() => { //Delay on mousemove events
    if (mouseDown) {
      webglCanvas.addEventListener("mousemove", positionLogger);
    }
  }, 0);
};

clickVsDrag = () => { //Determine whether click or drag
  if (position.length == 1) {
    console.log("Click");
  } else {
    console.log("Drag");
  }
};

webglCanvas.onmousedown = (event) => { //Start listening for mousemove events
  mouseDown = true;
  prevPosition = [
    ((event.clientX - WIDTH / 2) / WIDTH) * 2,
    ((event.clientY - HEIGHT / 2) / HEIGHT) * 2];
  positionLogger(event);
};

webglCanvas.onmouseup = (event) => { //Stop listening for mousemove events
  mouseDown = false;
  webglCanvas.removeEventListener("mousemove", positionLogger);
  position = []; //Reset log of previous positions
};
