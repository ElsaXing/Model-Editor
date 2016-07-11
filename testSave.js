/**
 * Created by Elsa on 2016/7/7.
 */
var db;


var sceneData = [];

// window.onload = function() {
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
    }

    var DBOpenRequest = window.indexedDB.open("sceneList", 1);

    DBOpenRequest.onerror = function(event) {
        console.log('Error loading database.');
    };

    DBOpenRequest.onsuccess = function(event) {
        console.log('Database initialised.');

        db = DBOpenRequest.result;

        displayData();
    };

    DBOpenRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function (event) {
            console.log('Error loading database.');
        };

        // Create an objectStore for this database
        var objectStore = db.createObjectStore("sceneList");

        // // define what data items the objectStore will contain
        // objectStore.createIndex("camera", "camera", {unique: false});
    };

    function displayData() {
        console.log('display');
    }

    function addData(event) {
        event.preventDefault();

        // getData();

        var transaction = db.transaction(["sceneList"], "readwrite");

        transaction.oncomplete = function() {
            displayData();
        };

        transaction.onerror = function() {
            console.log('Transaction not opened due to error: ' + transaction.error);
        };

        var objectStore = transaction.objectStore("sceneList");

        // var objectStoreRequest = objectStore.add(sceneData[0]);

        var objectStoreRequest = objectStore.add(scene.toJSON());
        objectStoreRequest.onsuccess = function(event) {
            console.log('New item added to database.');
        };
    }

//     function getData() {
//     var savedCamera = {
//         far: camera.far,
//         fov: camera.fov,
//         near: camera.near,
//         name: camera.name,
//         position: camera.position,
//         rotation: camera.rotation,
//         scale: camera.scale,
//         type: camera.type,
//         uuid: camera.uuid
//     };
//
//
//     sceneData.push(savedCamera);
//     console.log(sceneData);
// }
