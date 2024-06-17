class Apple {
    constructor(snake) {
        this.snake = snake;
        this.getApple();
    }
    //Отрисовка яблока в полученной позиции
    getApple() {
        this.getNewCoordinates();
        this.food = document.querySelector(`[data-posX = '${this._posX}'][data-posY = '${this._posY}']`);
        this.food.classList.add("apple");      
    }
    // Получение позиции для яблока
    getNewCoordinates() {
        
        let isOnSnake;
        do {
            isOnSnake = false;
            this._posX = Math.round(Math.random() * (10 - 1) + 1);
            this._posY = Math.round(Math.random() * (10 - 1) + 1);

            this.snake.forEach(segment => {
                if (segment.getAttribute('data-posX') == this._posX && segment.getAttribute('data-posY') == this._posY) {
                    isOnSnake = true;
                }
            });
        } while (isOnSnake);
    }
}

export default Apple;