/* ------ JavaScript - HTML Canvas Particles 2 - Floating Particles ------ */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d'); // ctx is short for context.
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray; 

// create constructor function - these allow us to crreate many objects of the same type.
function Particle(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
// add draw method to particle prototype
Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color; 
    ctx.shadowColor = '#1f2d42'; // particle shadow colour #192436.
    ctx.shadowBlur = 20; // particle shadow blur.
    ctx.shadowOffsetX = 10; // particle shadow X offset.
    ctx.shadowOffsetY = 10; // particle shadow Y offset.
    ctx.fill();
}
// add update method to particle prototype.
Particle.prototype.update = function(){
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX; // gives particles movement.
    this.y += this.directionY;

    this.draw();
}
// create a particle array
function init() {
    particleArray = [];
    for (let i=0; i < 100; i++) { // change the amount of particles.
        let size = Math.random() * 20; // change this value to alter particle size.
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .4) - .2; // these values adjust the X direction
        let directionY = (Math.random() * .4) - .2; // these values adjust the Y direction
        let color = 'white'; // change this value to affect particle colour.

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
// animation loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i=0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();
// responsively resets particles to look correctly with window resize.
window.addEventListener('resze',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
)
