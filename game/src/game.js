class Game {
    constructor() {
        // Get DOM stuff
        this.canvas = gId("game");
        this.ctx = this.canvas.getContext('2d');

        // Create game components
        this.input = new Input(this.canvas);

        // Main loop
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    update() {
        this.update_logic();
        this.update_render();
        
        window.requestAnimationFrame(this.update.bind(this));
        
    }

    update_logic() {
        if (this.input.key(Input.UP)) console.log("UP");
        if (this.input.key(Input.DOWN)) console.log("DOWN");
        if (this.input.key(Input.LEFT)) console.log("LEFT");
        if (this.input.key(Input.RIGHT)) console.log("RIGHT");
    }
    
    update_render() {
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

(function() {
    new Game();
})();
