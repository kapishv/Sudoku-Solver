window.onload = initAll;

var b1 = new Array(81);
var c = 0;
var iarr = [];
var marr = [];
var ch = [];
var b = new Array(81);
var none = new Array(81);
var e1 = [, , 4, , 5, , , , , 9, , , 7, 3, 4, 6, , , , , 3, , 2, 1, , 4, 9, , 3, 5, , 9, , 4, 8, , , 9, , , , , , 3, , , 7, 6, , 1, , 9, 2, , 3, 1, , 9, 7, , 2, , , , , 9, 1, 8, 2, , , 3, , , , , 6, , 1, ,];
var e2 = [, 7, , , 2, , , 4, 6, , 6, , , , , 8, 9, , 2, , , 8, , , 7, 1, 5, , 8, 4, , 9, 7, , , , 7, 1, , , , , , 5, 9, , , , 1, 3, , 4, 8, , 6, 9, 7, , , 2, , , 8, , 5, 8, , , , , 6, , 4, 3, , , 8, , , 7, ,];
var e3 = [8, , 6, , 1, , , , , , , 3, , 6, 4, , 9, , 9, , , , , , 8, 1, 6, , 8, , 3, 9, 6, , , , 7, , 2, , 4, , 3, , 9, , , , 5, 7, 2, , 8, , 5, 2, 1, , , , , , 4, , 3, , 7, 5, , 2, , , , , , , 2, , 1, , 5];
var m1 = [5, , 7, 2, , , , 9, , , , 6, , 3, , 7, , 1, 4, , , , , , , 6, , 1, , , 4, 9, , , , 7, , , , 5, , 8, , , , 8, , , , 2, 7, , , 5, , 7, , , , , , , 9, 2, , 9, , 8, , 6, , , , 4, , , , 9, 3, , 8];
var m2 = [, 2, 6, , 3, , , , 8, 9, , , 6, , , 1, , , , , , , 1, 9, , 4, , , , 7, 3, , 2, , , , , , 4, , 7, , 8, , , , , , 8, , 6, 7, , , , 5, , 7, 2, , , , , , , 9, , , 5, , , 4, 4, , , , 6, , 2, 1, ,];
var m3 = [1, 5, , 2, , 9, , , 4, , 4, , , , 6, , , , , , , , 4, , , 6, 3, , 7, , , , , 8, , 6, 6, , , , , , , , 5, 2, , 8, , , , , 1, , 4, 6, , , 8, , , , , , , , 6, , , , 7, , 8, , , 5, , 1, , 4, 9];
var h1 = [, , , 8, , , 4, 2, , 5, , , 6, 7, , , , , , , , , , 9, , , 5, 7, 4, , 1, , , , , , , , 9, , 3, , 7, , , , , , , , 7, , 4, 8, 8, , , 4, , , , , , , , , , 9, 8, , , 3, , 9, 5, , , 3, , , ,];
var h2 = [1, , , , , , , , 3, , 4, , , 8, 9, , 2, , , , 2, , , 3, 9, 5, , , , , 4, 1, , 5, , , , , , , 2, , , , , , , 5, , 3, 7, , , , , 3, 4, 8, , , 6, , , , 2, , 6, 7, , , 3, , 6, , , , , , , , 9];
var h3 = [, , , , 2, , , 6, , , 8, , , , 9, 7, , , , , 6, 7, , , , , 5, 3, 4, , , , , , 2, , 2, , , , 4, , , , 3, , 6, , , , , , 9, 4, 9, , , , , 4, 5, , , , , 8, 1, , , , 3, , , 5, , , 3, , , , ,];
var l = [none, e1, e2, e3, m1, m2, m3, h1, h2, h3];

function initAll() {
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).onchange = checkInput;
        document.getElementById(i).onkeyup = checkInput;
        document.getElementById(i).onclick = adList;
    }
    selectEg();
}

function checkInput() {
    var f = 1;
    for (var i = 0; i < ch.length; i++) {
        if (this.value == ch[i]) {
            f = 0;
            this.style.fontWeight = 550;
            break;
        }
    }
    if (f) {
        this.value = "";
        this.style.fontWeight = 400;
    }
    updateBoard();
}

function adList() {
    updateBoard();
    ch = getChoices(b, this.id);
    document.getElementById("ad").innerHTML = "Allowed Digits: " + ch;
}

function blank() {
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).value = "";
        document.getElementById(i).style.fontWeight = 400;
    }
    document.getElementById("ad").innerHTML = "";
    updateBoard();
    document.getElementById("play").onclick = played;
}

function selectEg() {
    var op = document.getElementById("eg").value;
    for (var i = 0; i < 81; i++) {
        if (l[op][i]) {
            document.getElementById(i).value = l[op][i];
            document.getElementById(i).style.fontWeight = 550;
        }
        else {
            document.getElementById(i).value = "";
            document.getElementById(i).style.fontWeight = 400;
        }
    }
    updateBoard();
    document.getElementById("ad").innerHTML = "";
    document.getElementById("play").onclick = played;
}

