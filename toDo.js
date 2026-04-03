// App Start! Less do this! 

    navigator.serviceWorker.register('./serviceWorker.js')
    .then(() => console.log('SW registered!'))
    .catch((err) => console.log('SW failed:', err));

    //Notification Permission
    
    /* Firefox needs an event handler for notifications to work. You can't just pop notifications in once the page loads. 
    Someone from Overstack had a good answer I want to try out: 

    JAVASCRIPT
    if (Notification.permission === 'granted') {
    //do something
}
else if (Notification.permission === 'default') {
    $('#allow-push-notification-bar').show();
}

$('#allow-push-notification').click(function () {
    $('#allow-push-notification-bar').hide();
    Notification.requestPermission().then(function (status) {
        if (status === 'denied') {
            //do something
        } else if (status === 'granted') {
            //do something
        }
    });
});

HTML
<div id="allow-push-notification-bar" class="allow-push-notification-bar">
    <div class="content">
        <div class="text">
            Want to get notification from us?
        </div>
        <div class="buttons-more">
            <button type="button" class="ok-button button-1" id="allow-push-notification">
                Yes
            </button>
            <button type="button" class="ok-button button-1" id="close-push-notification">
                No
            </button>
        </div>
    </div>
</div>

maybe that can help me make my own version of this. 
Anyway I'm going to sleep. 
Be back tomorrow to try this out. 
     */
    function showNotification(){
    
        Notification.requestPermission().then( perm => {
            if(perm === "granted"){
                new Notification("Notifications enabled", {
                    body: "Try not to regret your life choices",
                    tag: "Greeting",
                    icon: "./Images/maskable_icon_x192.png",
                })
            }
        })
        }
    showNotification()

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

        console.log("Times are saved")

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

 
    // Get the current time
   
    setInterval(() => {
         if (!localStorage.getItem("checkIn") || (!localStorage.getItem("checkOut"))){ 
        return
    }; 

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Get the Check in time, split the Hour and the Minutes, convert them into integers and check for the minute and hour to align. It's beautiful ^_^
        const checkIn = localStorage.getItem("checkIn").split(":");
        const checkInHour = Number(checkIn[0]);
        const checkInMinute = Number(checkIn[1]);

        if (checkInHour == currentHour && checkInMinute == currentMinute){
            new Notification("The time has come", {
                body: "Welp, good luck of your day",
                icon: "./Images/maskable_icon_x192.png",
            })
        } 

        const checkOut = localStorage.getItem("checkOut").split(":");
        const checkOutHour = Number(checkOut[0]);
        const checkOutMinute = Number(checkOut[1]);

        if (checkOutHour == currentHour && checkOutMinute == currentMinute){
            new Notification("The ending always comes...", {
                body: "You have died",
                icon: "./Images/maskable_icon_x192.png",
        })
        }
    }, 45000);
        
