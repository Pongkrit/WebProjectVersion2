const basePath = window.location.pathname.match(/^\/p\/\d+/) ? window.location.pathname.match(/^\/p\/\d+/)[0] : '';
let rooturl = `${basePath}/api/accounts`;
let accounts = null;

function getAccounts() {
    fetch(rooturl)
        .then((res) => res.json())
        .then((data) => {
            // CHING: Display products data on the webpage here!
            accounts = data.data;
            console.log(accounts);
            showDetail();
        })
}

function showDetail () {
    let empId = null;
    // Get the current URL of the webpage
    let currentUrl = window.location.href;

    // Find the index of the parameter name in the URL
    let index = currentUrl.indexOf('EmpID=');

    if (index !== -1) {
        // Extract the substring containing the value of the parameter
        empId = currentUrl.substring(index + 'EmpID='.length);
        
        console.log(empId); // Output: ProductID of tht product
    } else {
        console.log("EmpID parameter not found in the URL.");
    }

    // Retrieve the value of the "id" parameter from the URL
    let thisAccount = accounts.filter(value => {
        return value.EmpID == empId
    })[0];
    // if there is no product has id = productId
    // => return to home page
    if (!thisAccount){
        console.log(empId);
        window.location.href = `${basePath}/usermng/usermng.html`;
    }
    // and if has, add data this product in html
    // call image from google drive link
    let img_link = thisAccount.A_image;
    let parts = img_link.split("/"); // Split the URL string using the "/" character as the delimiter
    let img_id = parts[parts.length - 2]; // The part you need is the fourth element of the array

    let gender = null;
    if(thisAccount.A_gender === "F") gender = "Female";
    if(thisAccount.A_gender === "M") gender = "Male";

    document.querySelector(".employee-photo").src = `https://drive.google.com/thumbnail?id=${img_id}`;
    document.querySelector(".info").innerHTML += `
        <p class="emp-id"><b class="start_bold">Employee ID: ${thisAccount.EmpID}</b></p>
        <p><b class="start_bold">Name: </b>${thisAccount.A_fname} ${thisAccount.A_lname}</p>
        <p><b class="start_bold">Gender: </b>${gender}</p>
        <p><b class="start_bold">Email: </b>${thisAccount.A_email}</p>
        <p><b class="start_bold">Contact: </b>${thisAccount.A_contact}</p>
        <p><b class="start_bold">Address: </b>${thisAccount.A_address}</p>
        <p><b class="start_bold">Role: </b>${thisAccount.A_role}</p>
    `;
    document.querySelector("#username").value = `${thisAccount.L_username}`;
    document.querySelector("#password").value = `${thisAccount.L_password}`;
}
getAccounts();
