/** Changes span instruction to "Click" or "Touch" according to screen size */
window.onload = function getScreen() {
    if (screen.width < 800) {
        var command = "Touch";
        document.getElementById('instruction').innerHTML = command + " an area:";
    } else {
        var command = "Click";
        document.getElementById('instruction').innerHTML = command + " an area:";
    }
}
var player;

/** Click event */
function add(btn) {
    /** Checks if the button is already clicked */
    if (btn.innerHTML != "") {
        document.getElementById("res").innerHTML = "Area already selected. <strong>Choose another area</strong>."
        /** Shows the button message already clicked */
        document.getElementById("res").style.display = "block";
    } else {
        document.getElementById("res").innerHTML = "";
        /** Check the player */
        if (player == "" || player == "O") {
            btn.innerHTML = "<span class='o'>O</span>";
            check();
            player = "X";
            /** Switches the intruction message to the player X */
            document.getElementById('instruction').innerHTML = "Player time <strong>" + player + "</strong>.";
        } else {
            btn.innerHTML = "<span class='x'>X</span>";
            check();
            player = "O";
            /** Switches the intruction message to the player O */
            document.getElementById('instruction').innerHTML = "Player time <strong>" + player + "</strong>.";
        }
    }
}

/** Check if the game is over */
function check() {
    if (idValue(0, 0) != "" && idValue(0, 0) == idValue(0, 1) && idValue(0, 1) == idValue(0, 2) ||
        idValue(1, 0) != "" && idValue(1, 0) == idValue(1, 1) && idValue(1, 1) == idValue(1, 2) ||
        idValue(2, 0) != "" && idValue(2, 0) == idValue(2, 1) && idValue(2, 1) == idValue(2, 2) ||
        idValue(0, 0) != "" && idValue(0, 0) == idValue(1, 0) && idValue(1, 0) == idValue(2, 0) ||
        idValue(0, 1) != "" && idValue(0, 1) == idValue(1, 1) && idValue(1, 1) == idValue(2, 1) ||
        idValue(0, 2) != "" && idValue(0, 2) == idValue(1, 2) && idValue(1, 2) == idValue(2, 2) ||
        idValue(0, 0) != "" && idValue(0, 0) == idValue(1, 1) && idValue(1, 1) == idValue(2, 2) ||
        idValue(0, 2) != "" && idValue(0, 2) == idValue(1, 1) && idValue(1, 1) == idValue(2, 0)) {
        /** Show a span with the result if there was victory */
        document.getElementById("res").innerHTML = "Player <strong>" + player + "</strong> won!";
        document.getElementById("res").style.display = "block";
        clear();
        /** Score the player if there was a victory */
        if (player == "X") {
            var value = parseInt(document.getElementById("ptX").value);
            value += 1;
            document.getElementById("ptX").value = value;
        } else {
            var value = parseInt(document.getElementById("ptO").value);
            value += 1;
            document.getElementById("ptO").value = value;
        }
    } else {
        /** Check for a tie. Returns "false" by default if any buttons are not already populated */
        var draw = true;
        for (var i = 0; i <= 2; i++) {
            for (var j = 0; j <= 2; j++) {
                if (idValue(i, j) == "") {
                    draw = false;
                }
            }
        }
        document.getElementById("res").style.display = "none";
    }
    if (draw == true) {
        /** Shows the tie message, if there was */
        document.getElementById("res").innerHTML = "Game <strong>tied</strong>!";
        document.getElementById("res").style.display = "block";
        clear();
    }
}

/** Function that returns the IDs of each button */
function idValue(i, j) {
    var id = document.getElementById("btn_" + i + "_" + j);
    return id.innerText;
}

/** Clean the buttons */
function clear() {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            if (idValue(i, j)) {
                document.getElementById("btn_" + i + "_" + j).innerText = "";
            }
        }
    }
}