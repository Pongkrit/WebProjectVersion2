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
            showDetail();
        })
}

function showDetail () {
    let productId = null;
    // Get the current URL of the webpage
    let currentUrl = window.location.href;

    // Find the index of the parameter name in the URL
    let index = currentUrl.indexOf('productID=');

    if (index !== -1) {
        // Extract the substring containing the value of the parameter
        productId = currentUrl.substring(index + 'productID='.length);
        
        console.log(productId); // Output: ProductID of tht product
    } else {
        console.log("Product ID parameter not found in the URL.");
    }

    // Retrieve the value of the "id" parameter from the URL
    let thisProduct = products.filter(value => {
        return value.ProductID == productId
    })[0];
    // if there is no product has id = productId
    // => return to home page
    if (!thisProduct){
        console.log(productId);
        window.location.href = "/index.html";
    }
    // and if has, add data this product in html
    // call image from google drive link
    let img_link = thisProduct.P_image;
    let parts = img_link.split("/"); // Split the URL string using the "/" character as the delimiter
    let img_id = parts[parts.length - 2]; // The part you need is the fourth element of the array
    
    // Wait for the DOM content to be fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        let mainProductImg = document.querySelector('.main_product');

        // Check if the element exists before attempting to set its properties
        if (mainProductImg) {
            mainProductImg.src = `https://drive.google.com/thumbnail?id=${img_id}`;
        } else {
            console.error("Element with class 'main_product' not found.");
        }
        let detail = document.querySelector('.right_column');
        detail.querySelector(".title").innerHTML += thisProduct.P_name;

        // color code
        let colors = []; // Array to store colors

        // Check each color option and assign the corresponding color code
        if (thisProduct.P_color.includes("White")) colors.push("#d8d3d3a9");
        if (thisProduct.P_color.includes("Pink")) colors.push("#dda2dd");
        if (thisProduct.P_color.includes("Blue")) colors.push("#5bc2ed");
        if (thisProduct.P_color.includes("Yellow")) colors.push("#fae82c");
        if (thisProduct.P_color.includes("Green")) colors.push("#47e74d");

        let content = detail.querySelector(".details");
        let colorHTML = colors.map(color => `<span style="color: ${color};" class="fa fa-circle"></span>`).join(' ');

        // Add color circles to the HTML
        content.querySelector(".color").innerHTML += `
            <p>Colors: ${colorHTML} ${thisProduct.P_color}</p>
        `;

        let material = null;
        if(thisProduct.P_material == "J") material = "Jade";
        if(thisProduct.P_material == "G") material = "Gold";
        if(thisProduct.P_material == "M") material = "Moonstone";
        if(thisProduct.P_material == "P") material = "Pearl";
        if(thisProduct.P_material == "Q") material = "Quartz Crystal";
        
        content.querySelector(".Materials").innerHTML += `
        <p>Material: ${material}<span id="materialPlaceholder"></span></p>
        `;

        content.querySelector(".detail").innerHTML += `<section>${thisProduct.P_overall}</section>`;

        let price_quant = detail.querySelector(".p_left-price");
        price_quant.querySelector("#productleftPlaceholder").innerHTML = `${thisProduct.P_quantity.toLocaleString()} piece(s) left`;
        // convert the normal number to price format
        let options = { style: 'currency', currency: 'THB' };
        let price = thisProduct.P_price.toLocaleString('th-TH', options); // Format the price with commas and currency symbol using toLocaleString()
        price_quant.querySelector("#pricePlaceholder").innerHTML = price;

        document.querySelector(".content-description").innerHTML = thisProduct.P_description;
        
    });
}
getProducts();
