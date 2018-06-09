import Pusher from "pusher-js";

let {remote} = require("electron");
let win = remote.getCurrentWindow();

function watchNotifications() {
    const pusher = new Pusher(window.process.env.PUSHER_API_KEY, {
        cluster: "eu",
        encrypted: true,
    });

    let channel = pusher.subscribe("mail");
    channel.bind("new", function(data) {
        let audio = new Audio("static/message.oga");
        audio.play();
        let notification = new Notification(`${data.subject}`, {
            body: `from ${data.from_name} <${data.from_email}>`,
            silent: true,
        });
        notification.onclick = function() {
            win.show();
        };
    });
}

export default watchNotifications;
