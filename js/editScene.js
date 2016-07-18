var db;

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

};



function addDataToDatabase(event) {
    //get data from scene
    var sceneData = sceneToJson();
    console.log(JSON.stringify(sceneData));

    var transaction = db.transaction(["sceneList"], "readwrite");

    transaction.oncomplete = function() {
        displayData();
    };

    transaction.onerror = function() {
        console.log('Transaction not opened due to error: ' + transaction.error);
    };

    var objectStore = transaction.objectStore("sceneList");


    var objectStoreRequest = objectStore.put( sceneData, 0 );
    objectStoreRequest.onsuccess = function(event) {
        console.log('New item added to database.');
    };
}


function sceneToJson () {

    return {

        metadata: {},
        model: {
            modelwithScene: 'model/modelwithScene.dae'
        },
        camera: defaultCamera.toJSON(),
        sensingElements: scene.children[1].toJSON(),
        userSceneElements: "url"

    };

}
//
// function sceneToJson () {
//
//     return {
//
//         metadata: {},
//         project: {
//
//         },
//         camera: defaultCamera.toJSON(),
//         scene: scene.toJSON()
//
//     };
//
// }


//display scene
function displayData() {
    console.log('display');
}


//delete Object
function deleteObject (selectedObject) {
    if (selectedObject) {
        deletedObject.push(selectedObject);
        transformGroup.remove(selectedObject);
    }

}


function KeyPress(e) {
    var evtobj = window.event? event : e;
    if (evtobj.keyCode == 90 && 17) {
        if (deletedObject.length > 0) {
            var recoverObject = deletedObject.pop();
            transformGroup.add(recoverObject);
        }

    }
}

document.onkeydown = KeyPress;