# raspbiewalkie
a small talkie app for raspberry: record then send to a server for sharing, done in nodejs just for fun

Just for fun :
* Record a voice message (duration set in app.js for the moment, should move to DB)
* Send it to an email address and/or an online server
* This is a voice bulleting board I'm building for my kids,... very limited features :)

I'm trying to keep it RESTful

raspbies (messages) are stored in mongoDB with a limited structure for the moment :
- username
- rasTitle
- rasPath : name of the file. we make it "medias/file.wav" when playing

GET /raspbies : list of raspbies
PUT /raspbies : create a new raspbie
GET /raspbies/id : display one raspbie
GET /raspbies/newraspbie: page for recording a raspbie

recording & playing is bound to arecord & aplay as I was not able to find an HTML5 audio capable browser for Raspberry PI

the HTML pages communicate with the backend using sockets to send information 

TODO:
* proper UI for mini RPI screen
* deploy online version of a server with sockets & auth
* add a send option to send a raspbie to the web version
* create a "stream" page with automatic update
