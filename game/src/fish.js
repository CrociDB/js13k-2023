class Fish {
    constructor() {
        this.pos = new V2d(0, 0);
        this.vel = new V2d(0, 0);
        this.spd = .4;
        this.rot = 0;
    }

    render(ctx) {
        ctx.save();
        
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);

        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#FF9B9B";
        ctx.fill();
        ctx.arc(0, 0 - 20, 15, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.arc(0, 0 + 20, 15, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.arc(0, 0 + 35, 10, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.muls(.96);
    }

    thurst() {
        let a = new V2d(1.0, 0.0);
        a.setAngle(this.rot - Math.PI / 2);
        a.muls(this.spd);
        this.vel.add(a);
    }

    turn(val) {
        this.rot += val;
    }
}
