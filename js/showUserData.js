function showInfo(selectedObject) {
    var menu = document.getElementById('menu');

    if (menu.firstElementChild) {
        menu.removeChild(menu.firstElementChild)
    }

    var table =  document.createElement('table');
    table.id = 'table';
    menu.appendChild(table);

    //name
    var nameTr = document.createElement('tr');
    nameTr.id = 'Name';
    var nameTdName = document.createElement('td');
    var nameTdData = document.createElement('td');

    nameTdName.textContent = 'Name';
    nameTdData.textContent = selectedObject.name;
    nameTr.appendChild(nameTdName);
    nameTr.appendChild(nameTdData);

    table.appendChild(nameTr);


    //position
    var positionTr = document.createElement('tr');
    positionTr.id = 'position';
    var positionTdName = document.createElement('td');
    var positionTdData = document.createElement('td');

    positionTdName.textContent = 'Position';
    positionTdData.textContent = 'x:' + selectedObject.position.x.toFixed(2)
                                + ' y:' + selectedObject.position.y.toFixed(2)
                                + ' z:' + selectedObject.position.z.toFixed(2);

    positionTr.appendChild(positionTdName);
    positionTr.appendChild(positionTdData);

    table.appendChild(positionTr);


    //rotation
    var rotationTr = document.createElement('tr');
    rotationTr.id = 'rotation';
    var rotationTdName = document.createElement('td');
    var rotationTdData = document.createElement('td');

    var x = selectedObject.rotation.x * 180 / Math.PI;
    var y = selectedObject.rotation.y * 180 / Math.PI;
    var z = selectedObject.rotation.z * 180 / Math.PI;


    rotationTdName.textContent = 'Rotation';
    rotationTdData.textContent = 'x:' + x.toFixed(2)
                                + ' y:' + y.toFixed(2)
                                + ' z:' + z.toFixed(2);

    rotationTr.appendChild(rotationTdName);
    rotationTr.appendChild(rotationTdData);

    table.appendChild(rotationTr);

    //scale
    var scaleTr = document.createElement('tr');
    scaleTr.id = 'scale';
    var scaleTdName = document.createElement('td');
    var scaleTdData = document.createElement('td');

    scaleTdName.textContent = 'Scale';
    scaleTdData.textContent = 'x:' + selectedObject.scale.x.toFixed(2)
                            + ' y:' + selectedObject.scale.y.toFixed(2)
                            + ' z:' + selectedObject.scale.z.toFixed(2);

    scaleTr.appendChild(scaleTdName);
    scaleTr.appendChild(scaleTdData);

    table.appendChild(scaleTr);

    //user data
    var userDataTr = document.createElement('tr');
    userDataTr.id = 'userData';
    var userDataTdName = document.createElement('td');
    var userDataTdData = document.createElement('td');

    userDataTdName.textContent = 'User data';
    userDataTdData.textContent = selectedObject.userData;

    userDataTr.appendChild(userDataTdName);
    userDataTr.appendChild(userDataTdData);

    table.appendChild(userDataTr);


}

function hideInfo(selectedObject) {

    var menu = document.getElementById('menu');
    if (menu.firstElementChild) {
        menu.removeChild(menu.firstElementChild)
    }

}

function update() {
    if (object) {

    }
}