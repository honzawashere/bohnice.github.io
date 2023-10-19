let n = 0
function cigan() {
    if (n === 360) { n = 0 }

    const img = document.querySelector("img")
    n++
    img.style.transform = `rotate(${n}deg)`
}
function dalordino() {
    document.body.onclick = () => {
        if(document.querySelector("#click-me").classList.contains("hidden")) {
            if(document.querySelector("audio").paused) {
                document.querySelector("#audio").play()
            } else {
                document.querySelector("#audio").pause()
            }
            return
        }
        setInterval(() => { cigan() }, 0)
        document.querySelector("#click-me").classList.add("hidden")
        document.querySelector("#audio").play()
    }
}