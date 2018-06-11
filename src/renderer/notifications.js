import Pusher from "pusher-js";

let {remote} = require("electron");
let win = remote.getCurrentWindow();

function watchNotifications(apiKey) {
    const pusher = new Pusher(apiKey, {
        cluster: "eu",
        encrypted: true,
    });

    let channel = pusher.subscribe("mail");
    channel.bind("new", function(data) {
        let audio = new Audio("static/message.oga");
        audio.play();
        let notification = new Notification(`${data.title}`, {
            body: `${data.body}`,
            silent: true,
        });
        notification.onclick = function() {
            win.show();
        };
    });
}

export default watchNotifications;
