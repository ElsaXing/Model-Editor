
function viewTransform() {

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();


    transformControls = new THREE.TransformControls(defaultCamera, container.firstElementChild);
    transformControls.addEventListener('change', render);

    function getIntersects( point, objects ) {

        mouseVector.set( ( point.x * 2 ) - 1, 1 - ( point.y * 2) );

        raycaster.setFromCamera( mouseVector, defaultCamera );

        return raycaster.intersectObjects( objects );

    }


    function getMousePosition( dom, x, y ) {

        var rect = dom.getBoundingClientRect();
        return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

    }


    function handleClick() {
        transformGroup = scene.children[1];

        var mousePosition = getMousePosition( container.firstElementChild, event.clientX, event.clientY );


        //select transform elements
        var intersects = getIntersects(mousePosition, transformGroup.children);

        if (intersects.length > 0) {
            if (object !== intersects[0].object) {
                object = intersects[0].object;

                showInfo(object);
            }

        }
        else {
            hideInfo(object);
            object = null;

        }

    }

    container.addEventListener('mousedown', handleClick, false);

    var controls = new THREE.EditorControls(defaultCamera, container);
    controls.pan = function () {
    };
}