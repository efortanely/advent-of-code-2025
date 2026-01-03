const fs = require('fs');
const { makeSet, find, union } = require('@manubb/union-find');

function distance3D(p1, p2){
    const dx = BigInt(p1.x) - BigInt(p2.x);
    const dy = BigInt(p1.y) - BigInt(p2.y);
    const dz = BigInt(p1.z) - BigInt(p2.z);
    return dx*dx + dy*dy + dz*dz;
}

function solve(points, connections){
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

const lines = fs.readFileSync("input-14.txt", "utf-8")
    .split("\n")
    .filter(line => line.trim() !== "");

solve(lines.map(line => {
        const [x, y, z] = line.split(",").map(Number);
        return {x, y, z}
    }),
    1000
);