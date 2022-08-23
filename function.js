var canvas = document.querySelector("canvas");
var ctx =  canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0,'red');
gradient.addColorStop(0.2,'yellow');
gradient.addColorStop(0.4,'green');
gradient.addColorStop(0.6,'cyan');
gradient.addColorStop(0.8,'blue');
gradient.addColorStop(1,'magenta');


class Symbol{
    constructor(x,y,fontSize, canvasHeiht){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.x =x 
        this.y = y
        this.fontSize= fontSize
        this.text =''
        this.canvasHeiht = canvasHeiht
    }
    draw(context){
        this.text= this.characters.charAt(Math.floor(Math.random()*this.characters.length))
        
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize)
        if (this.y * this.fontSize > this.canvasHeiht && Math.random()> 0.98){
            this.y = 0
        }else{
            this.y+=1
        }
    }
}

class Effect{
    constructor(canvasWidth, canvasHeiht){
        this.canvasWidth=canvasWidth
        this.canvasHeiht = canvasHeiht
        this.fontSize = 25
        this.colums = this.canvasWidth/this.fontSize
        this.symbols = []
        this.#initialize()
        console.log(this.symbols)
        

    }
    #initialize(){
        for(let i=0;i< this.colums;i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeiht)
          
        }
    }
    resize(width,height){
        this.canvasHeiht=height
        this.canvasWidth=width
        this.colums=this.canvasWidth/this.fontSize
        this.symbols = []
        this.#initialize()
    }
}



const effect = new Effect(canvas.width, canvas.height)
let lasttime = 0
const fps=160
const nextFrame = 1000/fps
let timer = 0
function animate(timeStamp){

    const deltaTime = timeStamp - lasttime
    lasttime = timeStamp
    if (timer>nextFrame){
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.textAlign='center'
   
    ctx.font = effect.fontSize + 'px monospace'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle=gradient 
    effect.symbols.forEach(symbol => symbol.draw(ctx))
    timer=0
    }else{
        timer += deltaTime
    }
    requestAnimationFrame(animate)

}
animate(0)

window.addEventListener('resize', function(){
    canvas.width=innerWidth
    canvas.height = innerHeight;
    effect.resize(canvas.width, canvas.height)

})

