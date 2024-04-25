import React, { useState } from "react";
import Sketch from "react-p5";

import img1 from "../../../assets/panta2.png";
import img2 from "../../../assets/sweater.png";
import img3 from "../../../assets/maniqui.jpg";
import img4 from "../../../assets/campera2.png";
import img5 from "../../../assets/panta.png";
import img6 from "../../../assets/pollera.png";
import img7 from "../../../assets/sweater3.png";
import img8 from "../../../assets/campera.png";
import img9 from "../../../assets/panta-cuero.png";

export default () => {
  let imgA, imgB, imgC, imgD, imgE, imgF, imgI, imgG, imgH;

  let imgAX = 320,
    imgAY = 360,
    imgBX = 290,
    imgBY = 130,
    imgDX = 20,
    imgDY = 115,
    imgEX = 60,
    imgEY = 360,
    imgFX = 1207,
    imgFY = 380,
    imgIX = 960,
    imgIY = 130,
    imgCX = window.innerWidth / 2 - 100,
    imgCY = 50,
    imgGX = 1200,
    imgGY = 130,
    imgHX = 980,
    imgHY = 380;

  let offsetX = 0,
    offsetY = 0;
  let draggingImgA = false,
    draggingImgB = false,
    draggingImgD = false,
    draggingImgE = false,
    draggingImgF = false,
    draggingImgI = false,
    draggingImgG = false,
    draggingImgH = false;

  const preload = (p5) => {
    imgA = p5.loadImage(img1); // PANTALON DE JEAN
    imgB = p5.loadImage(img2); // SWEATER GRIS 1
    imgC = p5.loadImage(img3); // IMAGEN ESTATICA MANIQUI
    imgD = p5.loadImage(img4); // CAMPERA CUERO
    imgE = p5.loadImage(img5); // PANTALON GRIS
    imgF = p5.loadImage(img6); // POLLERA
    imgI = p5.loadImage(img7); // SWATER APRETADO
    imgG = p5.loadImage(img8); // CAMPERA AZUL
    imgH = p5.loadImage(img9); // PANTA CUERO
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );

    imgA.resize(200, 0); // PANTALON DE JEAN
    imgB.resize(250, 0); // SWEATER GRIS 1
    imgD.resize(255, 0); // CAMPERA CUERO
    // maniqui
    imgC.resize(250, 0); // IMAGEN ESTATICA MANIQUI
    imgE.resize(180, 0); // PANTALON GRIS
    imgF.resize(220, 0); // POLLERA
    imgI.resize(225, 0); // SWATER APRETADO
    imgG.resize(250, 0); // CAMPERA AZUL
    imgH.resize(185, 0); // PANTA CUERO
  };

  const draw = (p5) => {
    p5.background(255);

    if (draggingImgA) {
      imgAX = p5.mouseX + offsetX;
      imgAY = p5.mouseY + offsetY;
    }
    if (draggingImgB) {
      imgBX = p5.mouseX + offsetX;
      imgBY = p5.mouseY + offsetY;
    }
    if (draggingImgD) {
      imgDX = p5.mouseX + offsetX;
      imgDY = p5.mouseY + offsetY;
    }
    if (draggingImgE) {
      imgEX = p5.mouseX + offsetX;
      imgEY = p5.mouseY + offsetY;
    }
    if (draggingImgF) {
      imgFX = p5.mouseX + offsetX;
      imgFY = p5.mouseY + offsetY;
    }
    if (draggingImgI) {
      imgIX = p5.mouseX + offsetX;
      imgIY = p5.mouseY + offsetY;
    }
    if (draggingImgG) {
      imgGX = p5.mouseX + offsetX;
      imgGY = p5.mouseY + offsetY;
    }
    if (draggingImgH) {
      imgHX = p5.mouseX + offsetX;
      imgHY = p5.mouseY + offsetY;
    }

    p5.image(imgC, imgCX, imgCY);

    p5.image(imgA, imgAX, imgAY);

    p5.image(imgF, imgFX, imgFY);

    p5.image(imgE, imgEX, imgEY);

    p5.image(imgB, imgBX, imgBY);

    p5.image(imgI, imgIX, imgIY);

    p5.image(imgD, imgDX, imgDY);

    p5.image(imgG, imgGX, imgGY);

    p5.image(imgH, imgHX, imgHY);
  };

  const mousePressed = (p5) => {
    if (
      p5.mouseX > imgAX &&
      p5.mouseX < imgAX + imgA.width &&
      p5.mouseY > imgAY &&
      p5.mouseY < imgAY + imgA.height
    ) {
      draggingImgA = true;
      offsetX = imgAX - p5.mouseX;
      offsetY = imgAY - p5.mouseY;
    } else if (
      p5.mouseX > imgBX &&
      p5.mouseX < imgBX + imgB.width &&
      p5.mouseY > imgBY &&
      p5.mouseY < imgBY + imgB.height
    ) {
      draggingImgB = true;
      offsetX = imgBX - p5.mouseX;
      offsetY = imgBY - p5.mouseY;
    } else if (
      p5.mouseX > imgDX &&
      p5.mouseX < imgDX + imgD.width &&
      p5.mouseY > imgDY &&
      p5.mouseY < imgDY + imgD.height
    ) {
      draggingImgD = true;
      offsetX = imgDX - p5.mouseX;
      offsetY = imgDY - p5.mouseY;
    } else if (
      p5.mouseX > imgEX &&
      p5.mouseX < imgEX + imgE.width &&
      p5.mouseY > imgEY &&
      p5.mouseY < imgEY + imgE.height
    ) {
      draggingImgE = true;
      offsetX = imgEX - p5.mouseX;
      offsetY = imgEY - p5.mouseY;
    } else if (
      p5.mouseX > imgFX &&
      p5.mouseX < imgFX + imgF.width &&
      p5.mouseY > imgFY &&
      p5.mouseY < imgFY + imgF.height
    ) {
      draggingImgF = true;
      offsetX = imgFX - p5.mouseX;
      offsetY = imgFY - p5.mouseY;
    } else if (
      p5.mouseX > imgIX &&
      p5.mouseX < imgIX + imgI.width &&
      p5.mouseY > imgIY &&
      p5.mouseY < imgIY + imgI.height
    ) {
      draggingImgI = true;
      offsetX = imgIX - p5.mouseX;
      offsetY = imgIY - p5.mouseY;
    } else if (
      p5.mouseX > imgGX &&
      p5.mouseX < imgGX + imgG.width &&
      p5.mouseY > imgGY &&
      p5.mouseY < imgGY + imgG.height
    ) {
      draggingImgG = true;
      offsetX = imgGX - p5.mouseX;
      offsetY = imgGY - p5.mouseY;
    } else if (
      p5.mouseX > imgHX &&
      p5.mouseX < imgHX + imgH.width &&
      p5.mouseY > imgHY &&
      p5.mouseY < imgHY + imgH.height
    ) {
      draggingImgH = true;
      offsetX = imgHX - p5.mouseX;
      offsetY = imgHY - p5.mouseY;
    }
  };

  const mouseReleased = () => {
    draggingImgA = false;
    draggingImgB = false;
    draggingImgD = false;
    draggingImgE = false;
    draggingImgF = false;
    draggingImgI = false;
    draggingImgG = false;
    draggingImgH = false;
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
    />
  );
};
