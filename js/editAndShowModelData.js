// input1 = document.getElementById('input1');
// input2 = document.getElementById('input2');
// user = {};
// Object.defineProperty(user, 'name', {
//     get: function() { return input1.value; },
//     set: function(newValue) { input1.value = newValue; input2.value = newValue; },
//     configurable: true
// });
//
// Object.defineProperty(user, 'nameyo', {
//     get: function() { return input2.value; },
//     set: function(newValue) {input2.value = newValue;  input1.value = newValue; },
//     configurable: true
// });
//
// input1.oninput = function() { user.name = user.name };
// input2.oninput = function() { user.nameyo = user.nameyo };
//


function showInfo (testobject) {
    menu = document.getElementById('menu');
    if (menu.firstElementChild) {
        menu.removeChild(menu.firstElementChild)
    }

    menuDiv = document.createElement('div');
    menuDiv.id = 'dataDiv';
    menu.appendChild(menuDiv);

    modelData = {};
    var testModel = testobject;
    //Name
    nameDiv = document.createElement('div');
    nameSpan = document.createElement('span');
    nameSpan.textContent = 'Name';
    nameValue = document.createElement('input');
    nameValue.className = 'text';
    nameValue.textContent = testModel.name;

    menuDiv.appendChild(nameDiv);
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(nameValue);

    Object.defineProperty(modelData, 'objectName', {
        get: function() { return nameValue.value; },
        set: function(newValue) { testModel.name= newValue; },
        configurable: true
    });

    nameValue.oninput = function () {modelData.objectName = modelData.objectName};


    //position
    positionDiv = document.createElement('div');
    positionSpan = document.createElement('span');
    positionSpan.textContent = 'Position';

    menuDiv.appendChild(positionDiv);
    positionDiv.appendChild(positionSpan);


    positionX = createInput(positionDiv);
    positionY = createInput(positionDiv);
    positionZ = createInput(positionDiv);

    positionX.id = 'positionX';
    positionY.id = 'positionY';
    positionZ.id = 'positionZ';


    positionX.value = testModel.position.x.toFixed(2);
    positionY.value = testModel.position.y.toFixed(2);
    positionZ.value = testModel.position.z.toFixed(2);



    Object.defineProperty(modelData, 'viewPositionX', {
        get: function() { return Number(positionX.value); },
        set: function(newValue) { testModel.position.x = newValue; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewPositionY', {
        get: function() { return Number(positionY.value); },
        set: function(newValue) { testModel.position.y = newValue; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewPositionZ', {
        get: function() { return Number(positionZ.value); },
        set: function(newValue) { testModel.position.z = newValue; },
        configurable: true
    });

    positionX.oninput = function () {modelData.viewPositionX = modelData.viewPositionX};
    positionY.oninput = function () {modelData.viewPositionY = modelData.viewPositionY};
    positionZ.oninput = function () {modelData.viewPositionZ = modelData.viewPositionZ};



    //rotation
    rotationDiv = document.createElement('div');
    rotationSpan = document.createElement('span');
    rotationSpan.textContent = 'Rotation';

    menuDiv.appendChild(rotationDiv);
    rotationDiv.appendChild(rotationSpan);


    rotationX = createInput(rotationDiv);
    rotationY = createInput(rotationDiv);
    rotationZ = createInput(rotationDiv);
    rotationX.id = 'rotationX';
    rotationY.id = 'rotationY';
    rotationZ.id = 'rotationZ';

    var x = testModel.rotation.x * 180 / Math.PI;
    var y = testModel.rotation.y * 180 / Math.PI;
    var z = testModel.rotation.z * 180 / Math.PI;

    rotationX.value = x.toFixed(2);
    rotationY.value = y.toFixed(2);
    rotationZ.value = z.toFixed(2);



    Object.defineProperty(modelData, 'viewRotationX', {
        get: function() { return Number(rotationX.value); },
        set: function(newValue) { testModel.rotation.x = newValue * Math.PI / 180 ; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewRotationY', {
        get: function() { return Number(rotationY.value); },
        set: function(newValue) { testModel.rotation.y = newValue * Math.PI / 180 ; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewRotationZ', {
        get: function() { return Number(rotationZ.value); },
        set: function(newValue) { testModel.rotation.z = newValue * Math.PI / 180 ; },
        configurable: true
    });

    rotationX.oninput = function () {modelData.viewRotationX = modelData.viewRotationX};
    rotationY.oninput = function () {modelData.viewRotationY = modelData.viewRotationY};
    rotationZ.oninput = function () {modelData.viewRotationZ = modelData.viewRotationZ};


    //scale
    scaleDiv = document.createElement('div');
    scaleSpan = document.createElement('span');
    scaleSpan.textContent = 'Scale';

    menuDiv.appendChild(scaleDiv);
    scaleDiv.appendChild(scaleSpan);


    scaleX = createInput(scaleDiv);
    scaleY = createInput(scaleDiv);
    scaleZ = createInput(scaleDiv);
    scaleX.id = 'scaleX';
    scaleY.id = 'scaleY';
    scaleZ.id = 'scaleZ';


    scaleX.value = testModel.scale.x.toFixed(2);
    scaleY.value = testModel.scale.y.toFixed(2);
    scaleZ.value = testModel.scale.z.toFixed(2);



    Object.defineProperty(modelData, 'viewScaleX', {
        get: function() { return Number(scaleX.value); },
        set: function(newValue) { testModel.scale.x = newValue; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewScaleY', {
        get: function() { return Number(scaleY.value); },
        set: function(newValue) { testModel.scale.y = newValue; },
        configurable: true
    });

    Object.defineProperty(modelData, 'viewScaleZ', {
        get: function() { return Number(scaleZ.value); },
        set: function(newValue) { testModel.scale.z = newValue; },
        configurable: true
    });

    scaleX.oninput = function () {modelData.viewScaleX = modelData.viewScaleX};
    scaleY.oninput = function () {modelData.viewScaleY = modelData.viewScaleY};
    scaleZ.oninput = function () {modelData.viewScaleZ = modelData.viewScaleZ};



    //userData
    userDataDiv = document.createElement('div');
    userDataSpan = document.createElement('span');
    userDataSpan.textContent = 'User Data';
    userDataValue = document.createElement('input');
    userDataValue.className = 'text';
    userDataValue.textContent = testModel.userData;

    menuDiv.appendChild(userDataDiv);
    userDataDiv.appendChild(userDataSpan);
    userDataDiv.appendChild(userDataValue);

    Object.defineProperty(modelData, 'objectUserData', {
        get: function() { return userDataValue.value; },
        set: function(newValue) { testModel.userData= newValue; },
        configurable: true
    });

    userDataValue.oninput = function () {modelData.objectUserData = modelData.objectUserData};



//bug!
    // Object.defineProperty(modelData, 'modelPosition', {
    //     get: function() { return testModel.position.x; },
    //     set: function(newValue) { input.value = newValue},
    //     configurable: true
    // });
    //
    //
    // testModel.position.watch('x', function (prop,oldval,newval) {
    //     modelData.modelPosition = modelData.modelPosition;
    //     return newval;
    // })
}
function updateUI () {
    var positionX = document.getElementById('positionX');
    var positionY = document.getElementById('positionY');
    var positionZ = document.getElementById('positionZ');

    var rotationX = document.getElementById('rotationX');
    var rotationY = document.getElementById('rotationY');
    var rotationZ = document.getElementById('rotationZ');

    var scaleX = document.getElementById('scaleX');
    var scaleY = document.getElementById('scaleY');
    var scaleZ = document.getElementById('scaleZ');

    positionX.value = INTERSECTED.position.x.toFixed(2);
    positionY.value = INTERSECTED.position.y.toFixed(2);
    positionZ.value = INTERSECTED.position.z.toFixed(2);

    var x = INTERSECTED.rotation.x * 180 / Math.PI;
    var y = INTERSECTED.rotation.y * 180 / Math.PI;
    var z = INTERSECTED.rotation.z * 180 / Math.PI;

    rotationX.value = x.toFixed(2);
    rotationY.value = y.toFixed(2);
    rotationZ.value = z.toFixed(2);

    scaleX.value = INTERSECTED.scale.x.toFixed(2);
    scaleY.value = INTERSECTED.scale.y.toFixed(2);
    scaleZ.value = INTERSECTED.scale.z.toFixed(2);

}

function hideInfo (testObject) {
    var menu = document.getElementById('menu');
    if (menu.firstElementChild) {
        menu.removeChild(menu.firstElementChild)
    }
}


function createInput (parent){
    var parentDiv = parent;
    Input = document.createElement('input');
    Input.className = 'number';
    parentDiv.appendChild(Input);
    return Input
}





