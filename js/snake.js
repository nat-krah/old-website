// SNAKE GAME
const canvas = document.getElementById("snakeGame");
if (canvas) {
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake = [{ x: 9 * box, y: 9 * box }];
    let direction;
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    document.addEventListener("keydown", event => {
        if ((event.key === "ArrowLeft" || event.key === "a") && direction !== "RIGHT") direction = "LEFT";
        else if ((event.key === "ArrowUp" || event.key === "w") && direction !== "DOWN") direction = "UP";
        else if ((event.key === "ArrowRight" || event.key === "d") && direction !== "LEFT") direction = "RIGHT";
        else if ((event.key === "ArrowDown" || event.key === "s") && direction !== "UP") direction = "DOWN";
    });

    function draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? varAccent() : "#00ffcc";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop(); // remove tail before collision check
        }

        let newHead = { x: snakeX, y: snakeY };

        // FIX: exclude the tail from collision check if it's about to move
        if (
            snakeX < 0 || snakeX >= canvas.width ||
            snakeY < 0 || snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            clearInterval(game);
            alert("Game Over! Refresh to play again.");
        }

        snake.unshift(newHead);

    }

    function collision(head, array) {
        return array.some((segment, index) => index !== array.length - 1 && segment.x === head.x && segment.y === head.y);
    }


    function varAccent() {
        return getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim() || "#00ffff";
    }

    let game = setInterval(draw, 100);
}
