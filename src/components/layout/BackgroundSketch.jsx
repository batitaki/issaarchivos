import React, { useState } from 'react';
import Sketch from 'react-p5';

const BackgroundSketch = () => {
  // Estado para almacenar las coordenadas anteriores del mouse
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  // Estado para almacenar los círculos dibujados
  const [circles, setCircles] = useState([]);

  // Función setup para inicializar el sketch
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight * 6).parent(canvasParentRef);
    p5.background(255);
  };

  // Función draw para dibujar en el sketch
  const draw = (p5) => {
    p5.background(250);

    // Dibujar todos los círculos
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      p5.fill(0, 0, 255); // Color azul
      drawStar(p5, circle.x, circle.y, 7, 17, 7); // Dibujar estrella de 6 puntas
      circle.x += circle.speedX;
      circle.y += circle.speedY;
    }

    // Eliminar círculos que estén muy lejos
    setCircles(circles.filter(circle => p5.dist(circle.x, circle.y, p5.mouseX, p5.mouseY) < 100));

    // Dibujar un nuevo círculo si el mouse se ha movido
    if (p5.mouseX !== prevX || p5.mouseY !== prevY) {
      setPrevX(p5.mouseX);
      setPrevY(p5.mouseY);
      setCircles([...circles, { x: p5.mouseX, y: p5.mouseY, speedX: p5.random(-2, 2), speedY: p5.random(-2, 2) }]);
    }
  };

// Función para dibujar una estrella de n puntas
const drawStar = (p5, x, y, radius1, radius2, npoints) => {
    let angle = p5.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p5.beginShape();
    for (let a = 0; a < p5.TWO_PI; a += angle) {
        // Selecciona un color aleatorio de la paleta de azules y celestes
        let fillColor = p5.color(p5.random(100, 180), p5.random(150, 255), p5.random(200, 255));
        p5.fill(fillColor);

        let sx = x + p5.cos(a) * radius2 / 2; // Reducimos el radio a la mitad
        let sy = y + p5.sin(a) * radius2 / 2; // Reducimos el radio a la mitad
        p5.vertex(sx, sy);

        // Selecciona otro color aleatorio para el siguiente vértice
        fillColor = p5.color(p5.random(100, 180), p5.random(150, 255), p5.random(200, 255));
        p5.fill(fillColor);

        sx = x + p5.cos(a + halfAngle) * radius1 / 2; // Reducimos el radio a la mitad
        sy = y + p5.sin(a + halfAngle) * radius1 / 2; // Reducimos el radio a la mitad
        p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
};

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default BackgroundSketch;
