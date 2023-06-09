class Component {
  constructor(x, y, w, h, image, ctx, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.speedX = speed;
    this.speedY = 0;
    this.isJumping = false;
    this.jumpingTop = false;

    const compImage = new Image();
    compImage.src = image;

    this.image = compImage;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  jump() {
    if (this.isJumping) {
      if (this.jumpingTop === true) {
        this.y += 3;
      } else {
        this.y -= 5;
      }

      if (this.y < 10 /*aumentar altura*/) {
        this.jumpingTop = true;
      }

      if (this.y >= 235 && this.jumpingTop === true) {
        this.jumpingTop = false;
        this.isJumping = false;
      }
    }
  }

  top() {
    return this.y + 50;
  }

  bottom() {
    return this.y + this.h - 50;
  }

  left() {
    return this.x + 50;
  }

  right() {
    return this.x + this.w - 50;
  }

  crashWith(enemy) {
    return (
      this.bottom() > enemy.top() &&
      this.top() < enemy.bottom() &&
      this.right() > enemy.left() &&
      this.left() < enemy.right()
    );
  }
}

//////// GAME //////////////
