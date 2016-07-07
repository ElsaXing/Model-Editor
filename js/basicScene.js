/**
 * Created by Elsa on 2016/7/5.
 */

var scene,
    camera,
    renderer,
    light,
    backgroundLight,
    skyLight;
var groundGeo,
    groundMat,
    ground,
    skyGeo,
    skyMat,
    sky;
var object;
var container =document.getElementById('container');



//set up scene
scene = new THREE.Scene();


//set up renderer
renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0xccffff);
renderer.setSize(window.innerWidth * 2/3, window.innerHeight * 3/4);
container.appendChild(renderer.domElement);


//set up camera
camera = new THREE.PerspectiveCamera(45,(window.innerWidth* 8)/(window.innerHeight * 9),1,1000);
camera.position.set(20,6,20);
camera.lookAt(new THREE.Vector3(0,0,0));


//set up light
light= new THREE.PointLight(0xffffff,.8);
light.position.set(-5,10,10);

scene.add(light);

backgroundLight= new THREE.PointLight(0xffffff,.3);
backgroundLight.position.set(5,5,-10);

scene.add(backgroundLight);



skyLight = new THREE.HemisphereLight(0x99CCFF,0x99FFCC, .8);
scene.add(skyLight);


//set up ground
groundGeo = new THREE.PlaneBufferGeometry(1000,1000);
groundMat = new THREE.MeshLambertMaterial({color:0xFFCC00});
ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

//set up sky
skyGeo = new THREE.SphereGeometry(4000,32,15);
skyMat = new THREE.MeshPhongMaterial({color:0x0033FF});
sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);


//test object
var objects = new THREE.Object3D();
var geometry = new THREE.BoxGeometry(5,5,5);
var material = new THREE.MeshLambertMaterial({color:0x9966FF});

var obj = new THREE.Mesh(geometry,material);
obj.position.set(0,3,0);
objects.add(obj);
scene.add(objects);


//transform

var transformControls = new THREE.TransformControls( camera, container.firstElementChild);
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

            case 81: // Q
                transformControls.setSpace( transformControls.space === "local" ? "world" : "local" );
                break;

            case 17: // Ctrl
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

            case 187:
            case 107: // +, =, num+
                transformControls.setSize( control.size + 0.1 );
                break;

            case 189:
            case 109: // -, _, num-
                transformControls.setSize( Math.max( control.size - 0.1, 0.1 ) );
                break;

        }

    });

    change( 'keyup', function ( event ) {

        switch ( event.keyCode ) {

            case 17: // Ctrl
                transformControls.setTranslationSnap( null );
                transformControls.setRotationSnap( null );
                break;

        }

    });
}


//
// var objectPosition,
//     objectRotation,
//     objectScale;
//
// transformControls.addEventListener('mouseDown', function() {
//
//     var object = transformControls.object;
//
//     objectPosition = object.position.clone();
//     objectRotation = object.rotation.clone();
//     objectScale = object.scale.clone();
//
// });
//
// transformControls.addEventListener('mouseUp', function() {
//
//     var object = transformControls.object;
//
//     if ( object !== undefined ) {
//
//         switch( transformControls.getMode()) {
//
//             case 'translate':
//                 if (! objectPosition.equals(object.position)) {
//                     //set position
//                 }
//                 break;
//
//             case 'rotate':
//                 if ( !objectRotation.equals( object.rotaion)) {
//                     //set rotation
//                 }
//                 break;
//
//             case 'scale' :
//                 if (! objectScale.equals(object.scale)) {
//                     //set scale
//                 }
//                 break;
//         }
//     }
// });

//picking

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector2();

function getIntersects( point, objects ) {

    mouseVector.set( ( point.x * 2 ) - 1, 1 - ( point.y * 2) );

    raycaster.setFromCamera( mouseVector, camera );

    return raycaster.intersectObjects( objects );

}

var onDownPosition = new THREE.Vector2();
var onUpPosition = new THREE.Vector2();

function getMousePosition( dom, x, y ) {

    var rect = dom.getBoundingClientRect();
    return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

}

function handleClick() {
    if( onDownPosition.x == onUpPosition.x  &&  onDownPosition.y == onUpPosition.y  ) {
        var intersects = getIntersects( onUpPosition, objects.children );

        if ( intersects.length > 0 ) {
            if (object !== intersects[0].object) {
            object = intersects[0].object;
            transformControls.attach(object);
            scene.add(transformControls);
                eventTransformControls('add');
            console.log(1);
            }
            else {
                console.log(3);
            }
        }
        else {
            transformControls.detach();
            eventTransformControls('remove');
            object = null;
            scene.remove(transformControls);

            console.log(2);

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


var controls = new THREE.EditorControls(camera, container);
controls.pan = function(){};



//shadow
scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
renderer.shadowMapEnabled = true;
light.castShadow = true;
obj.castShadow =true;
ground.receiveShadow =true;

//render
function animate () {
    requestAnimationFrame(animate );
    transformControls.update();
    render();
}

function render () {
    renderer.render(scene,camera);
}

animate();



//container resize
window.addEventListener( 'resize', function () {

    camera.aspect = (window.innerWidth* 8)/(window.innerHeight * 9);
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth * 2/3, window.innerHeight * 3/4);
}, false );
