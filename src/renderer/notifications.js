import Pusher from "pusher-js";

const Scaledrone = require("scaledrone-node");

const {remote} = require("electron");
const win = remote.getCurrentWindow();

export function watchScaledrone(channelID) {
    const drone = new Scaledrone(channelID);
    const room = drone.subscribe("mail");

    room.on("data", (data) => {
        notify(data.title, data.body);
    });
}

export function watchPusher(apiKey) {
    const pusher = new Pusher(apiKey, {
        cluster: "eu",
        encrypted: true,
    });

    const channel = pusher.subscribe("mail");
    channel.bind("new", function(data) {
        notify(data.title, data.body);
    });
}

function notify(title, body) {
    const audio = new Audio("static/message.oga");
    audio.play();
    const notification = new Notification(title, {
        body: body,
        silent: true,
    });
    notification.onclick = function() {
        win.show();
    };
}
