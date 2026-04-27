const { version } = require("react");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//constant math bhalue
const n = 1000;
const dt = 0.2;
const frictionadhalife = 0.040;
const rMax = 0.1;
const m = 6;
const matrix = getrandom();

const frifact = Math.pow(x=0.5, y=dt/frictionadhalife);
function getrandom(){
    const row = [];
    for(let i =0;i<m;i++){
        const rows = [];
        for(let j = 0;j<m;j++){
            rows.push(Math.random() *2 -1);
        }
        row.push(rows);
    }
    return row;
}

// tej karne ke liyea storing values as list not objects

const color = new Int32Array(n);
const posX = new Float32Array(n);
const posY = new Float32Array(n);
const velX = new Float32Array(n);
const velY = new Float32Array(n);

for(let i = 0 ; i < n ;i++){
    color[i] = Math.floor(Math.random() * m);
    posX[i] = Math.random();
    posY[i] = Math.random();
    velX[i] = 0;
    velY[i] = 0;
}


function force(){
    const b = 0.3;
    if(r<b){
        return r/beta-1;
    }else if( b < r && r<1){
        return a*(1-Math.abs(2*r-1-b)/(1-b));
    }else{
        return 0;
    }
}



function updatepar(){
    //vel
    for(let i = 0; i< n;i++){
        let tfx = 0;
        let tfy = 0;
        for(let j = 0 ; j < n ; j++){
            if( j===i ) continue;
            const rx = posX[j] - posX[i];
            const ry = posY[j] - posX[i];
            const r = Math.hypot(rx,ry);
            if(r>0 && r<rMax){
                const f = force(r/rMax, matrix[color[i]][color[j]]);
                tfx +=rx/r*f;
                tfy +=ry/r*f
            }
        }

        tfx *= rMax;
        tfy *= rMax;

        velX[i] *= frifact;
        velY[i] *= frifact;

        velX[i] += tfx * dt;
        velY[i] += tfy * dt;
    }
    //pos
    for(letj =0 ; j<n;j++){
        posX[i] += velX[i] * dt;
        posY[i] += velY[i] * dt;
    }
}

//bar bar draw krne ke liyea loop 
function loop(){
    //updations
    updatepar();
    //chitarkari
    ctx.fillStyle = "white";
    ctx.fillRect(x=0, y=0, canvas.width, canvas.height);
    for(let i =0;i<n;i++){
        ctx.beginPath();
        const screenX = posX[i] * canvas.width;
        const screenY = posY[i] * canvas.height;
        ctx.arc(screenX, screenY, radius = 1, startAngle=0 , endAngle = 2 * Math.PI);
        ctx.fillStyle = `hsl(${360*(color[i]/m)}.100%,50%)`;
        ctx.fill();
    }
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);