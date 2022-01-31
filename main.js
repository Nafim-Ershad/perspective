let angle = 0;
let points = [];
let distance = 1;
let perspective = [
    [1, 0, 0],
    [0, 1, 0]
]

function drawPoints(vertices, weight = 5) {
    for (let i = 0; i < vertices.length; i++) {
        stroke(255);
        strokeWeight(weight);
        point(vertices[i].x, vertices[i].y);
    }
}

function connect(i, j, point) {
    const a = point[i];
    const b = point[j];
    stroke(255);
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
}

function setup() {
    createCanvas(1366, 768);
    points[0] = new Vector3(0.5, -0.5, -0.5);
    points[1] = new Vector3(0.5, 0.5, -0.5);
    points[2] = new Vector3(-0.5, 0.5, -0.5);
    points[3] = new Vector3(-0.5, -0.5, -0.5);
    points[4] = new Vector3(0.5, -0.5, 0.5);
    points[5] = new Vector3(0.5, 0.5, 0.5);
    points[6] = new Vector3(-0.5, 0.5, 0.5);
    points[7] = new Vector3(-0.5, -0.5, 0.5);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    let projected = [];
    window.addEventListener("keypress", function(event) {
        switch (event.code) {
            case "KeyW":
                distance -= 0.00001;
                console.log(distance);
                break;
            case "KeyS":
                distance += 0.00001;
                console.log(distance);
                break;
            case "KeyD":
                angle -= 0.0001;
                console.log(angle);
                break;
            case "KeyA":
                angle += 0.0001;
                console.log(angle);
                break;
            default:
                console.log(event.code);
                break;
        }
    });
    let rotateZ = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ];
    let rotateX = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ];
    let rotateY = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ];
    for (let i = 0; i < points.length; i++) {

        // let rotated = matrixMultiplication(rotateZ, points[i]);
        let rotated = matrixMultiplication(rotateY, points[i]);
        // rotated = matrixMultiplication(rotateY, rotated);
        let p = distance / (distance + rotated.z);
        // let p = distance / (distance + points[i].z);
        perspective = [
            [p, 0, 0],
            [0, p, 0],
            [0, 0, p]
        ];
        // rotated = matrixMultiplication(rotateX, rotated);
        let projected2d = matrixMultiplication(perspective, rotated);
        // let projected2d = matrixMultiplication(perspective, points[i]);
        projected.push(matrixScale3D(200, projected2d));
    }
    drawPoints(projected, 10);
    for (let i = 0; i < 4; i++) {
        connect(i, (i + 1) % 4, projected);
        connect(i + 4, (i + 1) % 4 + 4, projected);
        connect(i, (i + 4), projected);
    }

    // angle += 0.03;
}