export default class AnimationManager{constructor(t=1/60){this.deltaTime=t,this._doNotTouch={lastFrame:0,accumulatedTime:0,update:t=>{for(this._doNotTouch.accumulatedTime+=(t-this._doNotTouch.lastFrame)/1e3;this._doNotTouch.accumulatedTime>this.deltaTime;)this.functions.forEach(t=>t(this.deltaTime)),this._doNotTouch.accumulatedTime-=this.deltaTime;this._doNotTouch.running&&requestAnimationFrame(this._doNotTouch.update),this._doNotTouch.lastFrame=t},running:!1,functions:[]}}start(){this._doNotTouch.running=!0,requestAnimationFrame(this._doNotTouch.update)}stop(){this._doNotTouch.running=!1,cancelAnimationFrame(this._doNotTouch.update)}get functions(){return this._doNotTouch.functions}}