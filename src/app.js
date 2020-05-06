var THREE = require("three");
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Sphere, RedIntegerFormat } from 'three';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import {CustomArrow} from "../src/arrow"

var scene, camera, renderer, orbit;
var perspective_camera;
var ball;
let sima, sial, upperMantle;
let groupSial = new THREE.Group();
let groupSima = new THREE.Group();
let groupUpperMantle = new THREE.Group();
var pointLight;
var readyCount = 0;
var readyCountMax = 8;

function init() {
    var view_3d = document.getElementById("view-3d");

    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    view_3d.style.width = 100 + "%"
    view_3d.style.height = height + "px";

    var position_info = view_3d.getBoundingClientRect();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.canvas = view_3d;
    renderer.setSize(position_info.width, position_info.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // the default

    renderer.localClippingEnabled = true;

    view_3d.appendChild(renderer.domElement);

    perspective_camera = new THREE.PerspectiveCamera(45, position_info.width / position_info.height, 1, 1000);

    camera = perspective_camera;
    camera.position.set(25, 5, 25)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene = new THREE.Scene();

    orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.addEventListener("change", render)
    orbit.saveState();

    var waterBoundaryGeo = new THREE.PlaneBufferGeometry(19.98, 1.2, 1, 1);
    var waterBoundaryMat = new THREE.MeshBasicMaterial({ color: 0x069b91, transparent: true, opacity: .4, side: THREE.DoubleSide })

    var waterBoundaryGeo1 = new THREE.PlaneBufferGeometry(9, 1.4, 1, 1);
    var waterBoundary1 = new THREE.Mesh(waterBoundaryGeo1, waterBoundaryMat);
    waterBoundary1.rotateY(-Math.PI / 2)
    waterBoundary1.translateZ(9.99);
    waterBoundary1.translateX(5.49);
    waterBoundary1.translateY(3.8);
    groupSial.add(waterBoundary1)

    var waterBoundary2 = new THREE.Mesh(waterBoundaryGeo, waterBoundaryMat);
    waterBoundary2.translateZ(9.99);
    waterBoundary2.translateY(3.9);
    groupSial.add(waterBoundary2)

    var waterBoundaryGeo3 = new THREE.PlaneBufferGeometry(5.5, 1.2, 1, 1);
    var waterBoundary3 = new THREE.Mesh(waterBoundaryGeo3, waterBoundaryMat);
    waterBoundary3.rotateY(Math.PI / 2)
    waterBoundary3.translateZ(9.99);
    waterBoundary3.translateX(-7.24);
    waterBoundary3.translateY(3.9);
    groupSial.add(waterBoundary3)

    var mat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    var terrainTextureLoader = new THREE.TextureLoader();
    terrainTextureLoader.load("textures/texture14.jpg", function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = - 1;

        mat.map = texture;
        mat.needsUpdate = true;
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) { console.log(err) });

    var matSial = new THREE.MeshLambertMaterial({ color: 0xe8e4e1 });
    var sialTextureLoader = new THREE.TextureLoader();
    sialTextureLoader.load("textures/sial.jpg", function (texture) {
        matSial.map = texture;
        matSial.needsUpdate = true;
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) { console.log(err) });

    var sialLoader = new GLTFLoader();
    sialLoader.load("models/sial.glb", function (gltf) {
        sial = gltf.scene;

        sial.children[0].children[0].material = mat;
        sial.children[0].children[1].material = matSial;
        sial.children[0].children[2].material = matSial;
        sial.children[0].children[3].material = matSial;
        sial.children[0].children[4].material = matSial;
        sial.children[0].children[5].material = matSial;

        groupSial.add(sial);
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) {      console.error(err);     })

    var matSima = new THREE.MeshLambertMaterial({ color: 0xf9c6a2 });

    var simaTextureLoader = new THREE.TextureLoader();
    simaTextureLoader.load("textures/sema.jpg", function (texture) {

        matSima.map = texture;
        matSima.needsUpdate = true;
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) { console.log(err) });


    var simaLoader = new GLTFLoader();
    simaLoader.load("models/sema.glb", function (gltf) {
        sima = gltf.scene;

        sima.children[0].children[0].material = matSima;
        sima.children[0].children[1].material = matSima;
        sima.children[0].children[2].material = matSima;
        sima.children[0].children[3].material = matSima;
        sima.children[0].children[4].material = matSima;
        sima.children[0].children[5].material = matSima;

        groupSima.add(sima);
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) {      console.error(err);     })

    var matUpperMantle = new THREE.MeshLambertMaterial({ color: 0xf9c6a2 });

    var upperMantleTextureLoader = new THREE.TextureLoader();
    upperMantleTextureLoader.load("textures/upperMantle.jpg", function (texture) {

        matUpperMantle.map = texture;
        matUpperMantle.needsUpdate = true;
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }


    }, undefined, function (err) { console.log(err) });


    var upperMantleLoader = new GLTFLoader();
    upperMantleLoader.load("models/upperMantle.glb", function (gltf) {
        upperMantle = gltf.scene;

        upperMantle.children[0].children[0].material = matUpperMantle;
        upperMantle.children[0].children[1].material = matUpperMantle;
        upperMantle.children[0].children[2].material = matUpperMantle;
        upperMantle.children[0].children[3].material = matUpperMantle;
        upperMantle.children[0].children[4].material = matUpperMantle;
        upperMantle.children[0].children[5].material = matUpperMantle;

        groupUpperMantle.add(upperMantle)
        
        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    }, undefined, function (err) {      console.error(err);     })


    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);


    var textureLoader = new THREE.TextureLoader();

    var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
    var flowMap = textureLoader.load('textures/Water_1_M_Flow.jpg');

    var water = new Water(waterGeometry, {
        scale: 2,
        textureWidth: 512,
        textureHeight: 512,
        flowMap: flowMap,
        color: 0x93d9ff,
        opacity: .2,
    });

    water.position.y = 4.5;
    water.rotation.x = Math.PI * - 0.5;
    groupSial.add(water);
    
    addLabels();
    // isPlaying = true;
    // animate();
}

