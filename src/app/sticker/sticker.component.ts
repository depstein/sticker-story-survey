import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Condition } from '../condition';
import { UserService } from '../user.service';
import { CaptionDrawer } from '../drawers/caption-drawer';
import { BackgroundDrawer } from '../drawers/background-drawer';
import { StickerDrawer } from '../drawers/sticker-drawer';
import { OverlayDrawer } from '../drawers/overlay-drawer';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit {
  
	@Input() condition:Condition;
  @ViewChild('stickerCanvas') canvas:ElementRef;
  ratio = window.devicePixelRatio || 1;
  canvasWidth:number = 277 * this.ratio;
  canvasHeight:number = 600 * this.ratio;
  canvasBackground:string;
  context:CanvasRenderingContext2D;
  background:BackgroundDrawer;
  sticker:StickerDrawer;
  caption:CaptionDrawer;
  overlay:OverlayDrawer;
  snapDelay:number = 1000;
  snapDuration:number = 5000;
  animator;
  progressBar;

  constructor(public userService:UserService) {

  }

  ngOnInit() {
    this.initializeDrawers();
  }

  ngAfterViewInit() {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.sticker.context = this.context;
    this.background.context = this.context;
    this.caption.context = this.context;
    this.overlay.context = this.context;
    this.drawEverything(0);
    this.scheduleDraw();
  }

  ngOnChanges() {
    this.initializeDrawers();
    this.drawEverything(0);
    this.scheduleDraw();
  }

  drawEverything(frame) {
    if(this.context) {
      this.resetCanvas();
      this.background.drawBackground(frame).then(() => {
        this.resetTransform();
        this.sticker.drawSticker(frame).then(() => {
          this.resetTransform();
          this.caption.drawCaption(frame).then(() => {
            this.resetTransform();
            this.overlay.drawOverlay(frame);
          });
        });
      });
    }
  }

  scheduleDraw() {
    if(this.animator) {
      this.animator.unsubscribe();
      this.animator = undefined;
    }
    let frame=0;
    this.animator = timer(this.snapDelay, this.snapDuration).subscribe(t => {
      this.drawEverything(frame%3);
      frame++;
    });
  }

  initializeDrawers() {
    this.background = new BackgroundDrawer(this.condition, this.canvasWidth, this.canvasHeight, this.ratio);
    this.caption = new CaptionDrawer(this.condition, this.canvasWidth, this.canvasHeight, this.ratio);
    this.sticker = new StickerDrawer(this.condition, this.canvasWidth, this.canvasHeight, this.ratio);
    this.overlay = new OverlayDrawer(this.canvasWidth, this.canvasWidth, this.ratio, this.userService.person);
    this.canvasBackground = this.background.backgroundStr;
    this.sticker.context = this.context;
    this.background.context = this.context;
    this.caption.context = this.context;
    this.overlay.context = this.context;
  }

  resetTransform() {
    this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
  }

  resetCanvas() {
    this.resetTransform();
    //Don't need clear because stickers are alwayd displayed in context
    //this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
