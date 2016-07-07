/**
 * Created by Elsa on 2016/7/7.
 */
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

const sceneData = [
    {scene: 'defualt', color:'yo'}
];


//open database
//name of database & version
var request = window.indexDB.open('sceneData',1);


request.onerror = function(event) {
    console.log("Database error: " + event.target.errorCode);
};


//create and update database version
//version naumber: only integer accepted
request.onupgradeneeded = function(event) {
    var db = evenr.target.resule;

    var objectStore = db.createObjectStore("sceneList");

    objectStore.createIndex("scene", "scene", {unique: true});
    objectStore.createIndex("camera", "camera", {unique: false});
    objectStore.createIndex("light", "light", {unique: false});
    objectStore.createIndex("objects", "objects", {unique: false});
    objectStore.createIndex("materials", "materials", {unique: false});

};

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


    var sceneObjects = scene.children;

    for (var i =0; i < sceneObjects.length; i++) {
        var sceneObject = sceneObjects[i];
        
    }

}