export class OverlayDrawer {

	context:CanvasRenderingContext2D;
	canvasWidth:number;
	canvasHeight:number;
	ratio:number;
	person:string;
	snapDuration:number;
	refreshRate:number
	static readonly TimeList = ['2h', '1h', '14m'];

	constructor(canvasWidth:number, canvasHeight:number, ratio:number, person:string, snapDuration:number, refreshRate:number) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.ratio = ratio;
		this.person = person;
		this.snapDuration = snapDuration;
		this.refreshRate = refreshRate;
	}

	drawProgressBar(frame:number, tick:number):Promise<void> {
		//I don't know why this shows up full after resetting.
		return new Promise((resolve, reject) => {
			this.context.fillStyle = '#ffffff';
			let width = (this.canvasWidth/this.ratio)/3 - 5 - 2.5;
			this.context.fillRect(5 + frame*(width + 5), 5, ((this.refreshRate*tick)%this.snapDuration)/this.snapDuration*width, 3);
			resolve();
		});
	}

	drawLabel(frame):Promise<void> {
		return new Promise((resolve, reject) => {
			let image = new Image();
	      	image.src = 'assets/avatar.png';
		    image.onload = () => {
		    	this.context.drawImage(image, 10, 10, 30, 30);
				var fontSize = 14;
				this.context.font = "bold " + fontSize + "px Avenir";
				this.context.fillStyle = "#ffffff";
				this.context.fillText(this.person, 50, 15 + fontSize);

				let text = OverlayDrawer.TimeList[frame];
				let textWidth = this.context.measureText(this.person).width;
				this.context.font = fontSize + "px Avenir";
				this.context.fillStyle = "#eeeeee";
				this.context.fillText(text, 50 + textWidth + 10, 15 + fontSize);

				let width = (this.canvasWidth/this.ratio)/3 - 5 - 2.5;
				for(var i=0;i<3;i++) {
					if(i<frame) {
						this.context.fillStyle = '#ffffff';
					} else {
						this.context.globalAlpha = 0.5;
						this.context.fillStyle = "#eeeeee";
					}
					this.context.fillRect(5 + i*(width + 5), 5, width, 3);
					this.context.globalAlpha = 1;
				}
		    	resolve();
		    }
		});
	}
}
