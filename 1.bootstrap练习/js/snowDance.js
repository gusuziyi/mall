$(window).on('load',function() {
	init();
	
	
});

function init() {
	let canvas=document.getElementById("canvas");
	let ctx=canvas.getContext('2d');
	canvas.height=700;
	canvas.width=1000;
	canvas.style.backgroundColor="#000";

	class Ball{
		constructor(x,y,color){
			this.x=x;
			this.y=y;
			this.r=40;
			this.color=color;
		}
		create(){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.restore();
		}
	}

	class MoveBall extends Ball{
		constructor(x,y,color){
			super(x,y,color)
		}
		
		update(color){
			let dx=Math.random()*6-3; //-3,3
			let dy=Math.random()*6-3;
			let dr=Math.random()*2+1; // 1,3
			this.x+=dx;
			this.y+=dy;
			this.r-=dr;
			if(this.r<0)
				this.r=0;
		}
	}
	let ballArr=[];
	canvas.addEventListener('mousemove',(e)=>{
		let colorArr=['red','blue','green','purple','pink','yellow'];
		let color=colorArr[Math.floor(Math.random()*6)];
		let ball=new MoveBall(e.offsetX,e.offsetY,color);
		ballArr.push(ball);
	});


	setInterval(function () {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ballArr.forEach((ball)=>{
			ball.create();
			ball.update();
		});
	}, 50);
	
}