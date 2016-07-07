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

            objects.add(collada.scene.children[0].children[0]);
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



