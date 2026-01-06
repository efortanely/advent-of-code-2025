const fs = require('fs');
const { makeSet, find, union } = require('@manubb/union-find');

function distance3D(p1, p2){
    const dx = BigInt(p1.x) - BigInt(p2.x);
    const dy = BigInt(p1.y) - BigInt(p2.y);
    const dz = BigInt(p1.z) - BigInt(p2.z);
    return dx*dx + dy*dy + dz*dz;
}

function solve_1(points, connections){
    const n = points.length;
    const sets = Array.from({length: n}, () => makeSet());

    function getComponentSizes(){
        const sizes = new Map();

        for(let i = 0; i < n; i++){
            const root = find(sets[i]);
            sizes.set(root, (sizes.get(root) || 0) + 1);
        }

        return Array.from(sizes.values());
    }

    const edges = [];

    for(let i = 0; i < n; i++){
        for(let j = i + 1; j < n; j++){
            edges.push({
                i,
                j,
                dist: distance3D(points[i], points[j])
            });
        }
    }

    edges.sort((a, b) => {
        if (a.dist < b.dist) return -1;
        if (a.dist > b.dist) return 1;
        return 0;
    });

    for(let k = 0; k < connections && k < edges.length; k++){
        union(sets[edges[k].i], sets[edges[k].j]);
    }

    const sizes = getComponentSizes();
    sizes.sort((a, b) => b - a);
    const top3 = sizes.slice(0, 3);
    const product = top3.reduce((x, y) => BigInt(x) * BigInt(y), 1n);
    console.log('Component sizes:', sizes);
    console.log('Top 3:', top3);
    console.log('Product:', product.toString());

    return product;
}

function solve_2(points){
    const n = points.length;
    const sets = Array.from({length: n}, () => makeSet());

    function getComponentSizes(){
        const sizes = new Map();

        for(let i = 0; i < n; i++){
            const root = find(sets[i]);
            sizes.set(root, (sizes.get(root) || 0) + 1);
        }

        return Array.from(sizes.values());
    }

    function getComponents(){
        const circuits = new Map();

        for(let i = 0; i < n; i++){
            const root = find(sets[i]);

            if(!circuits.has(root)){
                circuits.set(root, []);
            }

            circuits.get(root).push(i);
        }

        return Array.from(circuits.values());
    }

    const edges = [];

    for(let i = 0; i < n; i++){
        for(let j = i + 1; j < n; j++){
            edges.push({
                i,
                j,
                dist: distance3D(points[i], points[j])
            });
        }
    }

    edges.sort((a, b) => {
        if (a.dist < b.dist) return -1;
        if (a.dist > b.dist) return 1;
        return 0;
    });

    for(let k = 0; getComponentSizes().length > 2; k++){
        union(sets[edges[k].i], sets[edges[k].j]);
    }

    let circuits = getComponents();
    let minDist = Infinity;
    let xCoord, yCoord;

    for(let i = 0; i < circuits[0].length; i++){
        for(let j = 0; j < circuits[1].length; j++){
            let pointA = points[circuits[0][i]];
            let pointB = points[circuits[1][j]];
            let dist = distance3D(pointA, pointB);
            
            if(dist < minDist){
                minDist = dist;
                xCoord = pointA;
                yCoord = pointB;
            }
        }
    }

    const product = xCoord.x * yCoord.x;
    console.log('Coordinate 1:', xCoord);
    console.log('Coordinate 2:', yCoord);
    console.log('Product:', product.toString());

    return product;
}

const lines = fs.readFileSync("input-14.txt", "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "");

solve_1(lines.map(line => {
        const [x, y, z] = line.split(",").map(Number);
        return {x, y, z}
    }),
    1000
);

console.log();

solve_2(lines.map(line => {
        const [x, y, z] = line.split(",").map(Number);
        return {x, y, z}
    })
);