let labels = ["တိုက္ၾကီးမ်ားေအာက္ရွိ \n      အေပၚယံလႊာ", "ဆီအယ္", "ကမၻာ႔အေပၚယံလႊာ", "ဆီမာ", "ကမၻာ႔အေပၚယံလႊာ", "ကမၻာ႔ၾကားလႊာအေပၚပိုင္း", "သမုဒၵရာေအာက္ခင္းရွိ \n  ကမၻာ႔အေပၚယံလႊာ"]
let labelLocs = [[10.02, 4.3, -3], [10.02, 4.4, 2], [10.02, 2.4, 7], [10.02, 2.4, 2.5], [10.02, 2.2, -6.5], [10.02, -1, 4], [5.01, 5.6, 10.02]]
let labelColors = [0x000000, 0x000000, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff]
let indexArrows = [0, 2, 4, 5, 6];
let lengthArrows = [[1.4, 2.5], [.6, .9], [.75, .9], [2.25, 2.55], [0, 2.2]];
let offsetArrows = [[.4, 1], [.17, .14], [.15, .15], [.25, .4], [.3, 1]];
let groupsToAdd = [groupSial, groupSial, groupSima, groupSima, groupSima, groupUpperMantle, groupSial]

function addLabels() {
    var fontLoader = new THREE.FontLoader();
    fontLoader.load('styles/Zawgyi-One_Regular.json', function (font) {

        for (var i = 0; i < 7; i++) {
            var materialLabel = new THREE.MeshBasicMaterial({
                color: labelColors[i],
            });

            var labelShape = font.generateShapes(labels[i], .35);

            var geometryLabel = new THREE.ShapeBufferGeometry(labelShape);
            geometryLabel.computeBoundingBox();

            var labelText = new THREE.Mesh(geometryLabel, materialLabel);

            var xMid = - (geometryLabel.boundingBox.max.x - geometryLabel.boundingBox.min.x);
            geometryLabel.translate(xMid / 2, -.1, 0);

            labelText.rotateY(Math.PI / 2);

            labelText.position.x = labelLocs[i][0]
            labelText.position.y = labelLocs[i][1]
            labelText.position.z = labelLocs[i][2]
            
            groupsToAdd[i].add(labelText);
        }

        for(var i = 0; i < indexArrows.length; i++){
            if (lengthArrows[i][0] != 0){
                let tailVectorUpper = new THREE.Vector3(labelLocs[indexArrows[i]][0], labelLocs[indexArrows[i]][1] + offsetArrows[i][0], labelLocs[indexArrows[i]][2]);
                let tipVectorUpper = new THREE.Vector3(labelLocs[indexArrows[i]][0], labelLocs[indexArrows[i]][1] + lengthArrows[i][0], labelLocs[indexArrows[i]][2]);
                let arrow1 = new CustomArrow(tailVectorUpper, tipVectorUpper);
                groupsToAdd[indexArrows[i]].add(arrow1.arrow);
            }
            if (lengthArrows[i][1] != 0){
                let tailVectorLower = new THREE.Vector3(labelLocs[indexArrows[i]][0], labelLocs[indexArrows[i]][1] - offsetArrows[i][1], labelLocs[indexArrows[i]][2]);
                let tipVectorLower = new THREE.Vector3(labelLocs[indexArrows[i]][0], labelLocs[indexArrows[i]][1] - lengthArrows[i][1], labelLocs[indexArrows[i]][2]);
                
                let arrow2 = new CustomArrow(tailVectorLower, tipVectorLower);
                groupsToAdd[indexArrows[i]].add(arrow2.arrow);
            }
        }

        readyCount += 1;
        if (readyCount == readyCountMax) {  finishedLoading();  }

    })

}
var isPlaying = false;
var animationId;
function animate() {
    if(isPlaying){
        animationId = requestAnimationFrame(animate);
    }
    else{
        cancelAnimationFrame(animationId);
        return;
    }
    
    render();
}

