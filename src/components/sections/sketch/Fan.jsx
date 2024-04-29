import React, { useState } from "react";
import Sketch from "react-p5";

export default () => {
  const [x, setX] = useState(3);
  const [y, setY] = useState(3);
  const [dragging, setDragging] = useState(false);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(250, 255, 250);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 111; i++) {
      p5.push();
      p5.rotate(p5.sin(p5.frameCount + i) * 500);

      const blueScale = p5.map(p5.sin(p5.frameCount * 4), -74, 7, 24, 74);

      p5.stroke(0, 0, blueScale);

      p5.circle(x, y, 300 - i * 3, 500 - i / 3, 300 - i);
    
 


      p5.pop();
    }
  };

  const mousePressed = (p5) => {
    const distance = p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY);
    if (distance < 750) {
      setDragging(true);
    }
  };

  const mouseReleased = () => {
    setDragging(false);
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      setX(p5.mouseX - p5.width / 2);
      setY(p5.mouseY - p5.height / 2);
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
      mouseDragged={mouseDragged}
    />
  );
};
