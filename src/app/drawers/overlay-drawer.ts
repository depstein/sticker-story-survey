export class OverlayDrawer {

	context:CanvasRenderingContext2D;
	canvasWidth:number;
	canvasHeight:number;
	ratio:number;
	person:string;
	static readonly TimeList = ['2h ago', '1h ago', '14m ago'];

	constructor(canvasWidth:number, canvasHeight:number, ratio:number, person:string) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.ratio = ratio;
		this.person = person;
	}

	drawOverlay(frame:number):Promise<void> {
		return new Promise((resolve, reject) => {
			let image = new Image();
	      	image.src = 'assets/avatar.png';
		    image.onload = () => {
		    	this.context.drawImage(image, 10, 10, 30, 30);
		    	let text = OverlayDrawer.TimeList[frame];
				let textWidth = this.context.measureText(text).width;
				var fontSize = 14;
				this.context.font = "bold " + fontSize + "px Avenir";
				this.context.fillStyle = "#ffffff";
				this.context.fillText(this.person, 50, 10 + fontSize);

				fontSize = 12;
				this.context.font = "bold " + fontSize + "px Avenir";
				this.context.fillStyle = "#cccccc";
				this.context.shadowColor = '#000000';
				this.context.shadowBlur = 15;
				//Apply it 3 times for extra blur effect...
				for(var a=0;a<5;a++) {
					this.context.fillText(text, 50, 10 + 2*fontSize + 5);
				}
				this.context.shadowBlur = 0;
	        	resolve();
	    	};
	    });
	}
}
