function matrixMultiplication(matrix, vector) {
    let m = [];
    if (typeof vector.z !== "undefined") {
        let len = matrix[0].length;
        let v = [vector.x, vector.y, vector.z, vector.w];
        switch (len) {
            case 3:
                for (let i = 0; i < matrix.length; i++) {
                    let comp = 0;
                    for (let j = 0; j < len; j++) {
                        comp += (matrix[i][j] * v[j]);
                    }
                    m.push(comp);
                }
                m.push(vector.w);
                break;
            case 4:
                for (let i = 0; i < matrix.length; i++) {
                    let comp = 0;
                    for (let j = 0; j < len; j++) {
                        comp += (matrix[i][j] * v[j]);
                    }
                    m.push(comp);
                }
                break;
            default:
                throw window.alert("Cannot do matrix multiplication if columns are not 3 or 4");
        }
    } else {
        window.alert("Please enter z-component for the vector for multiplication");
    }
    return new Vector3(m[0], m[1], m[2], m[3]);
}

function matrixScale3D(scale = 1, vector = new Vector3()) {
    let x, y, z;
    x = vector.x * scale;
    y = vector.y * scale;
    z = vector.z * scale;

    return new Vector3(x, y, z);
}

class Vector3 {
    constructor(x = 1, y = 1, z = 1, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    scale3(num) {
        this.x *= num;
        this.y *= num;
        this.z *= num;
    }
    scale2(num) {
        this.x *= num;
        this.y *= num;
    }
}