const basePath = window.location.pathname.match(/^\/p\/\d+/) ? window.location.pathname.match(/^\/p\/\d+/)[0] : '';
let rooturl = `${basePath}/api/products`;
let products = null;

function getProducts() {
    fetch(rooturl)
        .then((res) => res.json())
        .then((data) => {
            // CHING: Display products data on the webpage here!
            products = data.data;
            console.log(products);
            addDataToHTML();
        })
        .catch((err) => {
            console.error(err);
            document.querySelector(".comming-soon").innerHTML += "<br><p>Coming Soon</p>";
        });
}

// add data product to HTML
let listProduct = document.querySelector('.productLists');
function addDataToHTML(){
    if(products && products.length > 0 ){
        products.forEach(product => {
            // create new element item
            let newProduct = document.createElement('a');
            newProduct.href = "../Detail_Product_page/Detail_Product_Page.html?productID=" + product.ProductID;
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
    } else {
        // Handle case when products is null or empty
        console.log("No products found.");
    }
    
}

// Call getProducts function to fetch and display products
getProducts();
