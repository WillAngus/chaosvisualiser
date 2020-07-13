let t = 0.5;
//let interval = 0.0001;
let interval = 0.0001;
let targetFramerate = 60;
let delta;
let canvas;

let loading = true;
let assets_called = 0;
let total_assets;
let assets_loaded = 0;

let started = false;
let debug = false;
let showFPS = false;

let g_paint_mode = true;
let g_scale_factor = 250;
let g_point_size = 2;

let entityManager;
let entities = [];

let png_playbutton, png_missingTexture;

function loadAsset(type, url) {
	// Create output variable to be defined once asset has loaded
	var output;
	// +1 to assets called and log the type and url
	assets_called++;
	// Log asset to console once called
	console.log(type + ' called : ' + url);

	// Function called once called asset has successfully loaded
	function loaded(asset) {
		// +1 to assets successfully loaded
		assets_loaded++;
		console.log(type + ' loaded successfully : ' + url);
	}

	// Function called when asset fails to load
	function error(err) {
		assets_loaded++;
		console.error(err);
	}

	// Define output variable depending on the asset type
	type === 'image' ? output = loadImage(url, loaded, error) : (output = loadSound(url, loaded, error), output.playMode('restart'));

	return output;
}

function preload() {
    png_playButton = loadAsset('image', 'assets/img/play_button.png');
}

function setup() {
    // Create screen for rendering onto
	canvas         = createCanvas(windowWidth, windowHeight);

	// Define total number of assets based on amount of assets called in preload()
	total_assets   = assets_called;
	console.log('total assets : ' + total_assets);

	// Create new entity manager and specify maximum entities allowed to be rendered
    entityManager  = new EntityManager(1000);
    
    // Set project refresh rate
	frameRate(targetFramerate);
}

function  draw() {
    drawBackground();

	// Set loading to false once all assets loaded
	assets_loaded == total_assets && (loading = false);

	// Run visualiser once loading is complete otherwise show start screen
    loading || (started ? run() : startScreen());
    
    fill(255);
    text(t, 10, 25);
}

function drawBackground() {
	// Set background to translucent when paint mode enabled
	g_paint_mode ? background('rgba(36, 4, 72, 0.01)') : background(0, 0, 0);
	// Startscreen background
	started || background(2, 0, 6);
}

function startScreen() {
	//image(png_playButton, (width/2) - 100, (height/2) - 100, 200, 200);
}

function run() {
    interval = sin(t)/8000;
    t += interval;

    if (entityManager.points.length < 100) {
        entityManager.spawnPoint('point' + entityManager.points.lenth, t, t, g_point_size, 100);
    } else {
        entityManager.points[0].kill = true;
    }

    entityManager.run();
}

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
        //this.x = (Math.pow(this.x, 2) - Math.pow(this.y, 2) - Math.pow(t, 2) - this.x - t);
        //this.y = (Math.pow(this.y, 2) - Math.pow(t, 2) - (this.x * this.y) - this.y - t);
        
        this.x = (Math.pow(this.x, 2) + Math.pow(this.y, 2) - Math.pow(t, 2) - this.x - t);
        this.y = (Math.pow(this.y, 2) + Math.pow(t, 2) - (this.x * this.y) - this.y - t);
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

// Allow audio after initiating touch
function touchStarted() {
	if (!started && !loading) {
		getAudioContext().resume();
		started = true;
	}
}

// Resize the canvas when viewport adjusted
function windowResized() {
	canvas.resize(windowWidth, windowHeight);
}