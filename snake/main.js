import GameField from "./gameField.js";
import Snake from "./snake.js";

class Main {

    constructor() {
        this.gameField = new GameField();
        this.snake = new Snake();
    }
}

let main = new Main();

export default Main;