function updateBoard() {
    for (var i = 0; i < 81; i++) {
        b[i] = document.getElementById(i).value;
    }
}

function i2rc(i) {
    return { row: Math.floor(i / 9), col: i % 9 };
}

function rc2i(r, c) {
    return r * 9 + c;
}

function getChoices(b, i) {
    var choices = [];
    for (var v = 1; v <= 9; v++) {
        if (acceptable(b, i, v)) {
            choices.push(v);
        }
    }
    return choices;
}

function acceptable(b, i, v) {
    var { row, col } = i2rc(i);
    for (var r = 0; r < 9; r++) {
        if (b[rc2i(r, col)] == v) {
            return false;
        }
    }
    for (var c = 0; c < 9; c++) {
        if (b[rc2i(row, c)] == v) {
            return false;
        }
    }
    var r1 = Math.floor(row / 3) * 3;
    var c1 = Math.floor(col / 3) * 3;
    for (var r = r1; r < r1 + 3; r++) {
        for (var c = c1; c < c1 + 3; c++) {
            if (b[rc2i(r, c)] == v) {
                return false;
            }
        }
    }
    return true;
}

function getRealChoices(b, i) {
    var realChoices = [];
    for (var v = 1; v <= 9; v++) {
        if (acceptable(b, i, v)) {
            if (uniqueBox(b, i, v) || uniqueRow(b, i, v) || uniqueCol(b, i, v)) {
                return [v];
            }
            else {
                realChoices.push(v);
            }
        }
    }
    return realChoices;
}

function uniqueBox(b, i, v) {
    var { row, col } = i2rc(i);
    var r1 = Math.floor(row / 3) * 3;
    var c1 = Math.floor(col / 3) * 3;
    for (var r = r1; r < r1 + 3; r++) {
        for (var c = c1; c < c1 + 3; c++) {
            var a = rc2i(r, c);
            if (a != i && b[a] == "" && acceptable(b, a, v)) {
                return false;
            }
        }
    }
    return true;
}

function uniqueRow(b, i, v) {
    var { row, col } = i2rc(i);
    for (var c = 0; c <= 9; c++) {
        var a = rc2i(row, c);
        if (a != i && b[a] == "" && acceptable(b, a, v)) {
            return false;
        }
    }
    return true;
}

function uniqueCol(b, i, v) {
    var { row, col } = i2rc(i);
    for (var r = 0; r <= 9; r++) {
        var a = rc2i(r, col);
        if (a != i && b[a] == "" && acceptable(b, a, v)) {
            return false;
        }
    }
    return true;
}

function bestBet(b) {
    var index, moves, bestLen = 100;
    for (var i = 0; i < 81; i++) {
        if (b[i] == "") {
            var m = getRealChoices(b, i);
            if (m.length < bestLen) {
                bestLen = m.length;
                moves = m;
                index = i;
                if (bestLen == 0) {
                    break;
                }
            }
        }
    }
    return { index, moves };
}

function solve() {
    var { index, moves } = bestBet(b);
    if (index == null) {
        return true;
    }
    for (var m of moves) {
        b[index] = m;
        if (solve()) {
            return true;
        }
    }
    b[index] = "";
    return false;
}

function solved() {
    document.getElementById("play").onclick = false;
    var s = solve();
    if (s) {
        displayBoard();
        alert("Sudoku Solved!!");
    }
    else {
        alert("Sudoku has no solutions");
    }
}

function displayBoard() {
    for (i = 0; i < 81; i++) {
        document.getElementById(i).value = b[i];
    }
}

function play() {
    var { index, moves } = bestBet(b);
    if (index == null) {
        return true;
    }
    for (var m of moves) {
        b[index] = m;
        recordGame(index, m);
        if (play()) {
            return true;
        }
    }
    b[index] = "";
    recordGame(index, "");
    return false;
}

function played() {
    disableMenu();
    var s = play();
    if (s) {
        displayGame();
    }
    else {
        alert("Sudoku has no solutions");
        enableMenu();
    }
}

function recordGame(i, v) {
    iarr.push(i);
    marr.push(v);
}

function displayGame() {
    document.getElementById(iarr[c]).value = marr[c];
    c++;
    if (c < iarr.length) {
        setTimeout(function () { displayGame(); }, 100);
    }
    else {
        setTimeout(function () {
            alert("Sudoku Solved!!");
            enableMenu();
        }, 200);
    }
}

function disableMenu() {
    document.getElementById("eg").onchange = false;
    document.getElementById("solve").onclick = false;
    document.getElementById("play").onclick = false;
    document.getElementById("reset").onclick = false;
    document.getElementById("clear").onclick = false;
}

function enableMenu() {
    document.getElementById("eg").onchange = selectEg;
    document.getElementById("solve").onclick = solved;
    document.getElementById("reset").onclick = selectEg;
    document.getElementById("clear").onclick = blank;
}