var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector2();
var newMouseVector = new THREE.Vector2();
var INTERSECTED;
var plane = new THREE.Plane();

container.addEventListener('mousedown', onMouseDown, false);

function onMouseDown (e) {
    mouseVector = getMouseVector();

    container.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp (e) {
    transformGroup = scene.children[1].children;

    newMouseVector = getMouseVector();

    raycaster.setFromCamera(newMouseVector.clone(), defaultCamera);

    var intersects = raycaster.intersectObjects(transformGroup);

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xFFFF99 );
            showInfo(INTERSECTED);
            plane.setFromNormalAndCoplanarPoint(
                defaultCamera.getWorldDirection( plane.normal ),
                INTERSECTED.position );
        }
    }  else {
        if (mouseVector.x == newMouseVector.x && mouseVector.y == newMouseVector.y) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            hideInfo(INTERSECTED);
            INTERSECTED = null;
        }

    }



}

function getMouseVector() {
    var rect = container.firstElementChild.getBoundingClientRect();
    var relativeVector= [];
    var vector = new THREE.Vector2();
    relativeVector.x = ( event.clientX - rect.left ) / rect.width;
    relativeVector.y = ( event.clientY - rect.top ) / rect.height;

    vector.x = 2 * relativeVector.x - 1;
    vector.y = 1 - 2 * relativeVector.y;

    return vector;
}


