const fs = require('fs');

function gaussianEliminationGF2(matrix){
    const rows = matrix.length;
    const cols = matrix[0].length - 1;
    let currentRow = 0;
    const pivotCols = [];

    for(let col = 0; col < cols; col++){
        let pivotRow = -1;
        
        for(let row = currentRow; row < rows; row++){
            if(matrix[row][col] === 1){
                pivotRow = row;
                break;
            }
        }

        if(pivotRow === -1) continue;

        [matrix[currentRow], matrix[pivotRow]] = [matrix[pivotRow], matrix[currentRow]];

        for(let row = 0; row < rows; row++){
            if(row !== currentRow && matrix[row][col] === 1){
                for(let c = 0; c < matrix[row].length; c++){
                    matrix[row][c] ^= matrix[currentRow][c];
                }
            }
        }

        pivotCols.push(col);
        currentRow++;
    }

    return pivotCols;
}

function findMinimumSolution(matrix, pivotCols, numButtons){
    const cols = matrix[0].length - 1;
    const freeCols = [];

    for(let col = 0; col < numButtons; col++){
        if(!pivotCols.includes(col)){
            freeCols.push(col);
        }
    }

    const numFreeVars = freeCols.length;
    let minPresses = Infinity;

    for(let mask = 0; mask < (1 << numFreeVars); mask++){
        const buttonPressed = new Array(numButtons).fill(0);

        for(let i = 0; i < numFreeVars; i++){
            buttonPressed[freeCols[i]] = (mask >> i) & 1;
        }

        for(let row = matrix.length - 1; row >= 0; row--){
            let pivotCol = -1;
            for(let col = 0; col < cols; col++){
                if (matrix[row][col] === 1) {
                    pivotCol = col;
                    break;
                }
            }

            if(pivotCol === -1) continue;

            let value = matrix[row][cols];

            for(let col = pivotCol + 1; col < numButtons; col++){
                value ^= (matrix[row][col] * buttonPressed[col]);
            }

            buttonPressed[pivotCol] = value;
        }

        const presses = buttonPressed.reduce((sum, val) => sum + val, 0);
        minPresses = Math.min(presses, minPresses);
    }

    return minPresses;
}

function part_1(input){
    let totalPresses = 0;

    for(const machine of input){
        const {lights, matrix} = machine;
        const numButtons = matrix[0].length;
        const augmentedMatrix = matrix.map((row, i) => [...row, lights[i]]);
        const pivotCols = gaussianEliminationGF2(augmentedMatrix);
        const minPresses = findMinimumSolution(augmentedMatrix, pivotCols, numButtons);
        totalPresses += minPresses;
    }

    return totalPresses;
}

const lines = fs.readFileSync("input-18.txt", "utf-8").split("\n");

const input = lines.map(line => {
    const [, lightsInput, buttonsInput, joltage] = line.match(/\[([\.#]+)\]\s+((?:\([0-9,]+\)\s*)+)(\{[0-9,]+\})/);
    const lights = lightsInput.split('').map(light => light === '#' ? 1 : 0);
    const buttons = buttonsInput.split(" ").filter(b => b.trim() !== "");
    const matrix = Array(lights.length).fill().map(() => Array(buttons.length).fill(0));

    buttons.forEach((button, buttonIdx) => {
        const lightIndices = button.slice(1, -1);
        lightIndices.split(',').forEach(lightNum => {
            matrix[parseInt(lightNum)][buttonIdx] = 1;
        });
    });

    return {lights, matrix, joltage};
});

const ans = part_1(input);
console.log(ans);