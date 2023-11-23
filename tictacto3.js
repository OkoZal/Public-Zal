const cellz = document.querySelectorAll(".cell");
const nyerestext = document.getElementById("nyerestext");
const resigomb = document.getElementById("resigomb");
const ures = [];
let jatekos = "CROSS";
let nyert = false;

function egyen(one, two) {
    if (one === two) return one;
    return false;
}

function egyenlo(jatekos, array) {
    for (const item of array) {
        const a = ures[item[0]];
        const b = ures[item[1]];
        if (egyen(a, b) == jatekos) {
            return [item[0], item[1]];
        }
    }
    return false;
}

function checkbox(val) {
    if (val) {
        for (const i of val) {
            const cell = document.querySelector(`[data-box-num="${i}"]`);
        }
        return true;
    }
    return false;
}

function nyeres() {
    let val = false;
    if (ures[0] == jatekos) {
        val = egyenlo(jatekos, [
            [1, 2],
            [3, 6],
            [4, 8],
        ]);
        if (val && checkbox([0, ...val])) return true;
    }
    if (ures[8] == jatekos) {
        val = egyenlo(jatekos, [
            [2, 5],
            [6, 7],
        ]);
        if (val && checkbox([8, ...val])) return true;
    }
    if (ures[4] == jatekos) {
        val = egyenlo(jatekos, [
            [1, 7],
            [3, 5],
            [2, 6],
        ]);
        if (val && checkbox([4, ...val])) return true;
    }
    return val;
}

function dontetlen(len) {
    if (len >= 3 && nyeres()) {
        nyert = true;
        if (jatekos == "CROSS") {
            nyerestext.innerText = "X -Nyert";
            document.getElementById("nyeres").classList.add("show")
        } else {
            nyerestext.innerText = "O -Nyert";
            document.getElementById("nyeres").classList.add("show")
        }
    } else if (len == 8) {
        nyert = true;
        nyerestext.innerText = "Döntetlen";
        document.getElementById("nyeres").classList.add("show")
    }
    return nyert;
}

function klikk(targetBox, player, boxNum) {
    ures[boxNum] = player;
    targetBox.classList.add(player.toLowerCase());
}

function vege(e) {
    let len = ures.filter(Boolean).length;
    const boxNum = parseInt(e.target.getAttribute("data-box-num"));
    let boxNumForBot;

    if (!nyert && !ures[boxNum]) {
        jatekos = "CROSS";
        klikk(e.target, "CROSS", boxNum);

        if (dontetlen(len) === false) {
            len = ures.filter(Boolean).length;
            jatekos = "ZERO";
            while (len < 9) {
                boxNumForBot = Math.floor(Math.random() * 9);
                if (!ures[boxNumForBot]) {
                    klikk(cellz[boxNumForBot], "ZERO", boxNumForBot);
                    dontetlen(len);
                    break;
                }
            }
        }
    }
}

resigomb.addEventListener("click", function () {
    cellz.forEach((item) => {
        item.classList.remove("cross", "zero");
    });
    ures.length = 0;
    jatekos = "CROSS";
    nyerestext.innerText = "";
    nyert = false;
    document.getElementById("nyeres").classList.remove("show")
});

cellz.forEach((item) => {
    item.addEventListener("click", (e) => vege(e));
});