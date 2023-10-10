var dataCollection = [];
var userInput = document.getElementById("userinput");
var addTaskButton = document.getElementById("add");
addTaskButton.addEventListener('click', function () {
    addTask();
});
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function addTask() {
    if (userInput.value.trim() !== "") {
        var entry = { "title": userInput.value, "done": false, "id": Math.floor(Math.random() * 100000000) };
        dataCollection.push(entry);
        addingTask(entry["title"], entry["id"]);
        localStorage.setItem("item", JSON.stringify(dataCollection));
        userInput.value = "";
        reCheck();
        userInput.focus();
    }
    else {
        console.log(dataCollection);
        userInput.focus();
    }
}
function addingTask(title, taskId) {
    var mainClass = document.getElementById('mainClass');
    // mainClass.innerHTML += `
    // 	<div id="main" class="main container">
    // 		<div class="maindata input-group mb-3">
    // 			<div class="input-group-text">
    // 				<input class="form-check-input mt-0 checkbox1" type="checkbox" value="" aria-label="Checkbox for following text input" onchange="checkBox(this, '${taskId}')">
    // 			</div>
    // 			<input type="text" class="form-control inputClass" aria-label="Text input with checkbox" value="${title}" id="${taskId}" readonly>
    // 			<button type="button" class="btn btn-danger" onclick="removeTask(this, '${taskId}')">Delete</button>
    // 		</div>
    // 	</div>
    // `;
    mainClass.innerHTML += "\n\t<div id=\"main\" class=\"main container\">\n\t\t<div class=\"maindata input-group mb-3 justify-content-center align-items-center d-flex\">\n\t\t\t<div class=\"input-group-text rounded checkboxheight\">\n\t\t\t\t<input class=\"form-check-input mt-0 checkbox1\" type=\"checkbox\" value=\"\" aria-label=\"Checkbox for following text input\" onchange=\"checkBox(this, '".concat(taskId, "')\">\n\t\t\t</div>\n\t\t\t<div class=\"mainTask rounded\">\n\t\t\t\t<span class=\"title\">").concat(title, "</span>\n\t\t\t</div>\n\t\t\t<button type=\"button\" class=\"btn btn-danger rounded\" onclick=\"removeTask(this, '").concat(taskId, "')\" id=\"deleteButton\">Delete</button>\n\t\t</div>\n\t</div>\n\t");
}
function removeTask(event, taskId) {
    for (var i = 0; i <= dataCollection.length; i++) {
        if (dataCollection[i]["id"] == taskId) {
            dataCollection.splice(i, 1);
            localStorage.setItem("item", JSON.stringify(dataCollection));
            event.parentNode.remove();
            break;
        }
    }
}
function checkBox(event, taskId) {
    var checkBox = document.querySelectorAll('.checkbox1');
    var mainTask = document.querySelectorAll('.title');
    for (var i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            dataCollection[i]['done'] = true;
            mainTask[i].style.textDecoration = 'line-through';
            localStorage.setItem('item', JSON.stringify(dataCollection));
        }
        else {
            dataCollection[i]['done'] = false;
            mainTask[i].style.textDecoration = 'none';
            localStorage.setItem('item', JSON.stringify(dataCollection));
        }
    }
}
function reCheck() {
    var checkBox = document.querySelectorAll(".checkbox1");
    for (var i = 0; i < checkBox.length; i++) {
        if (dataCollection[i]['done'] === true) {
            checkBox[i].checked = true;
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var storageData = localStorage.getItem("item");
    try {
        if (storageData.length !== 0) {
            for (var i = 0; i < storageData.length; i++) {
                var parseData = JSON.parse(storageData);
                dataCollection.push(parseData[i]);
                addingTask(dataCollection[i]["title"], dataCollection[i]["id"]);
            }
            reCheck();
        }
    }
    catch (_a) {
        console.log('localstorage is empty');
    }
});
