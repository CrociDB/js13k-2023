class Fish {
    constructor() {
        this.pos = new V2d(0, 0);
        this.vel = new V2d(0, 0);
        this.spd = .1;
        this.rot = 0;
        this.forward = new V2d(0, 0);
        this.time_offset = Math.random() * 20;

        this.color = "#52B69A";

        this.cspeed = 0;
        this.cw = 0;

        this.direction = null;

        this.thrusting = false;
    }

    render(ctx) {
        ctx.save();
        
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);

        let speed = 15;

        let sin = Math.sin((time() + this.time_offset) * speed) * Math.pow(this.cspeed, 2);
        let cos = Math.cos((time() + this.time_offset) * speed) * Math.pow(this.cspeed, 2);

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
        
        ctx.restore();

        // debug
        if (false)
        {
            ctx.strokeStyle = "#FF0000";
            ctx.beginPath();
            let point = this.pos.add(this.forward.muls(80));
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.closePath();
            
            if (this.direction != null) 
            {
                ctx.strokeStyle = "#FF00FF";
                ctx.beginPath();
                let point = this.pos.add(this.direction.muls(80));
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    follow(target) {
        let delta = target.sub(this.pos);
        this.direction = delta.normalize();

        let dirangle = Math.atan2(delta.y, delta.x);
        let myangle = this.rot - Math.PI / 2;

        let dist = delta.length();
        if (dist > 40)
        {
            this.thurst(Math.min(dist / 30) / 30);

            if (Math.abs(dirangle - myangle) > .1)
            {
                if (dirangle > myangle) 
                {
                    this.turn(0.05);
                }
                else
                {
                    this.turn(-0.05);
                }
            }
        }

    }

    update() {
        this.forward = new V2d(0, 1);
        this.forward.setAngle(this.rot - Math.PI / 2);

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
        this.vel = this.vel.muls(.965);
        this.thurst(.2);
    }
}
