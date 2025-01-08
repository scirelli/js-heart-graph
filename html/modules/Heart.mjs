import {default as Vector} from './Vector.mjs';

export default class Heart {
	constructor(){
		this._pixelPos = [];
		this._theta = [];
		this._pixelV = [];
	}
	
	generate(n=1000){
		generateHeartCoordinates.call(this, 1000);
		return this;
	}

	copy(h) {
		this._pixelPos = h._pixelPos.slice(0);
		this._pixelV = h._pixelV.slice(0);
		return this;
	}

	clone() {
		return new Heart().copy(this);
	}

	translate(tv) {
		this._pixelPos.forEach(v => {
			v.add(tv);
		});
		return this;
	}

	scale(s) {
		this._pixelPos.forEach(v => {
			v.scale(s);
		});
		return this;
	}
}

function generateHeartCoordinates(pixelCount=628) {
	for (let i = 0, dp=2*Math.PI,step=dp/pixelCount, x, y; i <= dp; i += step) {
		[x,y] = heartStep(i);
		this._pixelPos.push(new Vector(x, y));
		this._theta.push(i);
	}
}

function heartStep(t) {
	let x = 16 * Math.pow(Math.sin(t), 3),
		y = 13 * Math.cos(1 * t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - 1 * Math.cos(4 * t);
	return [x, -y];
}
