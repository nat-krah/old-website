
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("snake-game");
    const ctx = canvas.getContext("2d");

    // Game state
    let box = 10; // size of one grid unit
    let score = 0;
    let speed = 50; 
    let direction = "RIGHT";
    let snake = [{ x: 10 * box, y: 10 * box }, {x : 9 * box, y: 10 * box}];
    let fruit = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    document.addEventListener("keydown", changeDirection);

    function changeDirection(event) {
        console.log(event.key);
        if (event.key === "w" && direction !== "DOWN" || event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (event.key === "a" && direction !== "RIGHT" || event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (event.key === "s" && direction !== "UP" || event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        else if (event.key === "d" && direction !== "LEFT" || event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        else if (event.key === "q") { clearInterval(game); alert("Game Over"); }
        else if (event.key === "e" && speed < 100) { speed += 5; resetLoop(); }
        else if (event.key === "f" && speed > 0) { speed -= 5; resetLoop(); }
    }

    function draw() {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "lime" : "green";
            ctx.fillRect(snake[i].x, snake[i].y, box,box);
        }

        // Draw fruit
        ctx.fillStyle = "red";
        ctx.fillRect(fruit.x, fruit.y, box, box);

        // Move snake
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        // Check collision with body or walls
        if (snakeX < 0 || snakeY < 0 ||
            snakeX >= canvas.width || snakeY >= canvas.height ||
            collision(snakeX, snakeY, snake)) {
            clearInterval(game);
            alert("Game Over! Final Score: " + score);
            return;
        }

        // Eat fruit
        if (snakeX === fruit.x && snakeY === fruit.y) {
            score++;
            fruit = {
                x: Math.floor(Math.random() * (canvas.width / box)) * box,
                y: Math.floor(Math.random() * (canvas.height / box)) * box
            };
        } else {
            snake.pop(); // remove tail
        }

        // New head
        let newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);

        // Update HUD
        document.getElementById("score").textContent = 
        `Score: ${score} | Speed: ${speed}`;
    }

    function collision(x, y, array) {
        for (let i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
        }
        return false;
    }

    // Game loop controller
    let game;
    function resetLoop() {
        clearInterval(game);
        let delay = 150 - speed; // faster with higher speed
        game = setInterval(draw, delay);
    }

    resetLoop();
});
