class Game {
    constructor() {
        // Get DOM stuff
        this.canvas = gId("game");
        this.ctx = this.canvas.getContext('2d');

        // Create game components
        this.input = new Input(this.canvas);

        // Fish!
        this.fish = new Fish();
        this.fish.pos.set(100, 100);

        this.follower = new Fish();
        this.follower.color = "#52B69A";
        this.follower.pos.set(200, 200);

        // Main loop
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    update() {
        this.update_logic();
        this.update_render();
        
        window.requestAnimationFrame(this.update.bind(this));
    }

    update_logic() {
        if (this.input.key(Input.UP)) this.fish.thurst();
        if (this.input.key(Input.DOWN)) console.log("DOWN");
        if (this.input.key(Input.LEFT)) this.fish.turn(-.05);
        if (this.input.key(Input.RIGHT)) this.fish.turn(.05);

        this.follower.follow(this.fish.pos);

        this.fish.update();
        this.follower.update();
    }
    
    update_render() {
        // Clear screen
        this.ctx.fillStyle = "#C8E4B2";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // entities

        // camera
        let scale = .4;
        this.ctx.save();
        this.ctx.scale(scale, scale);

        // player
        this.fish.render(this.ctx);

        // follower
        this.follower.render(this.ctx);

        this.ctx.restore();
    }
}

(function() {
    new Game();
})();
