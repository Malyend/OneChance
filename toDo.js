// App Start! Less do this! 

// let checkIn 
// let checkOut 


/* 
function startScreen(){
    const Start = document.getElementById("Start-screen");
    Start = document.getElementById("Start-screen").style.opacity = 1;
    return startScreen
} 
    this works.
    */

    const task0Exit = document.getElementById('Exit');

     // Leave the app
    task0Exit.addEventListener("click",exitStart);

     function exitStart(){
        alert("You've left!")
    }


function swapScreen(){
    
    // The Start Screen
     const Start = document.getElementById("Start-screen");
    Start.classList.add('Active');

    const taskConfirm0 = document.getElementById('Confirm');

    // The Check in Screen
    const inScreen = document.getElementById("check-in-screen");
    const taskConfirm1 = document.getElementById("Confirm-1");

    const outScreen = document.getElementById("check-out-screen");
    
    //Start Screet --> In screen
    taskConfirm0.addEventListener("click", showCheckIn);

    function showCheckIn(){
        inScreen.classList.add('Active');
        Start.classList.remove('Active');
    }

    // In screen --> Out screen
    taskConfirm1.addEventListener("click", showCheckOut)

    function showCheckOut(){
        inScreen.classList.remove('Active')
        outScreen.classList.add('Active')
    }

    //In screen --> Start screen
    const task1Exit = document.getElementById('Exit-1');
    
    task1Exit.addEventListener("click", backToStart )

    function backToStart() {
        Start.classList.add('Active')
        inScreen.classList.remove('Active');
    }

    //out screen --> In Screen
    const task2Exit = document.getElementById('Exit-2');

    task2Exit.addEventListener("click", backToIn )

    function backToIn() {
        inScreen.classList.add('Active');
        outScreen.classList.remove('Active');
    }
   
    //out Screen --> Complete!
    const taskConfirm2 = document.getElementById("Confirm-2");

    taskConfirm2.addEventListener("click", completeScreen)

    function completeScreen(){
        alert("You've Completed! Well done!")
    }
    return swapScreen
}

swapScreen()
