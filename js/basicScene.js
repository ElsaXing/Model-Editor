/**
 * Created by Elsa on 2016/7/5.
 */

var scene,
    defaultCamera,
    renderer,
    light,
    backgroundLight,
    skyLight;
var DEFAULT,
    userSceneElements,
    sensingElements;
var transformGroup;
var groundGeo,
    groundMat,
    ground,
    skyGeo,
    skyMat,
    sky;
var object;
var transformControls;
var container =document.getElementById('container');


function init() {
    //set up scene
    scene = new THREE.Scene();
    scene.name = "scene";

    //set up camera
    defaultCamera = new THREE.PerspectiveCamera(45,(window.innerWidth* 8)/(window.innerHeight * 9),1,1000);
    defaultCamera.position.set(20,6,20);
    defaultCamera.name = "defaultCamera";
    defaultCamera.lookAt(new THREE.Vector3(0,0,0));

    //default scene group
    DEFAULT = new THREE.Group();
    DEFAULT.name = "DEFAULT";
    scene.add(DEFAULT);

    //sensing elements group
    sensingElements = new THREE.Group();
    sensingElements.name = "sensingElements";
    scene.add(sensingElements);

    // user scene elements group
    userSceneElements = new THREE.Group();
    userSceneElements.name = "userSceneElements";
    scene.add(userSceneElements);

}


//set up default background
function defaultBackground () {

//set up light
    light= new THREE.PointLight(0xffffff,.8);
    light.position.set(-5,10,10);
    light.name = "defaultLight";
    DEFAULT.add(light);

    backgroundLight= new THREE.PointLight(0xffffff,.3);
    backgroundLight.position.set(5,5,-10);

    DEFAULT.add(backgroundLight);



    skyLight = new THREE.HemisphereLight(0x99CCFF,0x99FFCC, .8);
    skyLight.name = "defaultSkyLight";
    DEFAULT.add(skyLight);


//set up ground
    groundGeo = new THREE.PlaneBufferGeometry(1000,1000);
    groundMat = new THREE.MeshLambertMaterial({color:0xFFCC00});
    ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI/2;
    ground.name = "defaultGround";
    DEFAULT.add(ground);

//set up sky
    skyGeo = new THREE.SphereGeometry(4000,32,15);
    skyMat = new THREE.MeshPhongMaterial({color:0x0033FF});
    sky = new THREE.Mesh(skyGeo, skyMat);
    sky.name = "defaultSky";
    DEFAULT.add(sky);





    //shadow
    DEFAULT.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
//     renderer.shadowMapEnabled = true;
//     light.castShadow = true;
//     obj.castShadow =true;
//     ground.receiveShadow =true;

}


//select transform group for edite
function selectTransformGroup(group) {
    return group;
}

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
                    transformControls.detach();
                    eventTransformControls('remove');
                    object = null;
                    scene.remove(transformControls);
                    deleteObject();

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
                }

            }
            else {
                transformControls.detach();
                eventTransformControls('remove');
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






//container resize
    window.addEventListener( 'resize', function () {

        defaultCamera.aspect = (window.innerWidth* 8)/(window.innerHeight * 9);
        defaultCamera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth * 2/3, window.innerHeight * 3/4);

    }, false );

}