class V2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new V2d(this.x, this.y);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mulv(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }

    muls(other) {
        this.x *= other;
        this.y *= other;
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthsqrt() {
        return this.x * this.x + this.y * this.y;
    }

    setAngle(a) {
        let l = this.length();
        this.x = Math.cos(a) * l;
        this.y = Math.sin(a) * l;
        return this;
    }
}