function deleteObject (selectedObject) {
    if (selectedObject) {
        deletedObject.push(selectedObject);
        transformGroup.remove(selectedObject);
    }

}


function KeyPress(e) {
    var evtobj = window.event? event : e;
    if (evtobj.keyCode == 90 && 17) {
        if (deletedObject.length > 0) {
            var recoverObject = deletedObject.pop();
            transformGroup.add(recoverObject);
        }

    }
}

document.onkeydown = KeyPress;