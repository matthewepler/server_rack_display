# Server Rack Display
This system is designed to display real-time network data. It receives GET requests with the data set in query parameters and publishes them to a browser canvas. 

### Hardware
* 2U rack (dim)
* Mac Mini
* Matrox TripleHeadToGo Digital SE
* 3x HDMI screens
* 3x 2A power supplies
* power strip
* 3x HDMI cables
* miniDisplay and USB extension cables
* 3D printed frame for HDMI screens (link)
* Laser cut frame for faceplate (link)

### Software
Make sure the Triple Head is setup properly and the three external screens are showing as a single screen before proceeding.


Pull this repo to the Mac Mini’s desktop.
All directories that appear Capitalized are operational animations that respond to live data. You can run them individually, or launch the menu with index.html (recommended). To do the latter, follow these steps:

1. cd into the “server_rack_display” dir. 
2. run “node server.js”
3. Navigate browser to localhost:3000

Select the animation you want to run by right-clicking and opening in a new window. This will open a small (500 x 500) preview of the animation. To create a full-size (3840 x 716) canvas, toggle the  ‘1’ key. Move the screen to the rack monitor. Press ‘1’ if you haven’t already, then force the browser into full screen mode. Voila. 

### Sending Data
To send data to the server, send GET requests to the Mac Mini's IP address with the port appended and the query information formatted like this: 

```
http://<IP Address>:3000/update?cpuLoad=<#>&ramUse=<#>&cpuTemp=<#>
```

Javascript Example:
```javascript
var baseURL = "http://<IP Address>:3000/update?";
baseURL += "cpuLoad=" + cpuLoad;
baseURL += "&ramUse=" + ramUse;
baseURL += "&cpuTemp" + cpuTemp;

httpGet(baseURL, null, null, null, function(err) {
	console.log(err);
});
```

### Running Locally
If running locally and you need to feed it some dummy data, use the “Sender App” to do that:

1. open another Terminal window, and ```cd``` into the “server_rack_display/sender_app” directory.
2. run ```python -m SimpleHTTPServer 8000```
3. open new browser window and navigate to```localhost:8000``` to see the data controls

This app will send a GET request with the data in the query parameters, just like it would happen with any other real data.


### Animation Parameters
BARS
* CPU Load - overall height
* Ram Usage - bar size
* CPU Temp - color hue of bars

BALLS
* CPU Load - speed 
* Ram Use  - number 
* CPU Temp - color

RINGS
* CPU Load - frequency
* Ram Use  - diameter
* CPU Temp - color

BOXES/"FIREFLIES"
* CPU Load - spin speed
* Ram Use  - num of boxes
* CPU Temp - color

TEXT
* CPU Load - (direct)

- - -
# TO-D0
(as of 12/14/2015)

- Neuron/Node animation
- Particle Illusion tests (Peter's suggestion)
- show new results to Peter and get feedback for next round
- single screen solution is shipping from China and should be installed soon
- try NeoPixel solution (LED) 