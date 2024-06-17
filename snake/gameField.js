class GameField {

    constructor() {
        this.field = document.querySelector(".fieldGame");
        this.drawField();
    }
    // Отрисовка игрового поля
    drawField() {
        let cX = 0, cY = 1;
        
        for (let i = 0; i < 100; i++) {
            cX++;

            if (cX > 10) {
                cX = 0;
                cX++;
                cY++;
            }

            this.cell = document.createElement("div");
            this.field.appendChild(this.cell);
            this.cell.classList.add("cell");
            this.cell.setAttribute("data-posX", cX);
            this.cell.setAttribute("data-posY", cY);
        }
    }
}

export default GameField;