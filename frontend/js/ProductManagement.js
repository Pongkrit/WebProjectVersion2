function getSearchProductLists(event) {
    event.preventDefault();
    let id = document.getElementById("product-id-search").value; // Get query from a textbox
    let rooturl = `/api/product?id=${id}`;
    if(!id) rooturl = `/api/products`;
    console.log(id);

    console.log(rooturl);
    // Request URL
    fetch(rooturl)
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if (data.data.length === 0) {
            document.querySelector("#searchLists").innerHTML = "<p>No product found.</p>";
        } 
        else {
            const productListsContainer = document.querySelector("#searchLists");
            productListsContainer.innerHTML = "";
            let tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Size (mm)</th>
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Price (THB)</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.data.forEach(product => {
                    tableHTML += `
                        <tr  onclick="window.location.href='/Preview_Product_page/Preview_Product_Page.html?productID=${product.ProductID}'">
                            <td>${product.ProductID}</td>
                            <td>${product.P_name}</td>
                            <td>${product.P_size}</td>
                            <td>${product.P_material}</td>
                            <td>${product.P_quantity}</td>
                            <td>${product.P_price}</td>
                        </tr>
                    `;
                });

                tableHTML += `
                        </tbody>
                    </table>
                `;

                // tableHTML += `</table>`;
                productListsContainer.innerHTML = tableHTML;
            //  <li>${product.P_name}</li>
                // <p>what the fuck </p>
                // <img src="https://drive.google.com/thumbnail?id=${img_id}" 
                // alt="${product.P_name}" style="max-width: 400px;"> !-->
        }
    })
    .catch((err) => {
        console.error(err);
        document.querySelector("#searchLists").innerHTML = "<p>No product found.</p>";
    });
}

function clearSearchInputs() {
    document.getElementById("product-id-search").value = "";
    document.querySelector("#searchLists").innerHTML = "";
}

function insertNewProduct(event) {
    event.preventDefault();
    let id = document.querySelector("#product-id").value; // Get query from a textbox
    let name = document.querySelector("#product-name").value;
    let size = document.querySelector(`input[name="size"]`).value;
    let quantity = document.querySelector("#quantity").value;
    let price = document.querySelector("#price").value;
    let material = document.querySelector("#material").value;

    let allcolors = null;
    let colorInputs = document.querySelectorAll(`input[name="color"]:checked`);
    let colors = Array.from(colorInputs).map(input => input.value); // Get array of selected colors
    if (colors.length > 0) allcolors = `${colors.join(', ')}`; // Join colors array into comma-separated string
    
    let image = document.querySelector("#product-image").value;
    let overview = document.querySelector("#overview").value;
    let description = document.querySelector("#description").value;

    let rooturl = `/api/postproduct`; // Encode query parameter
    console.log(rooturl);

    // Request URL
    fetch(rooturl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ProductID": id,
            "P_name": name,
            "P_size": size,
            "P_quantity": quantity,
            "P_price": price,
            "P_material": material,
            "P_color": allcolors,
            "P_image": image,
            "P_status": "E",
            "P_overview": overview,
            "P_description": description
        })
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        console.log(typeof data);
        if(data.error === true){

            alert(`Duplicate entry ${id} for this product`); 
    
            // Add the new product to the UI dynamically
            document.querySelector("#insertLists").innerHTML = "";
            document.querySelector("#insertLists").innerHTML += `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Size(mm)</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Price(THB)</th>
                </tr>
                <tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${size}</td>
                    <td>${material}</td>
                    <td>${quantity}</td>
                    <td>${price}</td>
                </tr>
            </table>`;
        }
        else{
            alert("Product added successfully");
            document.querySelector("#insertLists").innerHTML = "";
            document.querySelector("#insertLists").innerHTML = "<p>Product added successfully</p>";
        }
    })
    .catch((err) => {
        console.error(err);
        alert("Failed to add product. Please try again.");
    });
}

function clearInsertInputs() { 
    document.getElementById("product-id").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("material").value = "";
    document.getElementById("product-image").value = "";
    document.getElementById("overview").value = "";
    document.getElementById("description").value = "";

    document.querySelector("#insertLists").innerHTML = "";
}

function updateProduct(event){
    event.preventDefault();
    let id = document.querySelector("#update-product-id").value; // Get query from a textbox
    let name = document.querySelector("#update-product-name").value;

    let sizeInput = document.querySelector(`input[name="rd_size"]:checked`);
    let size = sizeInput ? sizeInput.value : null;  // solve error when no checked

    let allcolors = null;
    let colorInputs = document.querySelectorAll(`input[name="update-color"]:checked`);
    let colors = Array.from(colorInputs).map(input => input.value); // Get array of selected colors
    if (colors.length > 0) allcolors = `${colors.join(', ')}`; // Join colors array into comma-separated string
    console.log(allcolors);

    let quantity = document.querySelector("#update-quantity").value;
    let price = document.querySelector("#update-price").value;
    let material = document.querySelector("#update-material").value;

    let image = document.querySelector("#update-product-image").value;
    let overview = document.querySelector("#update-overview").value;
    let description = document.querySelector("#update-description").value;

    // Construct the URL with only non-null parameters
    let rooturl = `/api/updateproduct?ProductID=${id}`;
    if (name) rooturl += `&P_name=${name}`;
    if (size) rooturl += `&P_size=${size}`;
    if (quantity) rooturl += `&P_quantity=${quantity}`;
    if (price) rooturl += `&P_price=${price}`;
    if (material) rooturl += `&P_material=${material}`;
    if (allcolors) rooturl += `&P_color=${allcolors}`;
    if (image) rooturl += `&P_image=${image}`;
    if (overview) rooturl += `&P_overall=${overview}`;
    if (description) rooturl += `&P_description=${description}`;

    console.log(rooturl);
    // Request URL
    fetch(rooturl, {
        method: 'PUT',
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if(data.error === true){
            alert("No product found.");
            document.querySelector("#updateLists").innerHTML = "<p>No product found.</p>";
        }
        else {
            alert("Product has been updated successfully.");
            const productListsContainer = document.querySelector("#updateLists");
            productListsContainer.innerHTML = "<p>Product has been updated successfully.</p>";
        }
    })
    .catch((err) => {
        console.error(err);
        alert("No product found.");
        document.querySelector("#updateLists").innerHTML = "<p>No product found.</p>";
    });
}

function deleteProduct(event){
    event.preventDefault();
    let id = document.getElementById("product-id-delete").value; // Get query from a textbox
    let rooturl = `/api/deleteproduct/id=${id}`;

    console.log(rooturl);
    // Request URL
    fetch(rooturl, {
        method: 'DELETE',
    })
    .then((res) => res.json()) // Get JSON from the response
    .then((data) => {
        console.log(data);
        if(data.error === true){
            alert("No product found.");
            document.querySelector("#deleteLists").innerHTML = "<p>No product found.</p>";
        }
        else{
            alert("Product has been deleted successfully.");
            const productListsContainer = document.querySelector("#deleteLists");
            productListsContainer.innerHTML = "<p>Product has been deleted successfully.</p>";
        }
        
    })
    .catch((err) => {
        console.error(err);
        alert("No product found.");
        document.querySelector("#deleteLists").innerHTML = "<p>No product found.</p>";
    });
}

function clearDeleteInput(){
    document.getElementById("product-id-delete").value = "";
}
