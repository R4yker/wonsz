/**
 * @type {HTMLElement}
 */
const wrap = document.querySelector("#wrap");
/**
 * @type {HTMLElement}
 */
const ui = document.querySelector("#ui");
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const height = canvas.height = canvas.offsetHeight;
const width = canvas.width = canvas.offsetWidth;

const cellSize = 20; // in pixels

const offsetX = Math.floor((width % cellSize) / 2);
const offsetY = Math.floor((height % cellSize) / 2);

const board = {
	width: Math.floor(width / cellSize),
	height: Math.floor(height / cellSize),
	render: ()=>{
		/* tu trzeba narysować ramkę i zamalować planszę */	
		ctx.fillStyle="black";
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle="white";
		ctx.fillRect(offsetX,offsetY,cellSize*board.width,cellSize*board.height);
	}
}

const snake = {
	sections:[],
	direction:'right',
	addHead:(x,y)=>{
		/* tu trzeba dodać głowę! */
		snake.sections = [Section(x,y)].concat(snake.sections);
		if(snake.sections.length > 1) snake.sections[1].head = false;
	},
	removeTail(){
		/* tu trzeba usunąć ogon */
		if(snake.sections.length > 1) snake.sections.pop();
	},
	render:()=>{
		/* tu trzeba narysować wszystkie moduły  */
		snake.sections.forEach(renderSection);
	}
}
function Section(x,y) {
	return {
		x,
		y,
		head:true
	}
}
function renderSection(section){
	/* tu trzeba narysowac moduł */ 
	ctx.fillStyle = section.head ? "#FF331F" : "#A5BE00";
	
	ctx.fillRect (offsetX+section.x*cellSize,offsetY+section.y*cellSize,cellSize,cellSize);
}
function move(directionOverwrite) {
	let {x,y} = snake.sections[0];
	if(snake.direction === 'right') x++;
	if(snake.direction === 'left') x--;
	if(snake.direction === 'down') y++;
	if(snake.direction === 'up') y--;

		for(const el of snake.sections){
			if(el.x === x && el.y === y) gameover();
		}
	// dodać głowę
	snake.addHead(x,y);
	// usunąć ogon
	snake.removeTail(x,y);

	//const finalDirection = directionOverwrite || snake.direction;
}

const stats = {
	speed: 1, // cells per second
	points: 0
}

let timeoutID = 0;
function step(){
	// przesunąć wonsza
	move()
	// narysować planszę
	board.render()
	// narysować wonsza
	snake.render();
	// zrobic 
	

	//Speed of wonsz

 
	if(gameOngoing) timeoutID = setTimeout(step,100*(1/stats.speed));
}

function init(){
	// narysować początkowego wonsza
	// narysować planszę
	// narysowac wonsza
	let x = Math.floor(board.width/2)
	let y = Math.floor(board.height/2)

	snake.addHead(x-5,y);
	snake.addHead(x-4,y);
	snake.addHead(x-3,y);
	snake.addHead(x-2,y);
	snake.addHead(x-1,y);
	snake.addHead(x,y);
	board.render();
	snake.render();


}

init();

let gameOngoing = false;

function arrow(direction){
	if(direction === "ArrowUp" && snake.direction !== "down"){
		snake.direction = "up";
	}
	if(direction === "ArrowDown" && snake.direction !== "up"){
		snake.direction = "down";
	}
	if(direction === "ArrowLeft" && snake.direction !== "right"){
		snake.direction = "left";
	}
	if(direction === "ArrowRight" && snake.direction !== "left"){
		snake.direction = "right";
	}
}

window.addEventListener("keydown", e =>{
	if(event.code === "Space" && !gameOngoing){
		gameOngoing = true;
		step();
	}

	if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.code))
		arrow(e.code);
	this.console.log(event.code);

	})


	function gameover(){
		clearTimeout(timeoutID);
		canvas.remove();
		gameOngoing - false;
		const iframe = `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BhB2ZcXWJDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
		const el = document.createElement("div");
		el.id = "game";
		el.innerHTML = iframe;
		document.querySelector("#wrap").appendChild(el);
	}
