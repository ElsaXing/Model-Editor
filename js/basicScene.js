/**
 * Created by Elsa on 2016/7/5.
 */

var scene,
    defaultCamera,
    renderer,
    light,
    backgroundLight,
    skyLight;
var DEFAULT,
    userSceneElements,
    sensingElements;
var transformGroup;
var groundGeo,
    groundMat,
    ground,
    skyGeo,
    skyMat,
    sky;
var object;
var deletedObject = [];
var transformControls;
var container =document.getElementById('container');


function init() {
    //set up scene
    scene = new THREE.Scene();
    scene.name = "scene";

    //set up camera
    defaultCamera = new THREE.PerspectiveCamera(45,(window.innerWidth* 8)/(window.innerHeight * 9),1,1000);
    defaultCamera.position.set(20,6,20);
    defaultCamera.name = "defaultCamera";
    defaultCamera.lookAt(new THREE.Vector3(0,0,0));

    //default scene group
    DEFAULT = new THREE.Group();
    DEFAULT.name = "DEFAULT";
    scene.add(DEFAULT);

    //sensing elements group
    sensingElements = new THREE.Group();
    sensingElements.name = "sensingElements";
    scene.add(sensingElements);

    // user scene elements group
    userSceneElements = new THREE.Group();
    userSceneElements.name = "userSceneElements";
    scene.add(userSceneElements);

}


//set up default background
function defaultBackground () {

//set up light
    light= new THREE.PointLight(0xffffff,.8);
    light.position.set(-5,10,10);
    light.name = "defaultLight";
    DEFAULT.add(light);

    backgroundLight= new THREE.PointLight(0xffffff,.3);
    backgroundLight.position.set(5,5,-10);

    DEFAULT.add(backgroundLight);



    skyLight = new THREE.HemisphereLight(0x99CCFF,0x99FFCC, .8);
    skyLight.name = "defaultSkyLight";
    DEFAULT.add(skyLight);


//set up ground
    groundGeo = new THREE.PlaneBufferGeometry(1000,1000);
    groundMat = new THREE.MeshLambertMaterial({color:0xFFCC00});
    ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI/2;
    ground.name = "defaultGround";
    DEFAULT.add(ground);

//set up sky
    skyGeo = new THREE.SphereGeometry(4000,32,15);
    skyMat = new THREE.MeshPhongMaterial({color:0x0033FF});
    sky = new THREE.Mesh(skyGeo, skyMat);
    sky.name = "defaultSky";
    DEFAULT.add(sky);





    //shadow
    DEFAULT.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
//     renderer.shadowMapEnabled = true;
//     light.castShadow = true;
//     obj.castShadow =true;
//     ground.receiveShadow =true;

}


//select transform group for edite
function selectTransformGroup(group) {
    return group;
}



//container resize
window.addEventListener( 'resize', function () {

    defaultCamera.aspect = (window.innerWidth* 8)/(window.innerHeight * 9);
    defaultCamera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth * 2/3, window.innerHeight * 3/4);

}, false );