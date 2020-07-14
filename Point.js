// Point : new Point(id, x, y, size)
class Point {
    constructor(id, x, y, size, health, fill, eq_num) {
        this.entityType = 'point';
        this.showId = false;
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.health = health;
        this.fill = fill;
        this.eq_num = eq_num;
        this.kill = false;
    }
    update() {
        if (this.eq_num == 0) {
            //initializeNewScene(0, 0.0005001, 200, 2, 0, 0, 0.9);
            this.x = Math.pow(this.x, 2) - (this.x * t) + (this.y * t) - this.x;
            this.y = Math.pow(this.y, 2) - (this.y * t) + (this.x * t) - this.y;
        }

        if (this.eq_num == 1) {
            //initializeNewScene(0, 0.0001001, 750, 2, 0, 1, 0.5);
            this.x = Math.pow(this.x, 2) - (this.x * t) + (this.y * t) - this.x;
            this.y = Math.pow(this.y, 2) - (this.y * t) - (this.x * t) - this.y;
        }

        if (this.eq_num == 2) {
            //initializeNewScene(0.2, 0.0001001, 1000, 2, 0, 2, 0.5);
            this.x = -Math.pow(this.x, 2) + this.x * t + this.y;
            this.y = Math.pow(this.x, 2) - Math.pow(this.y, 2) - Math.pow(t, 2) - this.x * this.y + this.y * t - this.x + this.y;
        }

        if (this.eq_num == 3) {
            //initializeNewScene(0, 0.001001, 200, 2, 0, 3, 10);
            this.x = Math.pow(this.x, 2) - (this.x * t) + t + this.y - (this.y * t) - this.x;
            this.y = Math.pow(this.y, 2) - (this.y * t) + t + this.x - (this.x * t) - this.y;
        }

        //this.x = (Math.pow(this.x, 2) + Math.pow(this.y, 2) - Math.pow(t, 2) - this.x - t);
        //this.y = (Math.pow(this.y, 2) + Math.pow(t, 2) - (this.x * this.y) - this.y - t);

        this.health--;
        if (this.health < 1) this.kill = true;
    }
    display() {
        colorMode(HSB);
        fill(random(150, 250), random(25, 75), random(50, 100));
        //fill(this.fill);
        noStroke();
        push();
        translate(this.x * g_scale_factor, this.y * g_scale_factor);
        ellipse(width/2, height/2, this.size);
        pop();
    }
    run() {
        this.update();
        this.display();
    }
}