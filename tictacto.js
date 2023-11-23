const nyerestext = document.getElementById("nyerestext")
const resigomb = document.getElementById("resigomb")
const cellz = Array.from(document.getElementsByClassName("cell"))
let ures = Array(9).fill(null);
const O = "O";
const X = "X";
let jatekos = X;
let db = 0
const variaciok = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

const jatek = () => {
    cellz.forEach(cell => cell.addEventListener("click", klikk))
}

function klikk(e) {
    const id = e.target.id

    if(!ures[id] && db < 9){
        ures[id] = jatekos
        e.target.innerText = jatekos
    
        if(nyeres() !== false){
            db = 10
            return
        }
        db++
        jatekos = jatekos == X ? O : X
    }
}

function nyeres(){
    for(const i of variaciok){
        let [a,b,c] = i
        if(ures[a] && (ures[a] == ures[b] && ures[a] == ures[c])){
            if(ures[a] && (ures[a] == ures[b] && ures[a] == ures[c])){
                document.getElementById("nyerestext").innerHTML = jatekos+" -Nyert"
                document.getElementById("nyeres").classList.add("show")
            }
            return [a,b,c]
        }
        if(db == 8){
            document.getElementById("nyeres").classList.add("show")
            document.getElementById("nyerestext").innerHTML = "Döntetlen"
        } 
    }
    return false
}

resigomb.addEventListener("click", resi)

function resi(){
    ures.fill(null)
    db = 0
    cellz.forEach(cell => {
        cell.innerText = ""
    })

    nyerestext.innerHTML = ""

    jatekos = jatekos == X ? O : X

    document.getElementById("nyeres").classList.remove("show")
}

jatek();