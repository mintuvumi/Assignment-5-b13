const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const message = document.getElementById("message");

const defaultUser = "admin";
const defaultPass = "admin123";

if(username === defaultUser && password === defaultPass){

message.innerText = "Login Successful!";
message.classList.remove("text-red-500");
message.classList.add("text-green-600");

localStorage.setItem("login",true);

setTimeout(()=>{

window.location.href="home.html";

},1000);

}

else{

message.innerText = "Invalid Username or Password!";
message.classList.remove("text-green-600");
message.classList.add("text-red-500");

}

});