'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */

function maximumPerimeterTriangle(sticks) {
   
     // Write your code here
    let triangle = []
    sticks.sort((a,b) => a - b)
    
    for(let i =0; i < sticks.length -2;i++){
        if(sticks[i] + sticks[i+1] > sticks[i+2] ){
            const maybeTriangle = []
            maybeTriangle.push(sticks[i])
            maybeTriangle.push(sticks[i+1])
            maybeTriangle.push(sticks[i+2])
            triangle.push(maybeTriangle)
        }
    }
    console.log(triangle)
    if(triangle.length ===0){
        return [-1]
    }
    else{
       
        triangle = triangle.sort((a,b)=>{
            const sumA = a.reduce((acc,val) => acc+val,0)
            const sumB = b.reduce((acc,val) => acc+val,0)
            return sumA - sumB
        })
        console.log(triangle)
        return triangle[triangle.length-1]
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const sticks = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
