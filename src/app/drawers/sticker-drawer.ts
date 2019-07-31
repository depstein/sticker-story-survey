import { Condition } from '../condition';

export class StickerDrawer {

	context:CanvasRenderingContext2D;
	condition:Condition;
	canvasWidth:number;
	canvasHeight:number;
	ratio:number;

	constructor(condition:Condition, canvasWidth:number, canvasHeight:number, ratio:number) {
		this.condition = condition;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.ratio = ratio;
	}

	drawSticker(frame:number):Promise<void> {
		return new Promise((resolve, reject) => {
	      	let image = new Image();
	      	image.src = this.imageUrl(frame);
		    image.onload = () => {
		      	let xPosition = 100;
		      	let yPosition = 100;
		      	let maxDim = 150;
		      	switch(this.condition.context) {
		      		case "yes":
		      			//smaller sticker, position slightly differently in each scenario
		      			//All stickers are delicately positioned relative to their rotation...
		      			switch(frame) {
		      				case 0:
		      				xPosition = 90;
		      				yPosition = 0;
		      				this.context.rotate(30 * Math.PI / 180);
		      				break;
		      				case 1:
		      				xPosition = 40;
		      				yPosition = 400;
		      				this.context.rotate(-10 * Math.PI / 180);
		      				break;
		      				case 2:
		      				this.context.rotate(15 * Math.PI / 180);
		      				xPosition = 140;
		      				yPosition = 370;
		      				break;
		      			}
		      		break;
		      		case "no":
		      			//Sticker should be larger, centered horizontally and vertically
		      			maxDim = 250;
		      			if(image.naturalWidth >= image.naturalHeight) {
		      				xPosition = this.canvasWidth/(2*this.ratio) - maxDim/2;
		      				yPosition = this.canvasHeight/(2*this.ratio) - (maxDim*image.naturalHeight/image.naturalWidth)/2;
		      			} else {
		      				xPosition = this.canvasWidth/(2*this.ratio) - (maxDim*image.naturalWidth/image.naturalHeight)/2;
		      				yPosition = this.canvasHeight/(2*this.ratio) - maxDim/2;
		      			}
		      		break;
		      	}
		      	if(image.naturalWidth >= image.naturalHeight) {
		      		this.context.drawImage(image, xPosition, yPosition, maxDim, maxDim*image.naturalHeight/image.naturalWidth);
		      	} else {
					this.context.drawImage(image, xPosition, yPosition, maxDim*image.naturalWidth/image.naturalHeight, maxDim);	
		      	}
		        resolve();
	      	}
	    });
	}

	private imageUrl(frame:number):string {
	  	return 'assets/' + this.condition.domain + '/' + this.condition.presentation + '_' + this.condition.relevance + '_' + this.condition.style + '_' + frame + '.png';
  	}
}
