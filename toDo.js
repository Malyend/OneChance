// App Start! Less do this! 

    navigator.serviceWorker.register('./serviceWorker.js');

    // Confirm var assignment
    const taskConfirm0 = document.getElementById('Confirm');
    const taskConfirm1 = document.getElementById("Confirm-1");
    const taskConfirm2 = document.getElementById("Confirm-2");

    // Exit var assignment
    const task0Exit = document.getElementById('Exit');
    const task1Exit = document.getElementById('Exit-1');
    const task2Exit = document.getElementById('Exit-2');

    // Screen var assignments
    const Start = document.getElementById("Start-screen");
    const inScreen = document.getElementById("check-in-screen");
    const outScreen = document.getElementById("check-out-screen");

    // On click - confirm and exit buttons
    taskConfirm0.addEventListener("click", showCheckIn);
    taskConfirm0.addEventListener("click", saveTimes)

    taskConfirm1.addEventListener("click", showCheckOut);
    taskConfirm1.addEventListener("click", saveAndGetTask);

    taskConfirm2.addEventListener("click", completeScreen)

    task0Exit.addEventListener("click",exitStart);
    task1Exit.addEventListener("click", backToStart )
    task2Exit.addEventListener("click", backToIn )

    //active on default
    Start.classList.add('Active');
    
    // Screen changing workflow

    // Exit
    function exitStart(){
        alert("You've left!")
    }

      function backToStart() {
        Start.classList.add('Active')
        inScreen.classList.remove('Active');
    }

     function backToIn() {
        inScreen.classList.add('Active');
        outScreen.classList.remove('Active');
    }

    // Continue
      function showCheckIn(){
        inScreen.classList.add('Active');
        Start.classList.remove('Active');
    }

     function showCheckOut(){
        inScreen.classList.remove('Active')
        outScreen.classList.add('Active')
    }
    
    function completeScreen(){
        alert("You've Completed! Well done!")

        return localStorage.clear()
    };

    // LocalStorage API


    function saveTimes(){
        // Time Assignment
        const checkInTime = document.getElementById("check-in").value;
        const checkOutTime = document.getElementById("check-out").value;

        localStorage.setItem("checkIn", checkInTime);
        localStorage.setItem("checkOut", checkOutTime);

        return
    }


    function saveAndGetTask(){
        // Task values are saved in these variables
        const savedTask1 = document.getElementById("task1").value;
        const savedTask2 = document.getElementById("task2").value;
        const savedTask3 = document.getElementById("task3").value;
        const savedTask4 = document.getElementById("task4").value;
        const savedTask5 = document.getElementById("task5").value;

        const tasksSaved = [ `${savedTask1}`, `${savedTask2}`, `${savedTask3}`, `${savedTask4}`, `${savedTask5}` ];

        //localStorage only reads string items, however you can parse other data types to return them. Such as an integer or a boolean, i don't need that yet. 

        localStorage.setItem("Tasks", JSON.stringify(tasksSaved));
        const retrieved = JSON.parse(localStorage.getItem("Tasks"));
        // Items in an Array? Get!
         document.getElementById("task1-out").value = retrieved[0];
         document.getElementById("task2-out").value = retrieved[1];
         document.getElementById("task3-out").value = retrieved[2];
         document.getElementById("task4-out").value = retrieved[3];
         document.getElementById("task5-out").value = retrieved[4];

        return
    }

 

