const loginInput = document.getElementById("login-input");
const loginBtn = document.getElementById("enter");
const msgInput = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");
const msgContainer = document.querySelector(".message-container") 

const socketio = io({autoConnect:false});
socketio.connect()

let currentUserName;
loginBtn.addEventListener("click",()=>{

  document.querySelector("#login").style.display = "none"
  document.querySelector(".msg-fieldset").style.display ="block";  
  document.querySelector(".inputs").style.display ="block";  
  
  socketio.emit("user_join",loginInput.value);
  currentUserName = loginInput.value;

  let namePlace = document.createElement("h2");
  namePlace.innerText = `**${currentUserName}**`;
  namePlace.style.textAlign = "center"
  document.body.insertBefore(namePlace,document.body.firstChild);
})
sendBtn.addEventListener("click",()=>{
  socketio.emit("message",msgInput.value);
  msgInput.value = "";
})

socketio.on("message",(msgObj)=>{
  message = document.createElement("div");
  if (msgObj.userName === currentUserName){
    message.setAttribute("class","message sent");
    message.innerHTML = `<span>YOU</span> <br>${msgObj.message}`;
    msgContainer.appendChild(message);
  }
  else{
    message.setAttribute("class","message received");
    message.innerHTML = `<span>${msgObj.userName}</span> <br>${msgObj.message}`;
    msgContainer.appendChild(message);
  }
})
// var socket = io.connect('http://' + document.domain + ':' + location.port);
