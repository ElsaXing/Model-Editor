/**
 * Created by Elsa on 2016/7/5.
 */
// function loadFile() {

    // var loader = new THREE.ColladaLoader();
    //     loader.options.convertUpAxis = true;
    //
    //     loader.load(
    //         // resource URL
    //         'model/rocket1.dae',
    //         // Function when resource is loaded
    //         function ( collada ) {
    //             dae = collada.scene;
    //             objects.add( dae.children[0].children[0]);
    //         }
    //     );
// }
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
                console.log('load done');

            }, false );
            reader.readAsText( file );
        }

        else {
            alert ('only collada can be accepted');
        }

    }



