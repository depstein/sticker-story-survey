import { Condition } from '../condition';

export class BackgroundDrawer {

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

	drawBackground(frame:number):Promise<void> {
		return new Promise((resolve, reject) => {
	      if(this.condition.context == "no") {
	        //Nothing to do here, the canvas background will take care of it.
	        resolve();
	      } else {
	        //Draw an image as the background
	        //TODO: load image dynamically based on the scenario
	        let image = new Image();
	        image.src = 'assets/' + this.condition.domain + '/background_' + this.condition.scenario + "_" + frame  + '.jpg';
	        image.onload = () => {
	          this.context.drawImage(image, 0, 0, this.canvasWidth / this.ratio, this.canvasHeight / this.ratio);
	          resolve();
	        }
	      }
	    });
	}
}
