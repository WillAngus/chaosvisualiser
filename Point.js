// Point : new Point(id, x, y, size)
class Point {
    constructor(id, x, y, size, fill) {
        this.entityType = 'point';
        this.showId = false;
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = fill;
    }
    update() {
        //initializeNewScene(0, 0.0001, 1000, 2, 0.1);
        //this.x = Math.pow(this.x, 2) - (this.x * t) + (this.y * t) - this.x;
        //this.y = Math.pow(this.y, 2) - (this.y * t) + (this.x * t) - this.y;

        //initializeNewScene(0, 0.0001, 750, 2, 0.15);
        //this.x = Math.pow(this.x, 2) - (this.x * t) + (this.y * t) - this.x;
        //this.y = Math.pow(this.y, 2) - (this.y * t) - (this.x * t) - this.y;

        //initializeNewScene(0.2, 0.0001, 1000, 2, 0);
        this.x = -Math.pow(this.x, 2) + this.x * t + this.y;
        this.y = Math.pow(this.x, 2) - Math.pow(this.y, 2) - Math.pow(t, 2) - this.x * this.y + this.y * t - this.x + this.y;
        
        //this.x = (Math.pow(this.x, 2) + Math.pow(this.y, 2) - Math.pow(t, 2) - this.x - t);
        //this.y = (Math.pow(this.y, 2) + Math.pow(t, 2) - (this.x * this.y) - this.y - t);

        //this.x = t;
        //this.y = t;
    }
    display() {
        //colorMode(HSB);
        fill(random(150, 250), random(25, 75), random(50, 100));
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