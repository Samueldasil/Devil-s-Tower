// Importa a classe Player
import { Player } from "./classes/player.js";

// Seleção do canvas e contexto
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Configuração do tamanho do canvas
canvas.width = 64 * 16;
canvas.height = 64 * 9;

class Sprite {
    constructor({ position }) {
        this.position = position;
        this.image = new Image();
        this.image.src = './img/Map.png';

        // Garante que a imagem foi carregada antes de desenhar
        this.image.onload = () => {
            this.loaded = true;
        };

        this.loaded = false; // Começa como falso
    }

    draw() {
        if (this.loaded) {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
    }
}


// Define o fundo externo do corpo como preto
document.body.style.backgroundColor = "black";


// Variáveis globais
const keys = {}; // Armazena teclas pressionadas
let jumptime = 0; // Controla o tempo do pulo
const gravity = 0.9; // Define a gravidade


const Map = new Sprite({

    position: {
        x: 0,
        y: 0
}
})

// Criação do jogador
const player = new Player(c);


/**
 * Verifica se as condições para o pulo foram atendidas
 */
function verifyJump() {
    // Verifica se o pulo duplo é possível
    if (player.jump > 0 && Date.now() - jumptime > 300) {
        player.jump--;  // Diminui a quantidade de pulos disponíveis
        jumptime = Date.now();  // Atualiza o tempo do pulo
        return true;  // Permite o pulo
    }

    // Permite o segundo pulo se o jogador ainda está no ar e em condições de pular
    if (player.position.y + player.height + player.velocity.y >= canvas.height - 140 && player.jump === 2) {
        player.jump--;  // Diminui para um pulo
        return true;  // Permite o pulo
    }

    return false;  // Caso contrário, não permite o pulo
}


// Eventos de teclado para movimentação
document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

/**
 * Loop principal do jogo
 */
function animate() {
    // Define a área do jogo como branca novamente a cada frame
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    Map.draw() // Desenha o mapa
    player.update(gravity, keys, verifyJump, canvas); // Atualiza o jogador
    player.draw(); // Desenha o jogador

   

    requestAnimationFrame(animate); // Continua o loop
}

// Inicia o loop de animação
animate();
