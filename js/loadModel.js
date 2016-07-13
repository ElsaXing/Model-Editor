 var fileInput = document.getElementById('btn_inputModel');

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



            userSceneElements.add(collada.scene);
            console.log(filename + ' load done');


        }, false );
        reader.readAsText( file );
    }

    else {
        alert ('only collada file can be accepted');
    }
}


function addPreMesh(mesh) {
    var preMesh;

    switch (mesh) {
        case 'cube':
            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshLambertMaterial({color: 0x9966FF});
            preMesh = new THREE.Mesh(geometry, material);
            break;

        case 'sphere':
            var ballGeo = new THREE.SphereGeometry(2, 12, 12);
            var ballMat = new THREE.MeshLambertMaterial({color: 0xccffcc});
            preMesh = new THREE.Mesh(ballGeo, ballMat);
            break;

        case 'cylinder':
            var cylinderGeo = new THREE.CylinderGeometry(2,2,2,12);
            var cylinderMat = new THREE.MeshLambertMaterial({color:0xFF00CC});
            preMesh = new THREE.Mesh(cylinderGeo,cylinderMat);

    }



    sensingElements.add(preMesh);
    transformGroup = scene.children[1];
}
