## The Details

The challenge is to build a split screen chat interface. In one browser tab, there should be two side-by-side chat windows. On the left is Laura's chat window and she's talking to Rob. On the right is Rob's chat window and he's talking to Laura.

In her window, Laura is able to type and send a message to Rob. The message should appear as a sent message in her window and as a received message in his window. Additionally, when Laura is in the middle of typing, there should be an indicator in Rob's window that she's typing. And all this should work in the other direction for Rob sending a message to Laura.

This challenge is contained to one browser tab, but in real life, Laura and Rob would be on different devices and messages would be sent over a central server. Building a server isn’t part of this challenge, but we ask that you structure your code in such a way that it’d be straightforward to get rid of the split screen and plug in a server to support real remote chatting.
 

## Setup instructions

This project requires npm. [Download npm](https://www.npmjs.com/get-npm)

Assuming npm is in place, you need to run the following commands to setup the project
```
git clone git@github.com:kitkat729/r-livechat.git r-livechat
cd r-livechat
npm install
npm start
```

## The current state of development
The project is still under development. It can be tested using the built-in npm local web server. The App initially fetches 2 static user object, Laura and Rob, assuming the data is coming from somewhere, perhaps from a buddy list. So the data is given. The App loads into two chat windows, one for Laura and one for Rob. The underlying real time messaging implementation uses pub/sub, a third party package that I found online. The pub/sub portion is a simulation of 2 remote users communicating through a virtual channel, not through an acutal server like Redis. Chat messages were not directly injected to any one application's DOM. This is to demonstrate how 2 independent App can communicate real time via a medium. The Apps do not persist or load previous messages. As soon as the webpage is closed, all the messages will be gone. 

## The on-going state of development
I am working on a Redux integrated version that extends the current version. A centralized data solution, like Redux, will provide the base support for code modularity and independent data store per Subapp. The underlying pub/sub implmentation is likely to be unchanged. Scrolling the chat log to reveal the most recent message is not in yet.