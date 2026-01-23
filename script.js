let msgArea = document.querySelector("#msg");

function signUp() {
    userName = document.querySelector("#signUp-username").value;
    userPassword = document.querySelector("#signUp-password").value;
    
    if (!userName || !userPassword) {
        msgArea.innerText = "Please fill both fields!";
        return;
    }

    localStorage.setItem("userName", userName);
    localStorage.setItem("Password", userPassword);

    msgArea.innerText = "Account created! Redirecting to logIn... ";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

function logIn() {
    userName = document.querySelector("#logIn-username").value;
    userPassword = document.querySelector("#logIn-password").value;

    let savedUserName = localStorage.getItem("userName");
    let savedUserPassword = localStorage.getItem("Password");
    
    
    if (userName == savedUserName && userPassword == savedUserPassword) {
        window.location.href = "dashboard.html";
        localStorage.setItem("isloggedIn" , true);
    } 
    else {
        msgArea.innerText = "Invalid Username or Password! Try again...";
    }
}
function logOut() {
    window.location.href = "index.html";
    localStorage.setItem("isloggedIn" , false);
}

