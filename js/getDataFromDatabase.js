function getDataFromDatabase() {

    var loader = new THREE.XHRLoader();

    loader.crossOrigin = '';

    //replace "scene.json" by file url
    loader.load( "scene1.json", function ( data ) {

        fromJSON ( JSON.parse( data ));
})
}

    
// function getDataFromDatabase(callback) {
//
//     var transaction = db.transaction( [ 'sceneList' ], 'readwrite' );
//     var objectStore = transaction.objectStore( 'sceneList' );
//     var request = objectStore.get( 0 );
//     request.onsuccess = function ( event ) {
//
//         callback( event.target.result );
//
//     };
//     var myData = request.result;
//
//     loader.parse(myData);
//
// }

 function fromJSON( json ) {

    var loader = new THREE.ObjectLoader();
     

    if ( json.scene === undefined ) {

        setScene( loader.parse( json ) );
        return;

    }

    var camera = loader.parse( json.camera );
    var Camera = defaultCamera.clone();
    Camera.copy( camera );
    Camera.aspect = defaultCamera.aspect;
    Camera.updateProjectionMatrix();


    setScene( loader.parse( json.scene ) );

}

 function setScene( jsonScene ) {

    scene = new THREE.Scene();
    scene.uuid = jsonScene.uuid;
    scene.name = jsonScene.name;

     while ( jsonScene.children.length > 0 ) {

         addObject( jsonScene.children[ 0 ] );

     }
     
 }

function addObject( object ) {


    object.traverse( function ( child ) {

        if ( child.geometry !== undefined ) addGeometry( child.geometry );
        if ( child.material !== undefined ) addMaterial( child.material );

    } );

    scene.add( object );
    transformGroup = scene.children[1];

}

 function addGeometry( geometry ) {
    var geometries = {};
    geometries[ geometry.uuid ] = geometry;

}

function addMaterial( material ) {
    var materials = {};
    materials[ material.uuid ] = material;

}

