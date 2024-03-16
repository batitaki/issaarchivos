

import React from "react";
import Sketch from "react-p5";

export default () => {
  let x = 50;
  let y = 50;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(10, 20, 30);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 200; i++) {
      p5.push();
      p5.rotate(p5.sin(p5.frameCount + i) * 90000);

      const r = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 255);
      const g = p5.map(p5.sin(p5.frameCount * 2), -1, 1, 50, 255);
      const b = p5.map(p5.sin(p5.frameCount * 4), -1, 1, 50, 255);

      p5.stroke(r, g, b);
      p5.rect(0, 0, 600 - i * 3, 600 - i / 3, 300 - i);

      p5.pop();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};


