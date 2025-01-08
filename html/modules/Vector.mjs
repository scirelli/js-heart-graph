class Vector2D {
	constructor(x=0, y=0){
		this.x=x;
		this.y=y;
	}

	add(v) {
		this.x+=v.x;
		this.y+=v.y;
		return this;
	}

	sub(v) {
		this.x-=v.x;
		this.y-=v.y;
		return this;
	}

	scale(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	
	static add(v1, v2) {
		return new Vector2D(v1.x+v2.x, v1.y+v2.y);
	}
	static sub(v1, v2) {
		return new Vector2D(v1.x-v2.x, v1.y-v2.y);
	}
	static scale(v1, s) {
		return new Vector2D(v1.x*s, v1.y*s);
	}
};

class IOperation {
	action(...v) {
		throw new Error('Not Implementd');
	}
}

class Group implements IOperation {
	constructor() {
		this.operations = [];
	}

	action(...v) {
		this.operations.forEach(o=> {
			o.action(...v);
		});
	}

	add(o) {
		if(o instanceof IOperation || o.action) {
			this.operations.push(o);
		}
		return this;
	}
}

const Pixel = Vector2D;
export {Vector2D as default, Pixel};
