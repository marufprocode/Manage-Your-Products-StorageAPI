// utility function 
const getValueById = (id) => {
    const inputValue = document.getElementById(id).value;
    return inputValue;
}

const addProductsToCart = () => {
    const productName = getValueById("product-name");
    const productQuantity = getValueById("product-quantity");
    if (productName === "" || productQuantity === "" || !isNaN(productName) || isNaN(productQuantity)){
        return;
    }
    setDataToLocalStorage(productName, productQuantity);
};

// get value from local storge 
const getDataFromLocalStorage = () => {
    const products = localStorage.getItem("all_products");
    const parsedProducts = JSON.parse(products);
    return parsedProducts;
}

// set products data to local storage 
const setDataToLocalStorage = (name, quantity) => {
    let productsData = getDataFromLocalStorage();
    if(!productsData){
         productsData = {};
    };

    if (productsData[name]){
        productsData[name] = parseInt(productsData[name])+parseInt(quantity);
    }
    else{
        productsData[name] = quantity
    };
    
    if (productsData[name]<0) {return}

    localStorage.setItem("all_products", JSON.stringify(productsData));
    displayProduct();
};

// Display product to Website from Local Storage
const displayProduct = () => {
    const products = getDataFromLocalStorage();
    const productsDiv = document.getElementById("all-products");
    productsDiv.innerHTML = "";
    for (const product in products){
        const newDiv = document.createElement('div');
        newDiv.classList.add("shadow-sm", "p-3", "mb-2", "bg-body", "rounded");
        newDiv.innerHTML = `
                <span class="fs-1">${product}</span>
                Quantity:<small class="fw-bold" id="stock">
                    ${products[product]===0? "Stock Out": products[product]}
                </small>
        `;
        productsDiv.appendChild(newDiv);
    }
}

displayProduct();




