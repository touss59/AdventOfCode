function fileread(filename){            
    let fs = require("fs");  
    let contents= fs.readFileSync(filename,);
    return contents;
  } 

let input = fileread("day14.txt")
    .toString()
    .replace(/(\r)/gm, "")
    .split("\n\n");

let template = input[0].split('').map(c => c.toString());
let lows = new Map(input[1].split('\n').map(line => line.split(' -> ')));

console.log(solve(template,lows,40));

function solve(template,lows,numberStep){
    let memoization = {};    
    let globalCount = solve([template,0]);
    
    for(let i = 0; i < template.length; i++){
        globalCount[template[i]] = (globalCount[template[i]] || 0) + 1;
    }

    return getDiffMinMax(globalCount);

    function solve(templateWithStep){

        newTemplate = getNewTemplate(templateWithStep[0]);
        let count = getCount(templateWithStep[0], newTemplate);
    
    
        if(templateWithStep[1] === numberStep - 1){
            return count;
        }
    
        templateWithStep[0] = newTemplate;
        templateWithStep[1] += 1;
    
        for (let i = 0; i < templateWithStep[0].length - 1; i++){
            let caracts = [templateWithStep[0][i],templateWithStep[0][i+1]]
    
            let dataSaved = caracts.join()+','+ templateWithStep[1];
    
            let memoizedResult = memoization[dataSaved];
    
            if(memoizedResult === undefined){
                memoizedResult = solve([caracts,templateWithStep[1]]);
                memoization[dataSaved] = memoizedResult;
            }
    
            for(let key in memoizedResult){
                count[key] = (count[key] || 0) + memoizedResult[key];
            }
        }
    
        return count;
    }
    
    function getNewTemplate(template){
        let newTemplate = [];
        for(let i = 0; i < template.length; i++){
            newTemplate.push(template[i]);
    
            if( i != template.length - 1 ){
                let pair = template[i]+ template[i+1];
                let lowVal = lows.get(pair)
                if(lowVal !== undefined){
                    newTemplate.push(lowVal);
                }
            }
        }
        return newTemplate;
    }
    
    
    function getCount(oldTemplate, newTemplate){
        let counter = {};
        for(let i = 0; i < oldTemplate.length; i++){
            counter[oldTemplate[i]] = (counter[oldTemplate[i]] || 0) - 1;
        }
    
        for(let i = 0; i < newTemplate.length; i++){
            counter[newTemplate[i]] = (counter[newTemplate[i]] || 0) + 1;
        }
    
        return counter;
    }
    
    function getDiffMinMax(counter){
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;
    
        for(let key in counter){
            let val = counter[key];
            min = val < min ? val : min;
            max = val > max ? val : max;
        }
    
        return max - min;
    }

}