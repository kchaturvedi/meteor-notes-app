# The Notes App 📝

This is a notes application built on the fantastic [Meteor](https://www.meteor.com) JS app platform and the robust [ReactJS](https://reactjs.org) front-end framework. It is deployed to the amazing and versatile [Heroku](https://heroku.com) PaaS.

I built this in order to practice and further my skills in Meteor, React, and modern web app development.

For testing, I used [Mocha](https://mochajs.org) and [AirBnB Enzyme](https://airbnb.io/enzyme/).

---

## Features 🧰
#### Auto-Save
It's 2018... no more clicking an image of a floppy disk (what are *those*?)

#### Public Note Sharing (read-only for now)
With the flick of the Sharing Switch, you can get a public link directly to your note.

Click on the link to copy it to the clipboard. Share this link with anyone and they will see a read-only version of your note.

#### Live Updating
When you have shared your note, any and every person viewing your note will see the changes updated live!

---

## Run it locally 💻

This app requires Meteor. Install it with the command:

```
curl https://install.meteor.com/ | sh
```

After Meteor is installed, clone this repo and then run the following commands in the root of the repo:

```
meteor npm install
```

```
npm start
```

After running the commands, visit `localhost:3000` in your browser to use the app.
