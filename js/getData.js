function getData() {

    var loader = new THREE.XHRLoader();

    loader.crossOrigin = '';

    //replace "scene.json" by file url
    loader.load( "scene.json", function ( data ) {

        fromJSON ( JSON.parse( data ));
})
}

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
    objects = scene.children[6];

}

 function addGeometry( geometry ) {
    var geometries = {};
    geometries[ geometry.uuid ] = geometry;

}

function addMaterial( material ) {
    var materials = {};
    materials[ material.uuid ] = material;

}

