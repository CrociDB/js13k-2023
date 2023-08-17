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

        let sin = Math.sin(time() * speed) * Math.pow(this.cspeed, 2);
        let cos = Math.cos(time() * speed) * Math.pow(this.cspeed, 2);

        ctx.fillStyle = "#7EAA92";
        ctx.strokeStyle = "#7EAA92";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";

        // big central circle
        ctx.beginPath();
        ctx.arc(sin * 4.5, 0 - 10, 17, 0, 2 * Math.PI, false);
        ctx.arc(sin * 2.5, 0 - 20, 15, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

        // side fins
        ctx.beginPath(); // right
        ctx.moveTo(sin * 4.5 + 12, -12);
        ctx.quadraticCurveTo(sin * 4.5 + 30, 10, sin * 4.5 + 12, -9);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath(); // left
        ctx.moveTo(sin * 4.5 - 12, -12);
        ctx.quadraticCurveTo(sin * 4.5 - 30, 10, sin * 4.5 - 12, -9);
        ctx.stroke();
        ctx.closePath();

        
        // head
        // ctx.beginPath();
        // ctx.arc(0, -35, 13, 0, 2 * Math.PI, false);
        // ctx.fill();
        // ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(-13, -25);
        ctx.quadraticCurveTo(cos * 4.5, -65 + sin * 2.0, 13, -25);
        ctx.lineTo(-13, -25);
        ctx.fill();
        ctx.closePath();
        
        // mid static
        ctx.beginPath();
        ctx.arc(0, 0 + 10, 15, 0, 2 * Math.PI, false);
        ctx.arc(sin * 2.5, 0 + 2, 17, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        
        // tail body
        ctx.beginPath();
        ctx.arc(cos * 6.5, 0 + 20, 12, 0, 2 * Math.PI, false);
        ctx.arc(cos * 8.5, 0 + 25, 9, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(cos * 9.5, 0 + 30, 7, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        
        // tail
        ctx.beginPath();
        ctx.moveTo(cos * 8.5, 0 + 23);
        ctx.quadraticCurveTo(cos * 10.5, 25, cos * 28.5 + 4.0, 40 + (1.0 - sin) * 6.0);
        ctx.moveTo(cos * 8.5, 0 + 23);
        ctx.quadraticCurveTo(cos * 10.5, 25, cos * 20.5, 37 + (1.0 - sin) * 6.0);
        ctx.stroke();
        ctx.closePath();

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
        this.cspeed *= .92;
        this.thurst(.4);
    }
}
