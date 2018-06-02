import Pusher from "pusher-js";

function watchNotifications() {
    const pusher = new Pusher(window.process.env.PUSHER_API_KEY, {
        cluster: "eu",
        encrypted: true,
    });

    let channel = pusher.subscribe("mail");
    channel.bind("new", function(data) {
        new Notification(`${data.subject}`, {
            body: `from ${data.from_name} <${data.from_email}>`,
            silent: false,
        });
    });
}

export default watchNotifications;
