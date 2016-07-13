function transform() {
//transform

    transformControls = new THREE.TransformControls( defaultCamera, container.firstElementChild);
    transformControls.addEventListener('change',render);

    function eventTransformControls(key) {
        var change;
        if (key == 'add') {
            change = window.addEventListener;
        } else {
            change = window.removeEventListener;
        }
        change( 'keydown', function ( event ) {

            switch ( event.keyCode ) {
                case 46: //delete
                    deleteObject(object);
                    transformControls.detach();
                    eventTransformControls('remove');
                    object = null;
                    scene.remove(transformControls);
                    break;

                case 81: // Q
                    transformControls.setSpace( transformControls.space === "local" ? "world" : "local" );
                    break;

                case 16: // Shift
                    transformControls.setTranslationSnap( 100 );
                    transformControls.setRotationSnap( THREE.Math.degToRad( 15 ) );
                    break;

                case 87: // W
                    transformControls.setMode( "translate" );
                    break;

                case 69: // E
                    transformControls.setMode( "rotate" );
                    break;

                case 82: // R
                    transformControls.setMode( "scale" );
                    break;

            }

        });

        change( 'keyup', function ( event ) {

            switch ( event.keyCode ) {

                case 16: // Shift
                    transformControls.setTranslationSnap( null );
                    transformControls.setRotationSnap( null );
                    break;

            }

        });
    }


//picking

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

    function getIntersects( point, objects ) {

        mouseVector.set( ( point.x * 2 ) - 1, 1 - ( point.y * 2) );

        raycaster.setFromCamera( mouseVector, defaultCamera );

        return raycaster.intersectObjects( objects );

    }

    var onDownPosition = new THREE.Vector2();
    var onUpPosition = new THREE.Vector2();

    function getMousePosition( dom, x, y ) {

        var rect = dom.getBoundingClientRect();
        return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

    }

    function handleClick() {

        //select transform elements
        if( onDownPosition.x == onUpPosition.x  &&  onDownPosition.y == onUpPosition.y  ) {
            var intersects = getIntersects( onUpPosition, transformGroup.children );

            if ( intersects.length > 0 ) {
                if (object !== intersects[0].object) {
                    object = intersects[0].object;
                    transformControls.attach(object);
                    scene.add(transformControls);
                    eventTransformControls('add');

                    showInfo(object);
                }

            }
            else {
                transformControls.detach();
                eventTransformControls('remove');

                hideInfo(object);
                object = null;
                scene.remove(transformControls);

            }
        }
    }

    function onMouseDown( event ) {

        event.preventDefault();

        var array = getMousePosition( container.firstElementChild, event.clientX, event.clientY );
        onDownPosition.fromArray( array );

        document.addEventListener( 'mouseup', onMouseUp, false );

    }

    function onMouseUp( event ) {

        var array = getMousePosition( container.firstElementChild, event.clientX, event.clientY );
        onUpPosition.fromArray( array );

        handleClick();

        document.removeEventListener( 'mouseup', onMouseUp, false );

    }

    container.addEventListener( 'mousedown', onMouseDown, false );


    var controls = new THREE.EditorControls(defaultCamera, container);
    controls.pan = function(){};


}
