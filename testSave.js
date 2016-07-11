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

        var objectStoreRequest = objectStore.put({scene:scene.toJSON()});
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

//
// function addData() {
//     indexedDB.setItem('scene', scene.toJSON());
//     console.log(JSON.stringify(scene));
// }
//
// function getData() {
//
//
//     // this.loader = new THREE.ObjectLoader();
//
//     init();
//
//
//     var getScene = JSON.parse(localStorage.getItem('scene'));
//     console.log (getScene);
//     // this.scene.name = getScene.object.name;
//     // this.scene.uuid = getScene.object.uuid;
//     //
//     // this.camera = defaultCamera.clone();
//     // this.camera = defaultCamera.position;
//     // this.camera = defaultCamera.name;
//     //
//     //
//     // this.objects = new THREE.Object3D();
//     // this.objects.name = getScene.object.children[6].name;
//     // this.objects.uuid = getScene.object.children[6].uuid;
//     this.objectsList = getScene.object.children[6].children;
//
//
//     // scene.add(this.objects);
//     for (var i=0; i <this.objectsList.length; i++ ) {
//         this.mesh = new THREE.Mesh();
//         this.mesh.uuid = this.objectsList[i].uuid;
//         this.mesh.geometry = getGeometry(this.objectsList[i].geometry, getScene);
//         this.mesh.material = getMaterial(this.objectsList[i].material, getScene);
//         // this.mesh.matrix = this.objectsList[i].matrix;
//         objects.add(mesh);
//     }
// }
//
//
// function getGeometry (uuid, getScene) {
//     var targetList = getScene.geometries;
//     var target,
//         targetGeometry;
//
//
//     for (var i=0; i<targetList.length; i++) {
//         if (uuid == targetList[i].uuid) {
//             target = targetList[i];
//             break;
//         }
//     }
//
//     switch (target.type) {
//         case "PlaneBufferGeometry":
//             targetGeometry = new THREE.PlaneBufferGeometry();
//             targetGeometry.height = target.height;
//             targetGeometry.width = target.width;
//             targetGeometry.uuid = target.uuid;
//             break;
//
//         case "SphereGeometry":
//             targetGeometry = new THREE.SphereGeometry();
//             targetGeometry.heightSegments = target.heightSegments;
//             targetGeometry.radius = target.radius;
//             targetGeometry.uuid = target.uuid;
//             targetGeometry.widthSegments = target.widthSegments;
//             break;
//
//         case "BoxGeometry":
//             targetGeometry = new THREE.BoxGeometry();
//             targetGeometry.depth = target.depth;
//             targetGeometry.height = target.height;
//             targetGeometry.width = target.width;
//             targetGeometry.uuid = target.uuid;
//             break;
//         default:
//             console.log('geometry not match');
//             break;
//     }
//
//     return targetGeometry;
// }
//
// function getMaterial (uuid, getScene) {
//     var targetList = getScene.materials;
//     var target,
//         targetMaterial;
//
//     for (var i=0; i<targetList.length; i++) {
//         if (uuid == targetList[i].uuid) {
//             target = targetList[i];
//         }
//     }
//
//     switch (target.type) {
//         case "MeshLambertMaterial":
//             targetMaterial = new THREE.MeshLambertMaterial();
//             targetMaterial.uuid = target.uuid;
//             targetMaterial.color = target.color;
//             targetMaterial.emissive = target.emissive;
//             break;
//
//         case "MeshPhongMaterial":
//             targetMaterial = new THREE.MeshPhongMaterial();
//             targetMaterial.uuid = target.uuid;
//             targetMaterial.color =new THREE.Color.;
//             targetMaterial.emissive = target.emissive;
//             targetMaterial.shininess = target.shininess;
//             targetMaterial.specular = target.specular;
//             break;
//         default:
//             console.log('material not match');
//             break;
//
//     }
//
//     return targetMaterial;
//
//
// }
// addObject: function ( object ) {
//
//     var scope = this;
//
//     object.traverse( function ( child ) {
//
//         if ( child.geometry !== undefined ) scope.addGeometry( child.geometry );
//         if ( child.material !== undefined ) scope.addMaterial( child.material );
//
//         scope.addHelper( child );
//
//     } );
//
//     this.scene.add( object );
//
//     this.signals.objectAdded.dispatch( object );
//     this.signals.sceneGraphChanged.dispatch();
//
// },


// setScene: function ( scene ) {
//
//     this.scene.uuid = scene.uuid;
//     this.scene.name = scene.name;
//     this.scene.userData = JSON.parse( JSON.stringify( scene.userData ) );
//
//     // avoid render per object
//
//     this.signals.sceneGraphChanged.active = false;
//
//     while ( scene.children.length > 0 ) {
//
//         this.addObject( scene.children[ 0 ] );
//
//     }
//
//     this.signals.sceneGraphChanged.active = true;
//     this.signals.sceneGraphChanged.dispatch();
//
// },




// fromJSON: function ( json ) {
//
//     var loader = new THREE.ObjectLoader();
//
//     // backwards
//
//     if ( json.scene === undefined ) {
//
//         this.setScene( loader.parse( json ) );
//         return;
//
//     }
//
//     var camera = loader.parse( json.camera );
//
//     this.camera.copy( camera );
//     this.camera.aspect = this.DEFAULT_CAMERA.aspect;
//     this.camera.updateProjectionMatrix();
//
//     this.history.fromJSON( json.history );
//     this.scripts = json.scripts;
//
//     this.setScene( loader.parse( json.scene ) );
//
// },

//
// setScene: function ( scene ) {
//
//     this.scene.uuid = scene.uuid;
//     this.scene.name = scene.name;
//     this.scene.userData = JSON.parse( JSON.stringify( scene.userData ) );
//
//     // avoid render per object
//
//     this.signals.sceneGraphChanged.active = false;
//
//     while ( scene.children.length > 0 ) {
//
//         this.addObject( scene.children[ 0 ] );
//
//     }
//
//     this.signals.sceneGraphChanged.active = true;
//     this.signals.sceneGraphChanged.dispatch();
//
// },
