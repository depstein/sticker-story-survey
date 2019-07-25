import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { generate } from 'shortid';
import { alea } from 'seedrandom';
import { Condition } from './condition';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly ROLES:string[] = ['sharer', 'recipient'];
  //static readonly DOMAINS:string[] = ['steps', 'time', 'music', 'food', 'heartrate'];
  static readonly DOMAINS:string[] = ['steps'];
	@LocalStorage() uid:string = generate();
	@LocalStorage() role:string = undefined;
	@LocalStorage() domain:string = undefined;
	stickers:Condition[] = [];
	@LocalStorage() stickerIndex:number = 0;
  @LocalStorage() person:string = undefined;
	rng;

  constructor() {
  	//To ensure the same stickers are always selected, seed the rng according to the User ID
  	this.rng = alea(this.uid);
    this.selectDomainAndRole();
  	this.selectStickers();
  }

  get currentSticker():Condition {
  	return this.stickers[this.stickerIndex];
  }

  selectDomainAndRole() {
    this.role = UserService.ROLES[this.upTo(UserService.ROLES.length)];
    this.domain = UserService.DOMAINS[this.upTo(UserService.DOMAINS.length)];
  }

  selectStickers() {
  	this.stickers = [];
  	var presentations = this.shuffle([{p: 'chartjunk', r: 'no'}, {p: 'chartjunk', r: 'yes'}, {p: 'plain', r: 'no'}, {p: 'plain', r: 'yes'}, {p: 'analogy', r: 'no'}, {p: 'analogy', r: 'yes'}]);
  	//always in context
    var contexts = this.shuffle([{c: 'yes', s:0}, {c: 'yes', s:1}, {c: 'yes', s:2}, {c: 'yes', s:0}, {c: 'yes', s:1}, {c: 'yes', s:2}]);
  	//in analysis, remember that scenarios are domain-dependent and styles are domain- and aggregation-dependent.
    var styles = this.shuffle([this.upTo(6), this.upTo(6), this.upTo(6), this.upTo(6), this.upTo(6), this.upTo(6)]);
  	for(var i=0;i<6;i++) {
  		this.stickers.push(new Condition(presentations[i]['p'], presentations[i]['r'], contexts[i]['c'], contexts[i]['s'], styles[i], this.domain, this.role, i+1));
  	}
  }

  upTo(n:number):number {
  	return Math.floor(this.rng()*n);
  }

  reset() {
  	//Nose that this just resets the survey to the beginning... I think that's what I want for now.
  	//To ensure the same stickers are always selected, seed the rng according to the User ID
  	this.rng = alea(this.uid);
  	this.selectDomainAndRole();
    this.selectStickers();
  	this.stickerIndex = 0;
  }

  shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
    	const j = Math.floor(this.upTo(i + 1));
    	[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
  }
}
