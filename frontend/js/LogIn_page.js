function signin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    let rooturl = `/api/signin`;

    function setLoggedInState() {
        sessionStorage.setItem('loggedIn', 'true');
    }

    fetch(rooturl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Login_Info":{
                "L_username": username,
                "L_password": password
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(typeof data);
        if(!data.error) {
            setLoggedInState();
            alert("Login successful");
            window.location.href = "/Management_page/Management_Page.html";
        } else {
            alert(data.message);
        }
        
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert("Username or password is incorrect. Try again");
    });
}