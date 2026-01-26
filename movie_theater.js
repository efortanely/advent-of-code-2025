const fs = require('fs');

function area(coord_1, coord_2){
    return (Math.abs(coord_1.x - coord_2.x) + 1) * (Math.abs(coord_1.y - coord_2.y) + 1);
}

function part_1(coords){
    let maxArea = -Infinity;
    
    for(let i = 0; i < coords.length; i++){
        for(let j = i + 1; j < coords.length; j++){
            maxArea = Math.max(maxArea, area(coords[i], coords[j]));
        }
    }

    return maxArea;
}

function part_2(coords){
    const horizontalEdgesByY = new Map();
    const verticalEdgesByX = new Map();

    for(let i = 0; i < coords.length; i++){
        const p1 = coords[i];
        const p2 = coords[(i + 1) % coords.length];

        if(p1.x === p2.x){
            const edge = {
                x: p1.x,
                minY: Math.min(p1.y, p2.y),
                maxY: Math.max(p1.y, p2.y)
            };

            (verticalEdgesByX.get(p1.x) ?? verticalEdgesByX.set(p1.x, []).get(p1.x)).push(edge);
        } else if(p1.y === p2.y){
            const edge = {
                y: p1.y,
                minX: Math.min(p1.x, p2.x),
                maxX: Math.max(p1.x, p2.x)
            };

            (horizontalEdgesByY.get(p1.y) ?? horizontalEdgesByY.set(p1.y, []).get(p1.y)).push(edge);
        }
    }

    const allVerticalEdges = Array.from(verticalEdgesByX.values())
        .flat()
        .sort((a, b) => a.x - b.x);

    for(const edges of horizontalEdgesByY.values()){
        edges.sort((a, b) => a.minX - b.minX);
    }

    for(const edges of verticalEdgesByX.values()){
        edges.sort((a, b) => a.minY - b.minY);
    }

    function isOnEdge(x, y){
        const hEdges = horizontalEdgesByY.get(y);

        if(hEdges){
            for(const edge of hEdges){
                if(x < edge.minX){
                    break;
                }

                if(x <= edge.maxX){
                    return true;
                }
            }
        }

        const vEdges = verticalEdgesByX.get(x);
        if(vEdges){
            for(const edge of vEdges){
                if(y < edge.minY){
                    break;
                }
                if(y <= edge.maxY){
                    return true;
                }
            }
        }

        return false;
    }

    function isInside(x, y){
        if(isOnEdge(x, y)){
            return true;
        }
        
        let crossings = 0;
        let left = 0;
        let right = allVerticalEdges.length;

        while(left < right){
            const mid = Math.floor((left + right) / 2);

            if(allVerticalEdges[mid].x <= x){
                left = mid + 1;
            }else{
                right = mid;
            }
        }

        for(let i = left; i < allVerticalEdges.length; i++){
            const edge = allVerticalEdges[i];

            if(y >= edge.minY && y < edge.maxY){
                crossings++;
            }
        }

        return crossings % 2 === 1;
    }

    function isRectangleValid(coord_1, coord_2){
        const minX = Math.min(coord_1.x, coord_2.x);
        const maxX = Math.max(coord_1.x, coord_2.x);
        const minY = Math.min(coord_1.y, coord_2.y);
        const maxY = Math.max(coord_1.y, coord_2.y);

        if(!isInside(minX, minY) || !isInside(maxX, minY) ||
           !isInside(minX, maxY) || !isInside(maxX, maxY)){
            return false;
        }

        for(let x = minX; x <= maxX; x++){
            if(!isInside(x, minY) || !isInside(x, maxY)){
                return false;
            }
        }
        
        for(let y = minY + 1; y < maxY; y++){
            if(!isInside(minX, y) || !isInside(maxX, y)){
                return false;
            }
        }

        return true;
    }

    let maxArea = -Infinity;

    for(let i = 0; i < coords.length; i++){
        for(let j = i + 1; j < coords.length; j++){
            if(isRectangleValid(coords[i], coords[j])){
                const width = Math.abs(coords[i].x - coords[j].x) + 1;
                const height = Math.abs(coords[i].y - coords[j].y) + 1;
                const area = width * height;
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}

const lines = fs.readFileSync("input-15.txt", "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "");;

let ans = part_1(lines.map(line => {
        const [x, y] = line.split(",").map(Number);
        return {x, y};
    })
);

console.log(ans);

ans = part_2(lines.map(line => {
        const [x, y] = line.split(",").map(Number);
        return {x, y};
    })
);

console.log(ans);