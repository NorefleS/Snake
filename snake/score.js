class Score {
    constructor() {
        this._score = 0;
        this.bestScore = localStorage.getItem(".bestScore") || 0;
        this.drawScore();
    }

    // Сохранение лучшего результата очков
    saveScore() {
        if (this._score > this.bestScore) {
            this.bestScore = this._score;
            localStorage.setItem(".bestScore", this.bestScore);
            this.drawScore();
        }
    }
    // Отрисовка текущего и лучшего результатов
    drawScore() {
        this.currentScoreElement = document.querySelector(".currentScore");
        this.bestScoreElement = document.querySelector(".bestScore");

        this.currentScoreElement.innerText = `Текущий счёт: ${this._score}`;
        this.bestScoreElement.innerText = `Лучший счёт: ${this.bestScore}`;
    }
    // Увеличение очков
    increase() {
        this._score += 1;
        this.drawScore();
    }
    // Сброс очков
    reset() {
        this._score = 0;
        this.drawScore();
    }
}

export default Score;