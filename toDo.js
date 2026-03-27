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


function showScreen(){
     const Start = document.getElementById("Start-screen");
    Start.classList.add('Active');
    const inScreen = document.getElementById("check-in-screen");

    const taskConfirm0 = document.getElementById('Confirm');
    const task0Exit = document.getElementById('Exit');

    taskConfirm0.addEventListener("click", showCheckIn);
    task0Exit.addEventListener("click",exitStart);

    function showCheckIn(){
        inScreen.classList.add('Active');
    }

    function exitStart(){
        alert("You've left!")
    }

    return showScreen
}

showScreen()

function hideScreen(){

}