const basePath = window.location.pathname.match(/^\/p\/\d+/) ? window.location.pathname.match(/^\/p\/\d+/)[0] : '';
function getSearchAccountLists(event) {
    event.preventDefault();
    let id = document.getElementById("employee-id-search").value; // Get query from a textbox
    let rooturl = `${basePath}/api/account?id=${id}`;
    if(!id) rooturl = `${basePath}/api/accounts`;
    console.log(id);

    console.log(rooturl);
    // Request URL
    fetch(rooturl)
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if (data.data.length === 0) {
            document.querySelector("#searchLists").innerHTML = "<p>No Employee ID found.</p>";
        } 
        else {
            const emplyeeListsContainer = document.querySelector("#searchLists");
            emplyeeListsContainer.innerHTML = "";
            let tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>EmpID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.data.forEach(account => {
                    tableHTML += `
                        <tr  onclick="window.location.href='/Admin_Profile1/adminprofile1.html?EmpID=${account.EmpID}'">
                            <td>${account.EmpID}</td>
                            <td>${account.A_fname} ${account.A_lname}</td>
                            <td>${account.A_gender}</td>
                            <td>${account.L_username}</td>
                            <td>${account.L_password}</td>
                            <td>${account.A_role}</td>
                        </tr>
                    `;
                });

                tableHTML += `
                        </tbody>
                    </table>
                `;

                // tableHTML += `</table>`;
                emplyeeListsContainer.innerHTML = tableHTML;
            //  <li>${product.P_name}</li>
                // <p>what the fuck </p>
                // <img src="https://drive.google.com/thumbnail?id=${img_id}" 
                // alt="${product.P_name}" style="max-width: 400px;"> !-->
        }
    })
    .catch((err) => {
        console.error(err);
        document.querySelector("#searchLists").innerHTML = "<p>No Employee ID found.</p>";
    });
}

function insertNewUser(event) {
    event.preventDefault();
    let id = document.querySelector("#employee-id").value; // Get query from a textbox
    let fname = document.querySelector("#employee-fname").value;
    let lname = document.querySelector("#employee-lname").value;
    let username = document.querySelector(`#username`).value;
    let password = document.querySelector("#password").value;
    let genderInput = document.querySelector(`input[name="gd"]:checked`);
    let gender = genderInput ? genderInput.value : null;
    let contact = document.querySelector("#contact").value;
    let email = document.querySelector(`#email`).value;
    let address = document.querySelector("#address").value;
    let image = document.querySelector("#employee-image").value;
    let role = document.querySelector("#role").value;

    // Check if any required field is empty
    if (!id || !fname || !lname || !username || !password || !gender || !contact || !email || !address || !image || !role) {
        alert("Please fill in all the required fields follwing the criteria and description. Otherwise, your insertion will error!");
        return;
    }

    let rooturl = `${basePath}/api/postaccount`; // Encode query parameter
    console.log(rooturl);

    // Request URL
    fetch(rooturl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "EmpID": id,
            "A_contact": contact,
            "A_gender": gender,
            "A_role": role,
            "A_fname": fname,
            "A_lname": lname,
            "A_image": image,
            "A_status": "enable",
            "A_email": email,
            "A_address": address,
            "L_username": username,
            "L_password": password,
        })
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        console.log(typeof data);
        if(data.error === true){

            alert(`Duplicate entry EmpID: ${id} or Username: ${username} for this account.`); 
        }
        else{
            alert("User account added successfully");
    
            // Add the new product to the UI dynamically
            document.querySelector("#insertLists").innerHTML = "";
            document.querySelector("#insertLists").innerHTML += `
            <table>
                <tr>
                    <th>EmpID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
                <tr  onclick="window.location.href='/Admin_Profile1/adminprofile1.html?EmpID=${account.EmpID}'">
                    <td>${id}</td>
                    <td>${fname} ${lname}</td>
                    <td>${gender}</td>
                    <td>${username}</td>
                    <td>${password}</td>
                    <td>${role}</td>
                </tr>
            </table>`;
        }
    })
    .catch((err) => {
        console.error(err);
        alert("Failed to add employee account. Please try again.");
    });
}

function updateUser(event){
    event.preventDefault();

    let id = document.querySelector("#update-employee-id").value; // Get query from a textbox
    let fname = document.querySelector("#update-employee-fname").value;
    let lname = document.querySelector("#update-employee-lname").value;
    let username = document.querySelector(`#update-username`).value;
    let password = document.querySelector("#update-password").value;

    let genderInput = document.querySelector(`input[name="update-gd"]:checked`);
    let gender = genderInput ? genderInput.value : null;

    let contact = document.querySelector("#update-contact").value;
    let email = document.querySelector(`#update-email`).value;
    let address = document.querySelector("#update-address").value;
    let image = document.querySelector("#update-employee-image").value;
    let role = document.querySelector("#update-role").value;

    // Construct the URL with only non-null parameters
    let rooturl = `${basePath}/api/updateaccount?EmpID=${id}`;
    if (fname) rooturl += `&A_fname=${fname}`;
    if (lname) rooturl += `&A_lname=${lname}`;
    if (username) rooturl += `&L_username=${username}`;
    if (password) rooturl += `&L_password=${password}`;
    if (gender) rooturl += `&A_gender=${gender}`;
    if (contact) rooturl += `&A_contact=${contact}`;
    if (email) rooturl += `&A_email=${email}`;
    if (address) rooturl += `&A_address=${address}`;
    if (image) rooturl += `&A_image=${image}`;
    if (role) rooturl += `&A_role=${role}`;

    console.log(rooturl);
    // Request URL
    fetch(rooturl, {
        method: 'PUT',
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if(data.error === true){
            alert("No Employee Account found.");
            document.querySelector("#updateLists").innerHTML = "<p>No Employee Account found.</p>";
        }
        else {
            alert("Product has been updated successfully.");
            const productListsContainer = document.querySelector("#updateLists");
            productListsContainer.innerHTML = "<p>Employee Account has been updated successfully.</p>";
        }
    })
    .catch((err) => {
        console.error(err);
        alert("No Employee Account found.");
        document.querySelector("#updateLists").innerHTML = "<p>No Employee Account found.</p>";
    });
}

function deleteUser(event){
    event.preventDefault();
    let id = document.getElementById("employee-id-delete").value; // Get query from a textbox
    let rooturl = `${basePath}/api/deleteaccount/id=${id}`;

    console.log(rooturl);
    // Request URL
    fetch(rooturl, {
        method: 'DELETE',
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if(data.error === true){
            alert(`No EmpID:${id} found.`);
            document.querySelector("#deleteLists").innerHTML = `<p>No EmpID:${id} found.</p>`;
        }
        else{
            alert("This employee has been deleted successfully.");
            const productListsContainer = document.querySelector("#deleteLists");
            productListsContainer.innerHTML = "<p>This employee has been deleted successfully.</p>";
        }
        
    })
    .catch((err) => {
        console.error(err);
        alert(`No EmpID:${id} found.`);
        document.querySelector("#deleteLists").innerHTML = `<p>No EmpID:${id} found.</p>`;
    });
}
