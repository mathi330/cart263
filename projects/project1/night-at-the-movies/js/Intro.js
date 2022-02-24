/**
The state for the intro page of the decoding
*/
class Intro extends State {
  constructor() {
    super();
    this.title = `Hello!!`;
  }

  update() {
    background(0);
    push();
    fill(255);
    text(this.title, width / 2, height / 2);
    pop();
  }

  changeState() {
    state = new Decoding();
    // state.setup();
  }
}
