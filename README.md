## The Details

The challenge is to build a split screen chat interface. In one browser tab, there should be two side-by-side chat windows. On the left is Laura's chat window and she's talking to Rob. On the right is Rob's chat window and he's talking to Laura.

In her window, Laura is able to type and send a message to Rob. The message should appear as a sent message in her window and as a received message in his window. Additionally, when Laura is in the middle of typing, there should be an indicator in Rob's window that she's typing. And all this should work in the other direction for Rob sending a message to Laura.

This challenge is contained to one browser tab, but in real life, Laura and Rob would be on different devices and messages would be sent over a central server. Building a server isn’t part of this challenge, but we ask that you structure your code in such a way that it’d be straightforward to get rid of the split screen and plug in a server to support real remote chatting.
 

## Setup instructions

This project requires npm version > 5 and node > 8 (preferably 8.11). [Download npm](https://www.npmjs.com/get-npm)

Assuming npm is in place, you need to run the following commands to setup the project
```
git clone git@github.com:kitkat729/r-livechat.git r-livechat
cd r-livechat
npm install
```

Note: For any reasons, if you run `npm install` before upgrading node > 8, you might get an error. You should remove
the /node_modules folder, upgrade node and re-install the app using `npm install`

To run, type in the command prompt
```
npm start
```

To stop would be a bit tricky if you don't know it. The port connecting to localhost web server won’t die even after you close the browser tab. You have to manually free the port. On a linux machine, it means to find the PID and kill process. For example, I use ubuntu. I would do use netstat, find the entry whose local address field matches my localhost, then kill the process by the PID:
```
sudo netstat -ntlp
kill -9 <PID>
```

On a mac, you do the following to free the port. Run the command and locate the PID and kill the process
```
sudo lsof -n -i:<port>  # where <port> is the assigned localhost port
kill -9 <PID>
```

## The current state of development
The project is still under development. It can be tested using the built-in npm local web server. The App initially fetches 2 static user objects, Laura and Rob, assuming the data is coming from an external source like a buddy list. So the data is given. The App loads into two chat windows, one for Laura and one for Rob. The underlying real time messaging implementation uses pub/sub, a third party package that I found online. The pub/sub portion is a simulation of 2 remote users communicating through a virtual channel, not through an acutal server like Redis. Chat messages were not directly injected to any one application's DOM. This is to demonstrate how 2 independent App can communicate real time via a medium. The Apps do not persist or load previous messages. As soon as the webpage is closed, all the messages will be gone. 

## The on-going state of development
I am working on a Redux integrated version that extends the current version. A centralized data solution, like Redux, will provide the base support for code modularity and independent data store per Subapp. The underlying pub/sub implmentation is likely to be unchanged. Scrolling the chat log to reveal the most recent message is not in yet.