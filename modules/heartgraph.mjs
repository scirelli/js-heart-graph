let canvas,
	heartPixels = [],
	ctx, id, pixels, running = false;

async function loadFonts() {
	return Promise.allSettled([
		new FontFace('HughIsLife', 'url(/fonts/HughIsLifePersonalUseItalic-K7axe.ttf)').load()
	])
		.then((r)=>r.filter(i=>i.status=='fulfilled'))
		.then((r)=>r.map(i=>i.value))
		.then((fonts) => {
			fonts.forEach(font=>{
				document.fonts.add(font);
			});
			console.log('Font loaded');
		});
}

async function loadAll() {
	return Promise.allSettled([
		loadFonts()
	]);
}

export default function create() {
	return loadAll().then(_create);
}

function _create() {
	canvas = document.body.querySelector('canvas.heart');
	if(!canvas){
		console.warn('Canvas element not found, creating');
		canvas = document.createElement('canvas');
	}
	canvas.id = "hearts";
	canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	canvas.style.zIndex = 9999;
	canvas.style.position = "absolute";
	canvas.style.border = "1px solid rgb(50,50,50)";

	ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	run();

	document.body.appendChild(canvas);
	window.addEventListener('resize', resize);
}

function run() {
	if(running) return;
	running = true;
	generateHeart();
	colorHeart();
}

function stop() {
	running = false;
}

function generateHeart(){
	id = ctx.getImageData(0, 0, canvas.width, canvas.height);
	pixels = id.data;
	heartPixels = generateHeartCoordinates(canvas.width/2, canvas.height/2);
}

function drawName(fname, lname){
	ctx.font = "48px HughIsLife";
	ctx.fillStyle = "white";
	ctx.fillText(fname, canvas.width/2 - ctx.measureText(fname).width, canvas.height/2);
	ctx.fillText(lname, canvas.width/2- ctx.measureText(fname).width/2, canvas.height/2 + 48);
}

function generateHeartCoordinates(width, height) {
	let heartPixels = [];
	for (let i = 0, x, y, off, scale = 10, halfW = width / 2, halfH = height / 2; i <= 2 * Math.PI; i += 0.01) {
		[x,y] = heartStep(i);
		for (let k = 10; k >= 0; k-=0.8) {
			scale = k;
			off = (Math.floor(scale * y + halfH) * id.width + Math.floor(scale * x + halfW)) * 4;
			heartPixels.push(off, off + 1, off + 2, off + 3);
			pixels[off + 3] = 255;
		}
	}

	console.log(heartPixels.length);
	return heartPixels;
}

function heartStep(t) {
	let x = 16 * Math.pow(Math.sin(t), 3),
		y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
	return [x, -y];
}

function colorHeart() {
	for (let i = 0, r, g, b, a; i < heartPixels.length; i += 4) {
		r = heartPixels[i];
		g = heartPixels[i + 1];
		b = heartPixels[i + 2];
		a = heartPixels[i + 3];
		pixels[r] = Math.floor(Math.random() * 136 + 120);
		if(i%10000 === 0){
			pixels[g] = Math.floor(Math.random() * 100 + 5);
			pixels[b] = pixels[g];
		}else{
			pixels[g] = 0;
			pixels[b] = 0;
		}
		//pixels[a] = 255;
	}
	ctx.putImageData(id, (canvas.width/2)-(canvas.width/4), (canvas.height/2)-(canvas.height/4));
	drawName('Gisela', 'Vazquez');
	if(running) requestAnimationFrame(colorHeart);
}

function resize() {
	canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	generateHeart();
	console.log('window is resizing');
}
