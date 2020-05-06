var THREE = require("three");

export class CustomArrow {
    constructor(tailVector, tipVector) {

        this.arrow = new THREE.Group();

        this.head_width = .15;
        this.head_length = .3;
        this.tailVector = tailVector;
        this.tipVector = tipVector;
        
        // Array Head (cone)
        var geometry = new THREE.ConeGeometry(this.head_width, this.head_length, 5);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.cone = new THREE.Mesh(geometry, material);
        this.arrow.add(this.cone);

        this.cone.geometry.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(Math.PI / 2, Math.PI, 0)));

        var resultantVector = tipVector.clone().add(tailVector.clone().negate());
        resultantVector.multiplyScalar(1 - ((this.head_length / 2) / resultantVector.length()))
        var newTipVector = tailVector.clone().add(resultantVector);

        this.cone.position.x = newTipVector.x;
        this.cone.position.y = newTipVector.y;
        this.cone.position.z = newTipVector.z;
        this.cone.lookAt(tipVector);

        var points_line = [];
        points_line.push(tailVector);
        points_line.push(new THREE.Vector3(resultantVector.x + tailVector.x, resultantVector.y + tailVector.y, resultantVector.z + tailVector.z));

        var geometry_edge = new THREE.BufferGeometry().setFromPoints(points_line);

        var material_line = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 1.2
        });

        this.line = new THREE.Line(geometry_edge, material_line);
        this.arrow.add(this.line);
    }

    translate(tailVector, tipVector) {
        var resultantVector = tipVector.clone().add(tailVector.clone().negate());
        resultantVector.multiplyScalar(1 - ((this.head_length / 2) / resultantVector.length()))
        var newTipVector = tailVector.clone().add(resultantVector);

        this.cone.position.x = newTipVector.x;
        this.cone.position.y = newTipVector.y;
        this.cone.position.z = newTipVector.z;
        this.cone.lookAt(tipVector);
        this.line.position.set(tailVector.x, tailVector.y, tailVector.z, resultantVector.x + tailVector.x, resultantVector.y + tailVector.y, resultantVector.z + tailVector.z);
    }

    resetPosition() {
        this.translate(this.tailVector, this.tipVector);
    }

    setVisible(visible) {
        this.cone.material.visible = visible;
        this.line.material.visible = visible;
    }
}

