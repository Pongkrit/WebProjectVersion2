const basePath = window.location.pathname.match(/^\/p\/\d+/) ? window.location.pathname.match(/^\/p\/\d+/)[0] : '';
function getSearchProductName(event) {
    event.preventDefault();
    let searchname = document.getElementById("product-name-search").value; // Get query from a textbox
    document.querySelector(".notfound").innerHTML = "";
    // Remove trailing comma from material string
    console.log(material)
    let rooturl = `${basePath}/api/productsearch?name=${searchname}`;
    if(!searchname)  rooturl = `${basePath}/api/products`;
    // Construct root URL with searchname and material parameters

    console.log(rooturl);
    document.querySelector('.productLists').innerHTML = "";
    let listProduct = document.querySelector('.productLists');
    let products = null;

    // Request URL
    fetch(rooturl)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        products = data.data;
        if (data.error) { // Check for error property
            document.querySelector(".notfound").innerHTML = "";
            document.querySelector(".notfound").innerHTML += "No product found.";
        } 
        else {
            if (products.length === 0) {
                document.querySelector(".notfound").innerHTML = "";
                document.querySelector(".notfound").innerHTML += "No product found.";
            } 
            else {
                products.forEach(product => {
                    // create new element item
                    let newProduct = document.createElement('a');
                    newProduct.href = "/Detail_Product_page/Detail_Product_Page.html?productID=" + product.ProductID;
                    newProduct.classList.add('item');
        
                    // call image from google drive link
                    let img_link = product.P_image;
                    let parts = img_link.split("/"); // Split the URL string using the "/" character as the delimiter
                    let img_id = parts[parts.length - 2]; // The part you need is the fourth element of the array
        
                    // convert the normal number to price format
                    let options = { style: 'currency', currency: 'THB' };
                    let price = product.P_price.toLocaleString('th-TH', options); // Format the price with commas and currency symbol using toLocaleString()
        
                    newProduct.innerHTML = `
                        <img src="https://drive.google.com/thumbnail?id=${img_id}">
                        <h2>${product.P_name}</h2>
                        <div class="price">${price}</div>
            
                    `;
            
                    //  add this element in productLists class
                    listProduct.appendChild(newProduct);
                });
            }
        }
        })
        .catch((err) => {
            console.error(err);
            document.querySelector(".notfound").innerHTML = "";
            document.querySelector(".notfound").innerHTML += "No product found.";
        });
}
function advancedSearch(event) {
    event.preventDefault();
    document.querySelector(".notfound").innerHTML = "";
    let name = document.getElementById("product-name-search").value;
    let sort = document.querySelector("#sort").value;
    let material = document.querySelector("#material").value;

    let sizeInputs = document.querySelectorAll(`input[name="size"]:checked`);
    let sizes = Array.from(sizeInputs).map(input => input.value); // Get array of selected sizes
    console.log(sizes);

    let colorInputs = document.querySelectorAll(`input[name="color"]:checked`);
    let colors = Array.from(colorInputs).map(input => input.value); // Get array of selected colors
    console.log(colors);

    let rooturl = `${basePath}/api/advancedSearchProduct?P_name=${name}`;

    if (sizes.length > 0) rooturl += `&P_size=${sizes.join(',')}`; // Join sizes array into comma-separated string
    if (colors.length > 0) rooturl += `&P_color=${colors.join(',')}`; // Join colors array into comma-separated string
    if (material) rooturl += `&P_material=${material}`;
    if (sort) rooturl += `&sort=${sort}`;


    document.querySelector('.productLists').innerHTML = "";
    let listProduct = document.querySelector('.productLists');
    let products = null;
    // Make API request with constructed URL
    fetch(rooturl)
        .then(response => response.json())
        .then(data => {
            // Handle response data
            console.log(data);
            products = data.data;
            if (data.error) { // Check for error property
                document.querySelector(".notfound").innerHTML += "No product found.";
            } 
            else {
                if (products.length === 0) {
                    document.querySelector(".notfound").innerHTML += "No product found.";
                } 
                else {
                    products.forEach(product => {
                        // create new element item
                        let newProduct = document.createElement('a');
                        newProduct.href = "/Detail_Product_page/Detail_Product_Page.html?productID=" + product.ProductID;
                        newProduct.classList.add('item');
            
                        // call image from google drive link
                        let img_link = product.P_image;
                        let parts = img_link.split("/"); // Split the URL string using the "/" character as the delimiter
                        let img_id = parts[parts.length - 2]; // The part you need is the fourth element of the array
            
                        // convert the normal number to price format
                        let options = { style: 'currency', currency: 'THB' };
                        let price = product.P_price.toLocaleString('th-TH', options); // Format the price with commas and currency symbol using toLocaleString()
            
                        newProduct.innerHTML = `
                            <img src="https://drive.google.com/thumbnail?id=${img_id}">
                            <h2>${product.P_name}</h2>
                            <div class="price">${price}</div>
                
                        `;
                
                        //  add this element in productLists class
                        listProduct.appendChild(newProduct);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector(".notfound").innerHTML = "";
            document.querySelector(".notfound").innerHTML += "No product found.";
        });
}

function clearInput() {
    // Get all input elements within the form
    let inputFields = document.querySelectorAll('.form-group input[type="checkbox"], .form-group select');

    // Iterate over each input element
    inputFields.forEach(input => {
        // For checkboxes, uncheck them
        if (input.type === 'checkbox') {
            input.checked = false;
        } else if (input.tagName.toLowerCase() === 'select') {
            // For select elements, reset to the default option (first option)
            input.selectedIndex = 0;
        }
    });
    document.querySelector("#product-name-search").value = "";
}
