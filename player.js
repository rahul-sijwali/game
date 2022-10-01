import { Sitting, Running } from "./playerStates.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    //this.y=100;
    //console.log(this.game);
    this.vy = 0;
    this.image = document.getElementById("player");
    this.weight = 1;
    this.frameX = 0;
    this.frameY = 3;
    this.speed = 0;
    this.maxSpeed = 10;
    this.states = [new Sitting(this), new Running(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input) {
    this.currentState.handleInput(input);
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes(ArrowLeft)) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 30;
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }
  draw(context) {
    // console.log(5);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }

  setState(state) {
    this.currentState = this.setState[state];
    this.currentState.enter();
  }
}
