let n = 0
function cigan() {
    if (n === 360) { n = 0 }

    const img = document.querySelector("img")
    n++
    img.style.transform = `rotate(${n}deg)`
}
function dalordino() {
    setInterval(() => { cigan() }, 0)
}