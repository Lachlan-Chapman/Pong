
//game status
let gameState = 'start';
//paddle
let paddle_1 = document.querySelector('.paddle_1');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2 = document.querySelector('.paddle_2');
let paddle_2_coord = paddle_2.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect()
//board
let board = document.querySelector('.board');
let board_coord = board.getBoundingClientRect();

//ball
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;

//text
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');

function myRandom(coefficient, offset) {return Math.floor(Math.random() * coefficient) + offset;}

let dx = myRandom(4, 3);
let dy = myRandom(4, 3);
let dxd = myRandom(2, 0);
let dyd = myRandom(2, 0);



function restart() {
	gameState = 'start';
	ball_coord = initial_ball_coord;
	ball.style = initial_ball.style;
	message.innerHTML = "Press 'Enter' to begin";
	message.style.left = 38 + 'vw';
	return;
}

function moveBall(dx, dy, dxd, dyd) {
	//message.innerHTML = ball_coord.top + ' | ' + ball_coord.left + ' | ' + myRandom(4, 3) + ' | ' + myRandom(4, 0);
	if(ball_coord.top <= board_coord.top) {dyd = 1;} //hit top of screen
	if(ball_coord.bottom >= board_coord.bottom) {dyd = 0;} //hit bottom of screen
	if(ball_coord.left <= paddle_1_coord.right && ball_coord.top >= paddle_1_coord.top && ball_coord.bottom <= paddle_1_coord.bottom) { //hit opponent 1 paddle
		dxd = 1;
		dx = myRandom(4, 3);
		dy = myRandom(4, 3);
	}
	if(ball_coord.right >= paddle_2_coord.left && ball_coord.top >= paddle_2_coord.top && ball_coord.bottom <= paddle_2_coord.bottom) { //hit opponent 2 paddle
		dxd = 0;
		dx = myRandom(4, 3);
		dy = myRandom(4, 3);
	}
	
	if(ball_coord.left <= board_coord.left) {score_2.innerHTML = +score_2.innerHTML + 1; restart(); return;}
	else if (ball_coord.right >= board_coord.right) {score_1.innerHTML = +score_1.innerHTML + 1; restart(); return;}

	ball.style.top = ball_coord.top + dy/2 * (dyd == 0 ? -1 : 1) + 'px';
	ball.style.left = ball_coord.left + dx/2 * (dxd == 0 ? -1 : 1) + 'px';
	ball_coord = ball.getBoundingClientRect();
	//ball.style.top = initial_ball_coord.top;
	//ball.style.left = initial_ball_coord.left;
	//ball_coord = ball.getBoundingClientRect()
	requestAnimationFrame(() => {moveBall(dx, dy, dxd, dyd);});
}


document.addEventListener('keydown', (e) => {
	if(e.key == 'Enter') {
		gameState = gameState == 'start' ? 'play' : 'start';
		
		if(gameState == 'play') {
			message.innerHTML = 'Game Started';
			message.style.left = 42 + 'vw';
			requestAnimationFrame(() => {
				dx = myRandom(4, 3);
				dy = myRandom(4, 3);
				dxd = myRandom(4, 0);
				dyd = myRandom(4, 0);
				moveBall(dx, dy, dxd, dyd);
			});
		}
	}

	if(e.key == 'r') {restart();}

	if(gameState == 'play') {
		//opponent 1
		if(e.key == 'w') {
			paddle_1.style.top = Math.max(board_coord.top, paddle_1_coord.top - window.innerHeight * 0.06) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
		}
		if(e.key == 's') {
			//paddle_1.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_1_coord.top + window.innerHeight * 0.06) + 'px';
			paddle_1.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_1_coord.top + window.innerHeight * 0.06) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
		}
		
		//oppponent 2
		if(e.key == 'ArrowUp') {
			paddle_2.style.top = Math.max(board_coord.top, paddle_2_coord.top - window.innerHeight * 0.1) + 'px';
			paddle_2_coord = paddle_2.getBoundingClientRect();
		}
		if(e.key == 'ArrowDown') {
			paddle_2.style.top = Math.min(board_coord.bottom - paddle_common.height, paddle_2_coord.top + window.innerHeight * 0.1) + 'px';
			paddle_2_coord = paddle_2.getBoundingClientRect();
		}
	}
});


