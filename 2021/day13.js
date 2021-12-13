function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day13.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n\n")
    .map((row) => row.split('-'));

let cells = input[0].toString().split('\n').map((cell) => cell.split(',').map(num => parseInt(num)));
let folds = input[1].toString().split('\n').map((action) => action.split('fold along ')[1].split('='));

showCells(solve(cells,folds));

function solve(cells,folds){
    for(let i = 0; i < folds.length; i++){
        cells = executeFold(cells,folds[i]);
        if(i === 0){
            let uniqCells = [...new Set(cells.map(cell => `${cell[0].toString()},${cell[1].toString()}`))];
            console.log(uniqCells.length);
        }
    }
    return cells;
}

function executeFold(cells,fold){
    let newCells = [];
    for (let i = 0; i < cells.length; i++) {
        if(cells[i][0] > fold[1] && fold[0] === 'x'){
            cells[i][0] = Math.abs(cells[i][0] - 2*fold[1]);
            newCells.push(cells[i]);
        } else if(cells[i][1] > fold[1] && fold[0] === 'y'){
            cells[i][1] = Math.abs(cells[i][1] - 2*fold[1]);
            newCells.push(cells[i]);
        } else if((fold[0] === 'x' && cells[i][0] < fold[1]) || (fold[0] === 'y' && cells[i][1] < fold[1])){
            newCells.push(cells[i]);
        }
    }
    return newCells;
}

function showCells(cells) {
    let show = [];

    let maxX = Math.max(...cells.flatMap((cell) => cell[0]));
    let maxY = Math.max(...cells.flatMap((cell) => cell[1]));

    for(y = 0; y <= maxY; y++){
        show.push([]);
        for(x = 0; x <= maxX; x++){
            show[y].push(' ');
        }
    }

    for(let cell of cells){
        show[cell[1]][cell[0]] = '#';
    }

    for(y = 0; y < show.length; y++){
        let line = '';
        for(x = 0; x < show[y].length; x++){
            line+=show[y][x];
        }
        console.log(line);
    }
}