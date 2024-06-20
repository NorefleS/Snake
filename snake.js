import Apple from "./apple.js";
import Score from "./score.js";

class Snake {
    constructor() {
        this.speed = 200;
        this.count = 5;
        this.gameStart = document.querySelector('.gameStart');
        this.gameOver = document.querySelector('.gameOver');
        this.buttonOver = document.querySelector('.restartGame');
        this.buttonStart = document.querySelector('.startGame');
        this.spawnSnake();
        this.getSnake();
        this.startSnake();
        this.control();
        this.apple = new Apple(this.snake);
        this.score = new Score();
        this.restart();
    }

    // Старт игры
    startSnake() {
        this.buttonStart.addEventListener('click', () => {
            this.gameStart.style.display = 'none';
            this.interval = setInterval(this.move.bind(this), 200)
        })
    }
    // Начальная позиция змейки
    spawnSnake() {
        this.posX = 5;
        this.posY = 5;
        this.direction = 'right';
        this.head = document.querySelector(`[data-posX = '${this.posX}'][data-posY = '${this.posY}']`);
        this.body = document.querySelector(`[data-posX = '${this.posX-1}'][data-posY = '${this.posY}']`);
        this.snake = [this.head, this.body];
    }
    // Получение змейки
    getSnake() {
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                segment.classList.add('snakeHead');
            } else {
                segment.classList.add('snakeBody');
            }
        });
    }
    // Отрисовка
    drawSnake() {
        this.snake.forEach(segment => {
            segment.classList.remove('snakeHead', 'snakeBody');
        });

        this.snake.forEach((segment, index) => {
            if (index === 0) {
                segment.classList.add('snakeHead');
            } else {
                segment.classList.add('snakeBody');
            }
        });
    }
    // Движение
    move() {
            switch(this.direction) {
                case 'up':
                    this.posY--;
                    break;
                case 'down':
                    this.posY++;
                    break;
                case 'right':
                    this.posX++;
                    break;
                case 'left':
                    this.posX--;
                    break;
            }
            
            if (this.posY < 1 || this.posY > 10 || this.posX < 1 || this.posX > 10 || this.snake[0].classList.contains('snakeBody')) {
                this.death();
            } else {
                this.newHead = document.querySelector(`[data-posX = '${this.posX}'][data-posY = '${this.posY}']`);
                this.snake.unshift(this.newHead);
                this.drawSnake();
                this.update();
            }
    }

    // Метод обновления змейки и позиции яблока
    update() {
        if (this.apple.food.getAttribute('data-posX') == this.snake[0].getAttribute('data-posX') && 
            this.apple.food.getAttribute('data-posY') == this.snake[0].getAttribute('data-posY')) {
            this.score.drawScore();
            this.score.increase();
            this.score.saveScore();
            this.apple.food.classList.remove('apple');
            this.apple.getApple();
            
            if (this.score._score >= this.count) { // Увеличение скорости через каждые 10 очков
                this.speed = this.speed - 10;
                this.count = this.count + 10;
            }

            clearInterval(this.interval);
            this.interval = setInterval(this.move.bind(this), this.speed);
        } else {
            const tail = this.snake.pop();
            tail.classList.remove('snakeBody');
        }
    }
    // Смерть/Конец игры
    death() {
        this.score._score = 0;
        clearInterval(this.interval);
        this.snake.forEach(segment => {
            segment.classList.remove('snakeHead', 'snakeBody');
        });
        this.gameOver.style.display = 'flex';
    }
    // Перезапуск игры
    restart() {
        this.buttonOver.addEventListener('click', () => {
            this.score.drawScore();
            this.gameOver.style.display = 'none';
            this.spawnSnake();
            this.getSnake();
            this.interval = setInterval(this.move.bind(this), 200);
        })
    }
    // Управление
    control() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case "KeyW":
                    if (this.direction != "down")
                        this.direction = "up";
                    break;
                case "KeyS":
                    if (this.direction != "up") 
                        this.direction = "down";
                    break;
                case "KeyA":
                    if (this.direction != "right")
                        this.direction = "left";
                    break;
                case "KeyD":
                    if (this.direction != "left")
                        this.direction = "right";
                    break;
            }
        });
    }
}

export default Snake;