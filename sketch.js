let t = 0.2;
let interval = 0.000100001;
let targetFramerate = 60;
let delta;
let canvas;

let loading = true;
let assets_called = 0;
let total_assets;
let assets_loaded = 0;

let started = true;
let debug = false;
let showFPS = false;

let g_paint_mode = true;
let g_scale_factor = 300;
let g_point_size = 2;
let g_point_health = 500;
let g_eq_num = 1;
let g_zoom_speed = 0;
let g_scene_length = 0.5;

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
	canvas = createCanvas(windowWidth, windowHeight);

	// Define total number of assets based on amount of assets called in preload()
	total_assets = assets_called;
	console.log('total assets : ' + total_assets);

	// Create new entity manager and specify maximum entities allowed to be rendered
	entityManager = new EntityManager(5000);

	// Set project refresh rate
	frameRate(targetFramerate);
}

function initializeNewScene(time, time_interval, scale_factor, point_size, zoom_speed, eq_num, scene_length) {
	t = time;
	interval = time_interval;
	g_scale_factor = scale_factor;
	g_point_size = point_size;
	g_zoom_speed = zoom_speed;
	g_eq_num = eq_num;
	g_scene_length = scene_length;

	setup();
}

function draw() {
	drawBackground();

	// Set loading to false once all assets loaded
	assets_loaded == total_assets && (loading = false);

	// Run visualiser once loading is complete otherwise show start screen
	loading || (started ? run() : startScreen());

	//fill(255);
	//text(t, 10, 25);
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
	t += interval;
	g_scale_factor -= g_zoom_speed;
	if (t > g_scene_length) {
		initializeNewScene(0.2, 0.0001001, 1000, 2, 0, 2, 0.5);
	}

	if (keyIsDown(219)) g_scale_factor -= 50;
	if (keyIsDown(221)) g_scale_factor += 50;

	if (entityManager.points.length < 500) {
		entityManager.spawnPoint('point' + entityManager.points.lenth, t, t, g_point_size, g_point_health, 100, g_eq_num);
	}

	entityManager.run();
}

function keyPressed() {
	if (key === '1') t = 0.1;
	if (key === '2') t = 0.2;
	if (key === '3') t = 0.3;
	if (key === '4') t = 0.4;
	if (key === '5') t = 0.5;

	if (key === '-') interval -= 0.0001;
	if (key === '=') interval += 0.0001;

	//if (key === '[') g_scale_factor -= 50;
	//if (key === ']') g_scale_factor += 50;

	if (key === 'q') t -= 0.025;
	if (key === 'w') t += 0.025;
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
