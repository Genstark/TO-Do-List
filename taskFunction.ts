let dataCollection: any[] = [];
let userInput = document.getElementById("userinput") as HTMLInputElement;
const addTaskButton = document.getElementById("add") as HTMLElement;

addTaskButton.addEventListener('click', () => {
	addTask();
});


document.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTask();
    }
});


function addTask():void{
	if(userInput.value.trim() !== ""){
		let entry = {"title":userInput.value, "done":false, "id":Math.floor(Math.random() * 100000000)};
		dataCollection.push(entry);
		addingTask(entry["title"], entry["id"]);
		localStorage.setItem("item", JSON.stringify(dataCollection));
		userInput.value = "";
		reCheck();
		userInput.focus(); 
	}
	else{
		console.log(dataCollection);
		userInput.focus();
	}
}

function addingTask(title: string, taskId: string | number): void{

    const mainClass = document.getElementById('mainClass') as HTMLElement;

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

	mainClass.innerHTML += `
		<div id="main" class="container">
			<div class="alert alert-success alert-dismissible" role="alert">
				<div class="form-checkbox">
			   		<input class="form-check-input checkbox1" type="checkbox" value="" id="flexCheckDefault" onchange="checkBox(this, '${taskId}')">
					<label class="form-check-label title fw-bolder" for="flexCheckDefault">${title}</label>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="removeTask(this, '${taskId}')" id="deleteButton"></button>
		  		</div>
			</div>
		</div>
	`;
}


function removeTask(event: HTMLElement, taskId: string | number): void{
	for(let i=0; i <= dataCollection.length; i++){
		if(dataCollection[i]["id"] == taskId){
			dataCollection.splice(i, 1);
			localStorage.setItem("item", JSON.stringify(dataCollection));
			(event.parentNode as HTMLElement).remove();
			break;
		}
	}
}

function checkBox(event: any, taskId: string | number): void{
	const checkBox = document.querySelectorAll('.checkbox1') as NodeListOf<HTMLInputElement>;
	const mainTask = document.querySelectorAll('.title') as NodeListOf<HTMLInputElement>;

	for(let i=0; i < checkBox.length; i++){
		if(checkBox[i].checked){
			dataCollection[i]['done'] = true;
			mainTask[i].style.textDecoration = 'line-through';
			localStorage.setItem('item', JSON.stringify(dataCollection));
		}
		else{
			dataCollection[i]['done'] = false;
			mainTask[i].style.textDecoration = 'none';
			localStorage.setItem('item', JSON.stringify(dataCollection));
		}
	}
}


function reCheck(){
	const checkBox = document.querySelectorAll(".checkbox1") as NodeListOf<HTMLInputElement>;
	const mainTask = document.querySelectorAll('.title') as NodeListOf<HTMLInputElement>;

	for(let i=0; i < checkBox.length; i++){
		if(dataCollection[i]['done'] === true){
			checkBox[i].checked = true;
			mainTask[i].style.textDecoration = 'line-through';
		}
	}
}

document.addEventListener("DOMContentLoaded", function(){
    const storageData: any = localStorage.getItem("item");
	const parseData = JSON.parse(storageData);
	try{
		if(parseData.length !== 0){
			for(let i=0; i < parseData.length; i++){
				dataCollection.push(parseData[i]);
				addingTask(dataCollection[i]["title"], dataCollection[i]["id"]);
			}
		}
		reCheck();
	}
	catch{
		console.log('localstorage is empty');
	}
});