// Exporta a classe Player para ser usada no index.js
export class Player {
    constructor(context) { // Recebe o contexto do canvas como parâmetro
        this.c = context;
        this.jump = 2; // Quantidade de pulos disponíveis
        this.speed = 10; // Velocidade do jogador

        // Define a posição inicial do jogador
        this.position = {
            x: 100,
            y: 10 
        };
        
        // Define a velocidade inicial do jogador
        this.velocity = {
            x: 0,
            y: 1
        };
        
        this.width = 60; // Largura do jogador
        this.height = 60; // Altura do jogador
    }

    // Desenha o jogador no canvas
    draw() {
        this.c.fillStyle = "red";
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // Atualiza a posição do jogador
    update(gravity, keys, verifyJump, canvas) {
        this.velocity.x = 0;
        this.velocity.y += gravity;

        // Movimentação horizontal
        if (keys["ArrowRight"] || keys["KeyD"]) {
            this.velocity.x = this.speed;
        }
        if (keys["ArrowLeft"] || keys["KeyA"]) {
            this.velocity.x = -this.speed;
        }
        
        // Pulo
        if ((keys["Space"] || keys["ArrowUp"]) && verifyJump()) {
            this.velocity.y = -this.speed * 2;
        }

        // Atualiza a posição do jogador
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Impedir que o jogador saia da tela
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > canvas.width) this.position.x = canvas.width - this.width;
        if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0;
            this.jump = 2; // Reseta o número de pulos
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
    }
}
