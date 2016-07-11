/**
 * Created by Elsa on 2016/7/7.
 */
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

var sceneData = [];

//open database
//name of database & version
var request = window.indexedDB.open('sceneData',1);


request.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode);
};


//create and update database version
//version naumber: only integer accepted
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    var objectStore = db.createObjectStore("sceneList");

    // objectStore.createIndex("scene", "scene", {unique: false});
    objectStore.createIndex("camera", "camera", {unique: false});
    // objectStore.createIndex("light", "light", {unique: false});
    // objectStore.createIndex("objects", "objects", {unique: false});
    // objectStore.createIndex("materials", "materials", {unique: false});

};


function sceneSave () {
    getData();
    addData();

}

function addData() {
    for (var i in sceneData) {
        objectStore.add(sceneData[i]);
    }
}

function getData() {
    var savedCamera = {
        far: camera.far,
        fov: camera.fov,
        near: camera.near,
        name: camera.name,
        position: camera.position,
        rotation: camera.rotation,
        scale: camera.scale,
        type: camera.type,
        uuid: camera.uuid
    };
    
    sceneData.push(savedCamera);
    //
    // var sceneObjects = scene.children;
    // var savedLights = [];
    // var savedMeshes = [];
    //
    // for (var i =0; i < sceneObjects.length; i++) {
    //     var sceneObject = sceneObjects[i];
    //
    //     switch (sceneObject.type) {
    //         //light
    //         case "Light":
    //             //settings
    //             break;
    //         case "PointLight":
    //             //settings
    //             break;
    //         case "SpotLight":
    //             //settings
    //             break;
    //         case "HemisphereLight":
    //             //settings
    //             break;
    //         case "DirectionalLight":
    //             //settings
    //             break;
    //         case "AmbientLight":
    //             //settings
    //             break;
    //
    //         //meshes
    //         case "Object3D":
    //             //settings
    //             var objectContainer = sceneObject;
    //             break;
    //
    //         //default scene
    //         case "Mesh":
    //             //settings
    //             var defaultScene = sceneObject;
    //             break;
    //
    //     }


    }




