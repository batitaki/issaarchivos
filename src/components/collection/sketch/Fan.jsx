import React, { useState } from "react";
import Sketch from "react-p5";
import particleImage from "../../../assets/azul.png";

export default () => {
  const [particles, setParticles] = useState([]);
  let prevMouseX = 0;
  let prevMouseY = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(250);
    p5.noFill();

    // Dibujar y actualizar partículas
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.update(p5);
      particle.display(p5);
      // Eliminar partícula si ha desaparecido
      if (particle.isDead()) {
        particles.splice(i, 1);
      }
    }

    // Crear partícula en la posición del mouse si se está moviendo
    if (prevMouseX !== p5.mouseX || prevMouseY !== p5.mouseY) {
      if (particles.length < 50) {
        const particle = new Particle(p5, p5.mouseX, p5.mouseY);
        particles.push(particle);
      }
      prevMouseX = p5.mouseX;
      prevMouseY = p5.mouseY;
    }
  };

  class Particle {
    constructor(p5, x, y) {
      this.position = p5.createVector(x, y);
      this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
      this.acceleration = p5.createVector();
      this.maxSpeed = 3;
      this.maxForce = 0.05;
      this.radius = p5.random(10, 40); // Tamaño aleatorio
      this.alpha = 255; // Opacidad inicial
      // Carga de la imagen de la partícula
      this.particleImg = p5.loadImage(particleImage);
      // Calcular el número de ciclos de dibujo para 2 segundos
      this.lifespan = 30; // 60 cuadros por segundo * 2 segundos
    }

    update(p5) {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      // Disminuir la opacidad con el tiempo
      this.alpha -= 255 / this.lifespan;
    }

    display(p5) {
      // Dibujar la imagen de la partícula con opacidad
      p5.tint(255, this.alpha);
      p5.imageMode(p5.CENTER);
      p5.image(this.particleImg, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
      p5.noTint();
    }

    isDead() {
      return this.alpha <= 0; // La partícula desaparece cuando la opacidad es menor o igual a 0
    }
  }

  return <Sketch setup={setup} draw={draw} />;
};
