maildam
=====

Make a desktop application from any website

![ScreenShot](https://raw.githubusercontent.com/jsnjack/maildam/master/screenshot.png)

## How to use
maildam loads configuration in JSON format from `~/.config/maildam/config.json` (Linux)

### Example 1: Side-by-side 2 Google Inbox accounts
1. Create `~/.config/maildam/config.json` file with the following content:
```json
{
    "tabs": [
        {
            "name": "Home",
            "url": "https://inbox.google.com/u/0/",
            "isActive": true
        },
        {
            "name": "Work",
            "url": "https://inbox.google.com/u/1/",
            "isActive": false
        }
    ],
    "pusher_api_key": "x123"
}
```
2. If `pusher_api_key` is provided, maildam subscribes to the channel `mail` and expects a notification to be a valid JSON object with `title` and `body` fields, like:
```json
{
    "title": "New email",
    "body": "from Yauhen <yauhen@surfly.com>",
}
```

### Example 2: HipChat as a desktop application
By default maildam looks for `config.json` file in `~/.config/maildam/` directory. It is possible to set up different working directory (profile)

1. Create `~/.config/maildam-hipchat/config.json` file:
```json
{
  "tabs": [
    {
            "name": "Hipchat",
            "url": "https://surfly.hipchat.com/chat",
            "isActive": true
    }
  ]
}
```

2. It is already possible to start using HipChat with the following command
```shell
maildam --profile hipchat --name=hipchat
```
The command starts new maildam instance with `maildam-hipchat` profile and `WM_CLASS = hipchat, hipchat` window class (Stops GNOME from combining windows from different profiles)

3. Integrate HipChat with GNOME. Create `/home/jsn/.local/share/applications/hipchatdam.desktop` file:
```
[Desktop Entry]
Name=HipChat
Comment=Hipchat with maildam
GenericName=hipchat
Exec=maildam --profile hipchat --name=hipchat
Icon=hipchat
Type=Application
StartupWMClass=hipchat
```
You will need to create an icon manually.


## Building from source
1. Clone repository and run to install dependencies
```
yarn install
```

2. Run `yarn run dev` to start in development mode

3. Run `yarn run build` to build and package into RPM
