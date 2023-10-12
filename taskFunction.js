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
    // 		<div class="maindata input-group mb-3 justify-content-center align-items-center d-flex">
    // 			<div class="input-group-text rounded checkboxheight">
    // 				<input class="form-check-input mt-0 checkbox1" type="checkbox" value="" aria-label="Checkbox for following text input" onchange="checkBox(this, '${taskId}')">
    // 			</div>
    // 			<div class="mainTask rounded">
    // 				<span class="title">${title}</span>
    // 			</div>
    // 			<button type="button" class="btn btn-danger rounded" onclick="removeTask(this, '${taskId}')" id="deleteButton">Delete</button>
    // 		</div>
    // 	</div>
    // `;
    mainClass.innerHTML += "\n\t\t<div id=\"main\" class=\"container\">\n\t\t\t<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n\t\t\t\t<div class=\"form-checkbox\">\n\t\t\t   \t\t<input class=\"form-check-input checkbox1\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" onchange=\"checkBox(this, '".concat(taskId, "')\">\n\t\t\t\t\t<label class=\"form-check-label title fw-bolder\" for=\"flexCheckDefault\">").concat(title, "</label>\n\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\" onclick=\"removeTask(this, '").concat(taskId, "')\" id=\"deleteButton\"></button>\n\t\t  \t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t");
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
    var mainTask = document.querySelectorAll('.title');
    for (var i = 0; i < checkBox.length; i++) {
        if (dataCollection[i]['done'] === true) {
            checkBox[i].checked = true;
            mainTask[i].style.textDecoration = 'line-through';
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var storageData = localStorage.getItem("item");
    var parseData = JSON.parse(storageData);
    try {
        if (parseData.length !== 0) {
            for (var i = 0; i < parseData.length; i++) {
                dataCollection.push(parseData[i]);
                addingTask(dataCollection[i]["title"], dataCollection[i]["id"]);
            }
        }
        reCheck();
    }
    catch (_a) {
        console.log('localstorage is empty');
    }
});
