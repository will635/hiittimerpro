let title;
let sets;
let warmupCooldownDuration;
let warmupCooldownColourDoc;
let warmupCooldownColour;
let highRPEName;
let highRPEDuration;
let highRPEColourDoc;
let highRPEColour;
let restName;
let restDuration;
let restColourDoc;
let restColour;
//end of variables for the setup
let dontRepeat = 0;
let dontRepeatRest = 0;
let elapsedTime = 0;
let dontCallTwice = true;
let counter = 0;
//storage variables
let numbers = [];
//remaining time
let repeatA;
let remaining;
let completedSets = 0;
let y;
let j = 0;
let isPause = false;

function getVariables() {
    sets = document.getElementById("totalSets").value;
    title = document.getElementById("title").value;
    warmupCooldownDuration = document.getElementById("warmupCooldown").value;
    warmupCooldownColourDoc = document.getElementById("warmupCooldownColour").value;
    warmupCooldownColour = getColour(warmupCooldownColourDoc);
    highRPEName = document.getElementById("effortName").value;
    highRPEColourDoc = document.getElementById("hardColour").value;
    highRPEColour = getColour(highRPEColourDoc);
    highRPEDuration = document.getElementById("effortTime").value;
    restName = document.getElementById("restName").value;
    restDuration = document.getElementById("restTime").value;
    restColourDoc = document.getElementById("restColour").value;
    restColour = getColour(restColourDoc);

  
  if (warmupCooldownDuration <= 0) {
    warmupCooldownDuration = 1;
  }
  
  if (highRPEDuration <= 0) {
    highRPEDuration = 1;
  }
  
   if (restDuration <= 0) {
   restDuration = 1;
  }

    
    numbers.push(warmupCooldownDuration);
    numbers.push(highRPEDuration);
    numbers.push(restDuration);

    document.getElementById("hiit").style.display = "grid";
    document.getElementById("hiitTitle").style.display = "block"; // title not displaying correctly
    document.getElementById("setup").style.display = "none";
    document.getElementById("hiitTitle").textContent = title;

} //getVariables


function getColour(phaseColour) {
    
    let x;

    if (phaseColour == 1){
        x = "green";
    } else if (phaseColour == 2) {
        x = "blue";
    } else if (phaseColour == 3) {
        x = "red";
    } else if (phaseColour == 4) {
        x = "yellow";
    } else if (phaseColour == 5) {
        x = "black";
    } else {
        x = "purple";
    }

    return x;
} //getColour

function warmupTimer() {
    document.getElementById("work").style.backgroundColor = warmupCooldownColour;
    document.getElementById("rest").style.backgroundColor = warmupCooldownColour;
    document.getElementById("work").textContent = "WARMUP";
    document.getElementById("rest").textContent = "WARMUP";
    document.getElementById("startWorkout").style.display = "none";
    document.getElementById("set").innerHTML = completedSets + " / " + sets;
    warmupCooldownDuration = numbers[0];
    calculateRemaining();
    elapsed();
        const timer = setInterval(function() {
        if (warmupCooldownDuration > 0 && !isPause) {
            document.getElementById("time").innerHTML = warmupCooldownDuration;
            warmupCooldownDuration--;
        }
        if (warmupCooldownDuration === 0 && !isPause) {
            if (dontCallTwice) {
                clearInterval(timer);
                rpeTimer();
                dontCallTwice = false;
            }
        }
    }, 1000);
}

function elapsed() {
    if (!isPause) {
    y = getRemaining();
    const timerElapsed = setInterval(function() {
        if (!isPause) {
        document.getElementById("elapsed").innerHTML = elapsedTime;
        elapsedTime++;
        if (elapsedTime == y) {
            clearInterval(timerElapsed);
        }
    }
    }, 1000);

}
}

function rpeTimer() {
    counter + 1;
    dontRepeat = 0;
    highRPEDuration = numbers[1];
    if (completedSets < sets && !isPause) {
    const rpeTimerConst = setInterval(function() {
        if (highRPEDuration > 0 && !isPause) {
            document.getElementById("work").textContent = "WORK";
            document.getElementById("rest").textContent = "REST";
            document.getElementById("work").style.backgroundColor = highRPEColour;
            document.getElementById("rest").style.backgroundColor = "#29282f";
            document.getElementById("time").innerHTML = highRPEDuration;

            highRPEDuration--;
        }
        if (highRPEDuration === 0 && !isPause) {
            if (dontRepeat == 0) {
                clearInterval(rpeTimerConst);
                completedSets++;
                document.getElementById("set").innerHTML = completedSets + " / " + sets;
                restTimer();
                repeatA = false;
                dontRepeat = 1;

            }
        }
    }, 1000);

} else {
    cooldownTimer();
}
}

function restTimer() {
    dontRepeatRest = 0;
    restDuration = numbers[2];
    if (completedSets <= sets && !isPause) {
    const restTimerConst = setInterval(function() {
        if (restDuration > 0 && !isPause) {
            document.getElementById("rest").style.backgroundColor = restColour;
            document.getElementById("work").style.backgroundColor = "#29282f";
            document.getElementById("time").innerHTML = restDuration;

            restDuration--;
        }
        if (restDuration === 0 && !isPause) {
            if (dontRepeatRest == 0) {
                clearInterval(restTimerConst);
                rpeTimer();
                dontRepeatRest = 1;

            }
        }
    }, 1000);
}
}

function calculateRemaining(){
    remaining = getRemaining();
    const remainingTimeConst = setInterval(function() {
        if (remaining > 0 && !isPause) {
            document.getElementById("remaining").innerHTML = remaining;
            remaining--;
        } else if (remaining === 0 && !isPause) {
            clearInterval(remainingTimeConst);
            document.getElementById("remaining").innerHTML = "0 :)";
            done();
        }
    }, 1000);

}

function getRemaining() {
    remaining = numbers[0] * 2;
    remaining += sets * numbers[1];
    remaining += sets * numbers[2];

    return remaining;
}

function cooldownTimer() {
    warmupCooldownDuration = numbers[0];

    const cooldownTimer = setInterval(function() {
        if (warmupCooldownDuration > 0 && !isPause) {
            document.getElementById("work").style.backgroundColor = warmupCooldownColour;
            document.getElementById("rest").style.backgroundColor = warmupCooldownColour;
            document.getElementById("work").innerHTML = "COOLDOWN";
            document.getElementById("rest").innerHTML = "COOLDOWN";
            document.getElementById("time").innerHTML = warmupCooldownDuration;
            warmupCooldownDuration--;
        } else if (warmupCooldownDuration === 0 && !isPause) {
            document.getElementById("time").innerHTML = "Done";
            clearInterval(cooldownTimer);
        }
    }, 1000);
}


function done() {
    document.getElementById("elapsed").textContent = getRemaining();
}

let m = 0;
function stop(){
    document.getElementById("cancel").innerText = "Are you sure?";
    j++;

    if (j > 1) {
        document.getElementById("hiit").style.display = "none";
        document.getElementById("hiitTitle").textContent = "Timer Cancelled";
        
        setTimeout(function() {
          location.reload();
        }, 2000);
  
    }

    const returnToX =  setInterval(function () {
       if (m <= 5) {
        m++;
       } else {
        clearInterval(returnToX);
        j = 0;
        document.getElementById("cancel").textContent = "X";
        m = 0;
       }
    },1000);
}

let k = 0
function pause() {
    if (k % 2 == 0) {
        isPause = true;
        document.getElementById("pause").innerHTML = "&#9658;";
    } else {
        isPause = false;
        document.getElementById("pause").innerHTML = "| |";
    }
    k++;
}