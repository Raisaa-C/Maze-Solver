const rows = 20;
const cols = 20;

let grid = [];
let start = null;
let end = null;
let mode = "wall";

const gridElement = document.getElementById("grid");

function createGrid(){

for(let r=0;r<rows;r++){

grid[r]=[];

for(let c=0;c<cols;c++){

let cell = document.createElement("div");
cell.classList.add("cell");

cell.dataset.row = r;
cell.dataset.col = c;

cell.addEventListener("click",cellClick);

gridElement.appendChild(cell);

grid[r][c] = 0;

}
}

}

function cellClick(){

let r = parseInt(this.dataset.row);
let c = parseInt(this.dataset.col);

if(mode==="wall"){
this.classList.toggle("wall");
grid[r][c] = this.classList.contains("wall") ? 1 : 0;
}

else if(mode==="start"){

if(start) start.classList.remove("start");

this.classList.add("start");
start = this;

}

else if(mode==="end"){

if(end) end.classList.remove("end");

this.classList.add("end");
end = this;

}

}

function setMode(m){
mode = m;
}

function clearGrid(){

document.querySelectorAll(".cell").forEach(cell=>{
cell.classList.remove("wall","path","start","end");
});

grid = [];
gridElement.innerHTML = "";

start = null;
end = null;

createGrid();
}

function solveMaze(){

if(!start || !end){
alert("Set start and end!");
return;
}

let sr = parseInt(start.dataset.row);
let sc = parseInt(start.dataset.col);

let er = parseInt(end.dataset.row);
let ec = parseInt(end.dataset.col);

let queue = [[sr,sc]];
let visited = Array(rows).fill().map(()=>Array(cols).fill(false));
let parent = {};

visited[sr][sc] = true;

let directions = [[1,0],[-1,0],[0,1],[0,-1]];

while(queue.length>0){

let [r,c] = queue.shift();

if(r===er && c===ec) break;

for(let [dr,dc] of directions){

let nr = r+dr;
let nc = c+dc;

if(nr>=0 && nc>=0 && nr<rows && nc<cols){

if(!visited[nr][nc] && grid[nr][nc]===0){

visited[nr][nc]=true;

parent[nr+","+nc] = [r,c];

queue.push([nr,nc]);

}

}

}

}

let path = [];
let cur = [er,ec];

while(cur){

path.push(cur);
cur = parent[cur[0]+","+cur[1]];

}

path.reverse();

for(let [r,c] of path){

let cell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);

if(!cell.classList.contains("start") && !cell.classList.contains("end")){
cell.classList.add("path");
}

}

}

createGrid();