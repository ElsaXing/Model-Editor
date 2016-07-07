/**
 * Created by Elsa on 2016/7/5.
 */
function loadFile() {

    var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
    
        loader.load(
            // resource URL
            'model/rocket1.dae',
            // Function when resource is loaded
            function ( collada ) {
                dae = collada.scene;
                objects.add( dae.children[0].children[0]);
            }
        );

    // var filename = document.getElementById('loadFile').files[0].name;
    // var extension = filename.split( '.' ).pop().toLowerCase();
    //
    //
    //
    // if (extension == 'dae') {
    //     var loader = new THREE.ColladaLoader();
    //     loader.options.convertUpAxis = true;
    //
    //     loader.load(
    //         // resource URL
    //         '  ',
    //         // Function when resource is loaded
    //         function ( collada ) {
    //             dae = collada.scene;
    //             scene.add( dae);
    //         }
    //     );
    // } else {
    //     alert ('Only collada file will be accepted.');
    // }
}