function finishedLoading(){
    scene.add(groupSial);
    scene.add(groupSima);
    scene.add(groupUpperMantle);

    isPlaying = true;
    $(".dimmer").dimmer('hide');
    animate();
    
}

function resumeAnimation(){
    isPlaying = true;
    animate();
}

function pauseAnimation(){
    isPlaying = false;
}

var isSeperated = false;
var currentHeight;

function seperateLayers(){
    currentHeight = groupSial.position.y;
    if (isSeperated){
        isSeperated = false;
        mode = -1; 
    }
    else{
        isSeperated = true;
        mode = 1;
    }
    clockToSep.start();
    seperate();
}

const tToSep = 4;
const dToSep = 5;
let clockToSep = new THREE.Clock(false);
var sepAnimationId;
var currentY;
var mode = 1;
function seperate(){
    sepAnimationId = requestAnimationFrame(seperate);

    currentY = currentHeight + ((clockToSep.getElapsedTime() * tToSep) * mode);

    if (currentY > dToSep){
        currentY = dToSep;
        cancelAnimationFrame(sepAnimationId);
    }
    else if(currentY < 0){
        currentY = 0;
        cancelAnimationFrame(sepAnimationId);
    }

    groupSial.position.set(0, currentY, 0);
    groupUpperMantle.position.set(0, -currentY, 0);
}

function setLayerVisible(layerIndex, visible){
    if(layerIndex == 0){
        groupSial.visible = visible;
    }
    else if(layerIndex == 1){
        groupSima.visible = visible;
    }
    else if(layerIndex == 2){
        groupUpperMantle.visible = visible;
    }
}

function render() {
    renderer.render(scene, camera);
}

init()

export {resumeAnimation, pauseAnimation, seperateLayers, setLayerVisible}

