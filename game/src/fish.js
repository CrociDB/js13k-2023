class Fish {
    constructor() {
        this.pos = new V2d(0, 0);
        this.vel = new V2d(0, 0);
        this.spd = .1;
        this.rot = 0;

        this.cspeed = 0;
        this.cw = 0;

        this.thrusting = false;
    }

    render(ctx) {
        ctx.save();
        
        ctx.scale(.9, .9);
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);

        let speed = 15;

        ctx.fillStyle = "#7EAA92";
        ctx.beginPath();
        ctx.arc(Math.sin(time() * speed) * Math.pow(this.cspeed, 3) * 3.5, 0 - 10, 20, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.arc(0, 0 - 30, 15, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.arc(0, 0 + 10, 15, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.arc(Math.cos(time() * speed) * Math.pow(this.cspeed, 3) * 8.5, 0 + 25, 10, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.pos.add(this.vel);
        this.vel.muls(.99);

        if (this.thrusting)
        {
            this.cspeed = Math.min(this.vel.length(), this.spd) / this.spd;
        }
        else
        {
            this.cspeed *= .99;
        }

        this.thrusting = false;
    }

    thurst(mul = 1.0) {
        let a = new V2d(1.0, 0.0);
        a.setAngle(this.rot - Math.PI / 2);
        a.muls(this.spd * mul);
        this.vel.add(a);
        this.thrusting = true;
    }

    turn(val) {
        this.rot += val;
        this.thurst(.2);
    }
}
