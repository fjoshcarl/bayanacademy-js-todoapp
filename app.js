

// redirect to index if session is not set
if (page == "index"){


    console.log(`current page is ${page}`);

    const inputForm = document.getElementById("name-modal");
    const inputName = document.getElementById("name-input");

    inputForm.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log(`input name value: ${inputName.value}`);
        if(isNaN(inputName.value) && inputName.value.length <= 20) {
            localStorage.setItem("sessionUser", inputName.value);
            window.location.href = "app.html";
        } else {
            alert("Please enter a valid name");
        }
    });


} else if(page == "app") {




    // *** INSERT SCRIPT FOR TO-DO PAGE HERE ***




    console.log(`current page is ${page}`);

    const btnHome = document.getElementById("btnHome");
    const btnAdd = document.getElementById("btnAdd");
    const btnAddTask = document.getElementById("btnAddTask");
    const btnCancelTask = document.getElementById("btnCancelTask");
    const greetName = document.getElementById("greet-name");
    const noTasks = document.querySelector(".no-tasks");
    const currentTasksSpan = document.querySelector(".span-current-tasks");
    const completedTasksSpan = document.querySelector(".span-completed-tasks");
    const addTaskModal = document.querySelector(".task-add-container");
    let currentTaskBoard = document.querySelector(".current-task-container-board");
    let completedTaskBoard = document.querySelector(".completed-task-container-board");
    let inputTask = document.querySelector(".task-add-input");
    let currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    let taskCounter = 0;


    
    function deleteCurrentTask(id) {
        let deleteId = `currenttask-${id}`;

        let deletedTask = document.getElementById(deleteId);
        deletedTask.remove();

        currentTasks.splice(id, 1);
        localStorage.setItem("currentTasks", JSON.stringify(currentTasks));

       
        console.log(deletedTask);
    }

    const displayCompletedTasks = () => {
        if(completedTasks >= 1) {
            currentTasksSpan.classList.remove("hidden");
        } else {      
            completedTasksSpan.classList.add("hidden");
        }
    }

    const displayNoTasks = () => {
        if(taskCounter < 1) {
            noTasks.classList.remove("hidden");
            currentTasksSpan.classList.add("hidden");
            completedTasksSpan.classList.add("hidden");
        } else {      
        noTasks.classList.add("hidden");
        currentTasksSpan.classList.remove("hidden");
        displayCompletedTasks();
        }
    }

    const displayCurrentTaskList = () => {
        let i = 0;
        for(let currentTask of currentTasks) {
            console.log(currentTask);
            currentTaskBoard.innerHTML += `
            <div id="currenttask-${i}" class="task-box hover:translate-y-[-10px] transition ease-in-out bg-[#FFFFFF]/70 border-[#D1D1D1] border-4">
                <div class="flex w-full h-full text-xl">
                    <div class="w-full h-full flex justify-center items-center" style="flex: 30%">
                        <div class="checkbox-container hover:bg-[#FFECA6]/80 hover:border-[#CEBC78]  hover:scale-[1.2] transition ease-in-out rounded-full">
                        </div>
                    </div>
                    <div class="w-full h-full flex items-center" style="flex: 70%">
                        <span class="truncate w-[250px]">${currentTask}</span>
                    </div>
                    <div class="w-full h-full flex justify-center items-center" style="flex: 20%">
                        <button onclick="deleteCurrentTask(${i})"><i class="fa-solid fa-trash text-3xl hover:scale-[1.2] transition ease-in-out"></i></button>
                    </div>
                </div>
            </div>
            `;
            i++;
        }
    }


    if(currentTasks || completedTasks) {
        // ** IF TASKS EXIST
        if(completedTasks){
            taskCounter = currentTasks.length + completedTasks.length;
        } else {
            taskCounter = currentTasks.length;
        }
        
        console.log(`taskCounter: ${taskCounter}`);
        displayNoTasks();

        // execute codes when tasks exists in localsession

        // TODO DISPLAY EXISTING TASKS
        displayCurrentTaskList();

    } else {
        currentTasks = [];
        completedTasks = [];
        displayNoTasks();

        console.log(`taskCounter: ${taskCounter}`)
        // execute codes when no tasks exists in localsession

    }

    greetName.innerText = `Hi, ${sessionUser}`;

    btnHome.addEventListener("click", function(e) {
        localStorage.clear();
        window.location.href = "app.html";
    });

    btnAdd.addEventListener("click", function(e) {
        addTaskModal.classList.remove("hidden");
        console.log(taskCounter);
        console.log(currentTasks);
    });

    btnCancelTask.addEventListener("click", function(e) {
        addTaskModal.classList.add("hidden");
    });

    btnAddTask.addEventListener("click", function(e) {
        let task = inputTask.value;
        if(task.length >= 3) {
            currentTasks.push(task);
            console.log(currentTasks);
            localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
            inputTask.value = "";
            taskCounter++;
            let taskID = JSON.parse(localStorage.getItem("currentTasks")).length - 1;

            currentTaskBoard.innerHTML += `
            <div id="currenttask-${taskID}" class="task-box hover:translate-y-[-10px] transition ease-in-out bg-[#FFFFFF]/70 border-[#D1D1D1] border-4">
                <div class="flex w-full h-full text-xl">
                    <div class="w-full h-full flex justify-center items-center" style="flex: 30%">
                        <div class="checkbox-container hover:bg-[#FFECA6]/80 hover:border-[#CEBC78]  hover:scale-[1.2] transition ease-in-out rounded-full">
                        </div>
                    </div>
                    <div class="w-full h-full flex items-center" style="flex: 70%">
                        <span class="truncate w-[250px]">${task}</span>
                    </div>
                    <div class="w-full h-full flex justify-center items-center" style="flex: 20%">
                        <button onclick="deleteCurrentTask(${taskID})"><i class="fa-solid fa-trash text-3xl hover:scale-[1.2] transition ease-in-out"></i></button>
                    </div>
                </div>
            </div>
            `;

            currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
            displayNoTasks();
            addTaskModal.classList.add("hidden");
        } else {
            alert("Please enter a valid task");
        }
    });







}