class V2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        let v = new V2d();
        v.x = this.x + other.x;
        v.y = this.y + other.y;
        return v;
    }

    sub(other) {
        let v = new V2d();
        v.x = this.x - other.x;
        v.y = this.y - other.y;
        return v;
    }

    mulv(other) {
        let v = new V2d();
        v.x = this.x * other.x;
        v.y = this.y * other.y;
        return v;
    }

    muls(other) {
        let v = new V2d();
        v.x = this.x * other;
        v.y = this.y * other;
        return v;
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