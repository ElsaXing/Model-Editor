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

    // // define what data items the objectStore will contain
    // objectStore.createIndex("camera", "camera", {unique: false});
};



function addData(event) {
    //get data
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
        project: {

        },
        camera: defaultCamera.toJSON(),
        scene: scene.toJSON()

    };
    
}


//display scene
function displayData() {
    console.log('display');
}