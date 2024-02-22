

// redirect to index if session is not set
if (page == "index"){


    console.log(`current page is ${page}`);

    const inputForm = document.getElementById("name-modal");
    const inputName = document.getElementById("name-input");

    inputForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if(isNaN(inputName.value) && inputName.value.length <= 20) {
            localStorage.setItem("sessionUser", inputName.value);
            window.location.href = "app.html";
        } else {
            alert("Please enter a valid name");
        }
    });


} else if(page == "app") {




    // *** INSERT SCRIPT FOR TO-DO PAGE HERE ***





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


    
    function deleteCurrentTask(id) {                    // DELETES INDIVIDUAL TASK ON DOM CONTAINER THEN ON LOCALSTORAGE
        let deleteId = `currenttask-${id}`;
        let deletedTask = document.getElementById(deleteId);
        currentTasks = currentTasks.filter(task => task.id != id);
        localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
        deletedTask.remove();
        taskCounter--;
        if(currentTasks.length == 0) {
            displayNoTasks();
        }
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


    const displayCurrentTaskList = () => {              // displays all tasks
        for(let currentTask of currentTasks) {
            currentTaskBoard.innerHTML += `
            <div id="currenttask-${currentTask.id}" class="task-box w-11/12 md:w-5/12 xl:w-3/12 h-16 md:h-24 flex md:mx-5 md:text-xl my-2 md:my-3 text-lg rounded-3xl hover:translate-y-[-10px] transition ease-in-out bg-[#FFFFFF]/70 border-[#D1D1D1] border-4">
                    <div class="flex justify-center items-center" style="flex: 15%">
                        <div class="checkbox-container mx-3 hover:bg-[#FFECA6]/80 hover:border-[#CEBC78]  hover:scale-[1.2] transition ease-in-out rounded-full">
                        </div>
                    </div>
                    <div class="flex items-center" style="flex: 70%">
                        <span class="truncate w-52 sm:w-32 xl:w-52 2xl:w-60 md:px-3">${currentTask.content}</span>
                    </div>
                    <div class="flex justify-center items-center" style="flex: 15%">
                        <button onclick="deleteCurrentTask(${currentTask.id})" class="mx-3"><i class="fa-solid fa-trash text-3xl hover:scale-[1.2] transition ease-in-out"></i></button>
                    </div>
            </div>
            `;
        }
    }


    if(currentTasks || completedTasks) {
        // ** IF TASKS EXIST
        if(completedTasks){
            taskCounter = currentTasks.length + completedTasks.length;
        } else {
            taskCounter = currentTasks.length;
        }
        
        displayNoTasks();

        // execute codes when tasks exists in localsession

        displayCurrentTaskList();

    } else {
        currentTasks = [];
        completedTasks = [];
        displayNoTasks();

        // execute codes when no tasks exists in localsession

    }

    greetName.innerText = `Hi, ${sessionUser}`;

    btnHome.addEventListener("click", function(e) {
        localStorage.clear();
        window.location.href = "app.html";
    });

    btnAdd.addEventListener("click", function(e) {
        addTaskModal.classList.remove("hidden");
    });

    btnCancelTask.addEventListener("click", function(e) {
        addTaskModal.classList.add("hidden");
    });

    btnAddTask.addEventListener("click", function(e) {
        if(inputTask.value.length >= 3) {      // adds tasks to session storage

            let lastTask;
            let taskId;

            // object constructor for new tasks
            function Task(id, content, stat) {
                this.id = id;               // unique id, incremental
                this.content = content;     // contains task string value
                this.stat = stat;           // determines whether task is done or not done
            }
            if(currentTasks.length > 0) {  // check if localstorage contains tasks
                lastTask = currentTasks[currentTasks.length-1]
                taskId = lastTask.id + 1;
            } else {
                taskId = 0;
            }

            const newTask = new Task(taskId, inputTask.value, 0);
            currentTasks.push(newTask);
            localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
            inputTask.value = "";
            taskCounter++;

            currentTaskBoard.innerHTML += `
            <div id="currenttask-${newTask.id}" class="task-box hover:translate-y-[-10px] transition ease-in-out bg-[#FFFFFF]/70 border-[#D1D1D1] border-4">
                <div class="flex w-full h-full text-xl">
                    <div class="w-full h-full flex justify-center items-center" style="flex: 30%">
                        <div class="checkbox-container hover:bg-[#FFECA6]/80 hover:border-[#CEBC78]  hover:scale-[1.2] transition ease-in-out rounded-full">
                        </div>    
                    </div>
                    <div class="w-full h-full flex items-center" style="flex: 70%">
                        <span class="truncate w-[250px]">${newTask.content}</span>
                    </div>
                    <div class="w-full h-full flex justify-center items-center" style="flex: 20%">
                        <button onclick="deleteCurrentTask(${newTask.id})"><i class="fa-solid fa-trash text-3xl hover:scale-[1.2] transition ease-in-out"></i></button>
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