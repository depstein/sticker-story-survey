import { Component, OnInit, ViewChild, ElementRef, isDevMode } from '@angular/core';
import { UserService } from '../user.service';
import { FirebaseService } from '../firebase.service';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Response} from '../response';
import {SharerLikertsComponent} from '../sharer-likerts/sharer-likerts.component';
import {RecipientLikertsComponent} from '../recipient-likerts/recipient-likerts.component';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
  @ViewChild('sharerLikerts') sharerLikerts:SharerLikertsComponent;
  @ViewChild('recipientLikerts') recipientLikerts:RecipientLikertsComponent;
  inDevMode:boolean = true;
  enableResponse:boolean = false;
  
  constructor(private router:Router, public userService:UserService, private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.inDevMode = isDevMode();
  }

  ngAfterViewInit() {
  }

  nextSticker(surveyForm:NgForm) {
    if(this.dataValid()) {
      this.saveData();
      this.resetLikerts();
      if(this.userService.stickerIndex < this.userService.stickers.length - 1) {
        this.userService.stickerIndex += 1;
      } else {
        this.router.navigate(['demographics']);
      }
    }
  }

  dataValid():boolean {
    if(this.sharerLikerts) {
      return this.sharerLikerts.isValid;
    } else if(this.recipientLikerts) {
      return this.recipientLikerts.isValid;
    } else {
      return false;
    }
  }

  saveData() {
    if(this.sharerLikerts) {
      this.firebaseService.addResponse(new Response(this.userService.currentSticker, this.sharerLikerts.scales, this.userService.uid));
    } else if(this.recipientLikerts) {
      this.firebaseService.addResponse(new Response(this.userService.currentSticker, this.recipientLikerts.scales, this.userService.uid));
    }
  }

  resetLikerts() {
    if(this.sharerLikerts) {
      this.sharerLikerts.reset();
    } else if(this.recipientLikerts) {
      this.recipientLikerts.reset();
    }
  }

  resetUser() {
  	this.userService.reset();
    this.resetLikerts();
  }

  onPlayed(played:boolean) {
    this.enableResponse = played;
  }

}
