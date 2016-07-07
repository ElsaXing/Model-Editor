/**
 * Created by Elsa on 2016/7/6.
 */
var sceneObjects = scene.children;
var sceneView = document.getElementById('sceneViewBody');
var objectView = document.getElementById('objectViewBody');
var test = document.getElementById('test');

for (var i=0; i < sceneObjects.length; i++) {
    
    if ( !sceneObjects[i].name) {
        sceneObjects[i].name = sceneObjects[i].type
    }
    
    if (sceneObjects[i].name == 'objectContainer') {
        var addedObjects = sceneObjects[i].children;
    }
}

for (var i =0; i < addedObjects.length; i++) {
    if ( !addedObjects[i].name) {
        addedObjects[i].name = addedObjects[i].geometry.type;
    } }


if (object) {
    var name = object.name;
    var type = object.type;
    var uuid = object.uuid;
    var position = object.position;
    var rotation = object.rotation;
    var scale = object.scale;
    var visible = object.visible;

    var p = document.createElement('p');
    p.textContent = visible
    test.appendChild(p);
} 


