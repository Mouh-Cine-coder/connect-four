import { createBoard, playMove } from "./connect4.js";




function initGame(websocket) {
    websocket.addEventListener("open", () => {
        // Send an "init" event according to who is connecting.
        const params = new URLSearchParams(window.location.search);
        let event = { type: "init" };
        if (params.has("join")) {
            // Second player joins an existing game.
            event.join = params.get("join");
        } else if (params.has("watch")) {
            // Spectator watches an existing game.
            event.watch = params.get("watch");
        } else {
            // First player starts a new game.
        }
        websocket.send(JSON.stringify(event));
    });
}

function sendMoves(board, websocket) {
    // Don't send moves for a spectator watching a game.
    const params = new URLSearchParams(window.location.search);
    if (params.has("watch")) {
        return;
    }
    
    // When clicking a column, send a "play" event for a move in that column.
    board.addEventListener("click", ({ target }) => {
        const column = target.dataset.column;
        // Ignore clicks outside a column.
        if (column === undefined) {
            return;
        }
      const event = {
        type: "play",
        column: parseInt(column, 10),
    };
    websocket.send(JSON.stringify(event));
});
}

function showMessage(message) {
    window.setTimeout(() => window.alert(message, 50))
};

function recieveMoves(board, websocket) {
    websocket.addEventListener("message", ({ data }) => {
        const event = JSON.parse(data);
        switch (event.type) {
            case "play":
                // event => {type: "play", player: "red", column: 3, row: 0}
                playMove(board, event.player, event.column, event.row);
                break;
            case "win":
                // event => {type: "win", player: "red"}
                console.log(`player ${event.player} wins!`);
                websocket.close(1000);
                break;
            case "init":
                document.querySelector(".join").href = "?join=" + event.join;
                document.querySelector(".watch").href = "?watch=" + event.watch;
                document.querySelector(".join-link").textContent = `http://localhost:8000/?join=${event.join}`;
                document.querySelector(".watch-link").textContent = `http://localhost:8000/?watch=${event.watch}`;
                break;
            case "error":
                // event => {type: "error", message: "This slot is full."}
                showMessage(event.message);
                break;
            default:
                throw new Error(`Unsupported event type ${event.type}.`)

        };

    })
};


window.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    createBoard(board);
    const websocket = new WebSocket("ws://localhost:8001/");
    initGame(websocket);
    recieveMoves(board, websocket);
    sendMoves(board, websocket);
});







