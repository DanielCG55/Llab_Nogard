# Dragon Ball Game

## Mi primer proyecto de [Core Code School](https://www.corecode.school/)

> [Click para fliparlo](https://danielcg55.github.io/dragon-ball-game/)

## Indice:

-   [LlabNogard](#Llab Nogard)
-   [Indice:](#indice)
    -   [1. Título del Juego:](#1-título-del-juego)
    -   [2. Imágenes y vídeos:](#2-imágenes-y-vídeos)
    -   [3. Motivación del proyecto:](#3-motivación-del-proyecto)
    -   [4. Acceso directo al juego:](#4-acceso-directo-al-juego)
    -   [5. Tabla de contenidos o índice:](#5-tabla-de-contenidos-o-índice)
    -   [6. Manual de instalación y deployment:](#6-manual-de-instalación-y-deployment)
    -   [7. Ejemplos de código:](#7-ejemplos-de-código)
    -   [8. Entornos de ejecución:](#8-entornos-de-ejecución)
    -   [9. Listado de paquetes y dependencias:](#9-listado-de-paquetes-y-dependencias)
    -   [10. Agradecimientos:](#10-agradecimientos)
    -   [11. Otras consideraciones:](#11-otras-consideraciones)

## 1. Título del Juego:

dragon-ball-game

## 2. Imágenes y vídeos:

![cellarena](https://user-images.githubusercontent.com/122054483/218276791-e9fd1494-e289-4495-b5f2-d3490c27b70c.png)

## 3. Motivación del proyecto:

Como fan de Dragon Ball desde pequeño, he querido crear este juego a modo de homenaje.

## 4. Instrucciones del juego:

Usar las flechas de dirección para mover al personaje.
Pulsar la tecla "espacio" para disparar.

## 5. Manual de instalación y deployment:

```ts
Clone the repository:
    git clone https://github.com/DanielCG55/Llab_Nogard.git

Initiate npm:
    npm init

Or use this instead:
    npm init -y

Install dependencies:
    npm install

Execute the project:
    npm run dev

```

## 7. Ejemplos de código:

    constructor(props: InitialEnemyManagerProps) {
        super({ x: 800, y: 800 });
        this.ammoManager = props.ammoManager;
        this.dead = new Audio();
        this.dead.src = "celljr.wav";
        this.dead.volume = 1;

        let time = 100;
        let enemy: Enemy;
        let createEnemies = () => {
            for (let i = 1; i > 0; i--) {
                enemy = new Enemy({
                    position: {
                        x: Math.random() * (1000 - 600) + 600,
                        y: Math.random() * (500 - 100) + 100,
                    },
                    size: { w: 70, h: 70 },
                });
                this.enemies.push(enemy);
            }
        };

## 8. Entornos de ejecución:

-   [Visual Studio Code](https://code.visualstudio.com/Download)

## 9. Listado de paquetes y dependencias:

-   Node package manager: [npm](https://www.npmjs.com/)
-   To run the HTML: [Vite](https://vitejs.dev/)

-   Lenguajes de programación: [typescript](https://www.npmjs.com/package/typescript)
-   Otros paquetes de Node: [rimraf](https://www.npmjs.com/package/rimraf), [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
-   MDN [Api Canvas](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)

## 10. Agradecimientos:

## 11. Otras consideraciones:
