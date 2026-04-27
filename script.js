// const { version } = require("react");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//constant math bhalue
const n = 600;
const dt = 0.1;
const frictionadhalife = 0.04;
const rMax = 0.2;
const m = 6;
const matrix = getrandom();
const forcefact = 1;
const frifact = Math.pow(0.5, dt / frictionadhalife);
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


function force(r, a) {
    const beta = 0.3;

    if (r < beta) {
        return r / beta - 1;
    } else if (r < 1) {
        return a * (1 - Math.abs(2 * r - 1 - beta) / (1 - beta));
    } else {
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
            const ry = posY[j] - posY[i];
            
            const r = Math.hypot(rx,ry);
            if(r>0 && r<rMax){
                const f = force(r/rMax, matrix[color[i]][color[j]]);
                tfx +=rx/r*f;
                tfy +=ry/r*f
            }
        }

        tfx *= rMax *forcefact;
        tfy *= rMax *forcefact;

        velX[i] *= frifact;
        velY[i] *= frifact;

        velX[i] += tfx * dt;
        velY[i] += tfy * dt;
    }
    //pos
    for(let j =0 ; j <n;j++){
        posX[j] += velX[j] * dt;
        posY[j] += velY[j] * dt;
        posX[j] = (posX[j] + 1) % 1;
        posY[j] = (posY[j] + 1) % 1;
    }
}

//bar bar draw krne ke liyea loop 
function loop(){
    //updations
    updatepar();
    //chitarkari
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i =0;i<n;i++){
        ctx.beginPath();
        const screenX = posX[i] * canvas.width;
        const screenY = posY[i] * canvas.height;
        ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${360 * (color[i] / m)}, 100%, 50%)`;
        ctx.fill();
    }
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);