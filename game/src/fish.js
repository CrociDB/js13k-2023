class Fish {
    constructor() {
        this.pos = new V2d(0, 0);
        this.vel = new V2d(0, 0);
        this.spd = .1;
        this.rot = 0;
        this.forward = new V2d(0, 0);

        this.color = "#7EAA92";

        this.cspeed = 0;
        this.cw = 0;

        this.thrusting = false;
    }

    render(ctx) {
        ctx.save();
        
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);

        let speed = 15;

        let sin = Math.sin(time() * speed) * Math.pow(this.cspeed, 2);
        let cos = Math.cos(time() * speed) * Math.pow(this.cspeed, 2);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
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
        ctx.quadraticCurveTo(cos * 10.5, 25, cos * 28.5 + 4.0, 42 + (1.0 - sin) * 6.0);
        ctx.moveTo(cos * 8.5, 0 + 23);
        ctx.quadraticCurveTo(cos * 10.5, 25, cos * 20.5, 39 + (1.0 - sin) * 6.0);
        ctx.stroke();
        ctx.closePath();

        // debug
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        let point = this.pos;
        ctx.lineTo(this.pos.x, this.pos.y, )
        ctx.closePath();

        ctx.restore();
    }

    follow(target) {

    }

    update() {
        this.forward = new V2d(0, 1);
        this.forward.setAngle(0);

        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.muls(.99);

        if (this.thrusting)
        {
            this.cspeed = Math.min(this.vel.length() * .3, this.spd) / this.spd;
        }
        else
        {
            this.cspeed *= .99;
            this.cspeed = Math.max(this.cspeed, .2);
        }

        this.thrusting = false;
    }

    thurst(mul = 1.0) {
        let a = new V2d(1.0, 0.0);
        a.setAngle((this.rot - Math.PI / 2) + Math.sin(time() * 20) * Math.pow(this.cspeed, 2) * .2);
        a = a.muls(this.spd * mul);
        this.vel = this.vel.add(a);
        this.thrusting = true;
    }

    turn(val) {
        this.rot += val;
        this.vel.muls(.965);
        this.thurst(.2);
    }
}
