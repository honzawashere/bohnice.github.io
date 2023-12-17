document.addEventListener("DOMContentLoaded", () => {
    let Lanyard = new WebSocket("wss://api.lanyard.rest/socket");

    Lanyard.onmessage = (message) => {
        handleMessage(JSON.parse(message.data), Lanyard)
    }
})

function handleMessage(message, Lanyard) {
    const data = message.d
    const op = message.op

    if(op === 1) {
        Lanyard.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ["900801159424512020"] } }))

        setInterval(() => {
            Lanyard.send(JSON.stringify({ op: 3, d: { subscribe_to_ids: ["900801159424512020"] } }))
        }, 30000)
    }
    if(op === 0) {
        if(message.t === "INIT_STATE") {
            const user = data["900801159424512020"]

            const statuses = {
                dnd: "Do Not Disturb",
                online: "Online",
                offline: "Offline",
                idle: "Idle"
            }

            const classes = {
                dnd: "do-not-disturb",
                online: "online",
                offline: "offline",
                idle: "idle"
            }

            document.querySelector("#discordStatus").innerHTML = statuses[user.discord_status]
            document.querySelector("#discordStatus").setAttribute("class", classes[user.discord_status])

            if(user.spotify !== null) {
                document.querySelector("#spotifyCover").src = user.spotify.album_art_url
                document.querySelector("#spotifyTitle").innerHTML = user.spotify.song
                document.querySelector("#spotifyArtist").innerHTML = user.spotify.artist.replace(";", ",")
                document.querySelector("#spotifyAlbum").innerHTML = user.spotify.album
                document.querySelector("#spotify").classList.remove("hidden")
                document.querySelector("#spotifyContent").setAttribute("href", "https://open.spotify.com/track/" + user.spotify.track_id)
            } else {
                document.querySelector("#spotify").classList.add("hidden")
            }

            document.querySelector("#content").classList.remove("hide")
        } else {
            const user = data

            const statuses = {
                dnd: "Do Not Disturb",
                online: "Online",
                offline: "Offline",
                idle: "Idle"
            }

            const classes = {
                dnd: "do-not-disturb",
                online: "online",
                offline: "offline",
                idle: "idle"
            }

            document.querySelector("#discordStatus").innerHTML = statuses[user.discord_status]
            document.querySelector("#discordStatus").setAttribute("class", classes[user.discord_status])

            if(user.spotify !== null) {
                document.querySelector("#spotifyCover").src = user.spotify.album_art_url
                document.querySelector("#spotifyTitle").innerHTML = user.spotify.song
                document.querySelector("#spotifyArtist").innerHTML = user.spotify.artist.replace(";", ",")
                document.querySelector("#spotifyAlbum").innerHTML = user.spotify.album
                document.querySelector("#spotify").classList.remove("hidden")
                document.querySelector("#spotifyContent").setAttribute("href", "https://open.spotify.com/track/" + user.spotify.track_id)
            } else {
                document.querySelector("#spotify").classList.add("hidden")
            }
        }
    }
}
