var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = "cactus.png";

var img2 = new Image();
img2.src = "dino.png";

// 공룡 표현
var dino = {
  x: 10,
  y: 200, // 공룡 등장 좌표
  width: 50,
  height: 50,
  draw() {
    // 그려질 수 있도록!!
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(img2, this.x, this.y);
  },
};
dino.draw();

class Cactus {
  constructor() {
    this.x = 500; // 왼쪽에서부터 500px
    this.y = 200; // 위에서부터 200px
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(img1, this.x, this.y);
  }
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;

// 1초에 60번 코드 실행하기
function 프레임마다실행할거() {
  animation = requestAnimationFrame(프레임마다실행할거);
  timer++; // 이제 타이머가 1씩 올라간다

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 120 프레임마다 cactus가 하나씩 등장한다
  // 120 로 설정되어 있다면 1초에 1번 cactus가 등장한다
  if (timer % 150 === 0) {
    var cactus = new Cactus();
    cactus여러개.push(cactus); // 120프레임마다
  }
  cactus여러개.forEach((a, i, o) => {
    // 지나갈때마다 배열에 cactus가 쌓인다. 얘네들은 이제 필요없는 애들
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;
    충돌하냐(dino, a);
    a.draw();
  });

  if (점프중 == true) {
    dino.y -= 1;
    점프timer++;
  }
  if (점프중 == false) {
    if (dino.y < 200) {
      dino.y++;
    }
  }
  if (점프timer > 100) {
    점프중 = false;
    점프timer = 0;
  }
  dino.draw();
}
프레임마다실행할거();

// 충돌확인
function 충돌하냐(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    // 충돌됐다!
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var 점프중 = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});
