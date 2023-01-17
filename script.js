{
   let hideDoneTasks = false;
   
    let tasks = [
        {
            content: "test_task_one",
            done: false,
        },
        {
            content: "test_task_two",
            done: true,
        },

    ]
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        })
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

    bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });

        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });

        });
    }

    const markAllTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));

        render();
    }

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const Done = () => {
        const buttonDone = document.querySelector(".allDone_button")
       
        buttonDone.addEventListener("click", (event) => {
           event.preventDefault();
            markAllTasksDone();
     
    })
    }

  

    const render = () => {
        let htmlString = ""

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} ">
            
            <button class="js-done">${task.done ? "✔" : ""}</button>
            <span class="newtask${task.done ? " task--done" : ""}">${task.content}</span>
            <button class="js-remove">🗑</button>
            </li>
            `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
        Done();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTask.value = "";
        };
        newTask.focus();
    }
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        const element = document.querySelector(".js-newTask")

        if (element === true) {
            element.innerText = "";
        }
    }
    init();

}
