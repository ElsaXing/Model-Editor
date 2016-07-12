 var fileInput = document.getElementById('inputModel');

fileInput.addEventListener( 'change', function ( event ) {
    loadModel( fileInput.files[ 0 ] );
} );

function loadModel(file) {
    var filename = file.name;
    var extension = filename.split( '.' ).pop().toLowerCase();

    var reader = new FileReader();

    if (extension == 'dae') {

        reader.addEventListener( 'load', function ( event ) {

            var contents = event.target.result;

            var loader = new THREE.ColladaLoader();
            var collada = loader.parse( contents );

            collada.scene.children[0].children[0].name = filename;

            userSceneElements.add(collada.scene.children[0].children[0]);
            console.log(filename + ' load done');


        }, false );
        reader.readAsText( file );
    }

    else {
        alert ('only collada file can be accepted');
    }
}


//resect file
function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();

    // Prevent form submission
    e.stopPropagation();
    e.preventDefault();
}


function yo() {

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshLambertMaterial({color: 0x9966FF});

    var obj = new THREE.Mesh(geometry, material);
    obj.position.set(0, 3, 0);
    userSceneElements.add(obj);

    var ballGeo = new THREE.SphereGeometry(2, 12, 12);
    var ballMat = new THREE.MeshLambertMaterial({color: 0xccffcc});
    var ball = new THREE.Mesh(ballGeo, ballMat);
    userSceneElements.add(ball);
}


 function load() {
     var loader = new THREE.ColladaLoader();
     loader.options.convertUpAxis = true;

     loader.load(
         // resource URL
         'model/modelwithScene.dae',
         // Function when resource is loaded
         function ( collada ) {
             dae = collada.scene;
             scene.add( collada.scene );


             //dae contains all the objects in a scene，
             //cast and receive shadow only works  on object.
             dae.traverse(function(child) {
                 child.castShadow = true;
                 child.receiveShadow = true;
                 console.log(child);
             });
         }
     );
 }
