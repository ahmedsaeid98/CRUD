
var productNameInp =document.getElementById("product-name");
var productPriceInp =document.getElementById("product-price");
var productCompanyInp =document.getElementById("product-company");
var productDescriptionInp =document.getElementById("product-description");
var addCol =document.getElementById("all");
var searchInp =document.getElementById("search");
var btn=document.getElementById("work-button");
var searchOut=document.getElementById("search-out")

var currentProduct=0;
var productsArray=[];
if(localStorage.getItem("products") == null)
    {
        productsArray=[];
    }
else
    {
        productsArray=JSON.parse(localStorage.getItem("products"));
        showProduct();
    }

btn.onclick = function()
{
    if(checkProduct() == true)
    {
        if(btn.innerHTML =="update product")
            {
                update();
                showProduct();
                clear();  
            }
        else
            {
                addProduct();
                showProduct();
                clear(); 
            }  
    }
    
}

function addProduct()
{
    var product={
        name:productNameInp.value,
        price:productPriceInp.value,
        company:productCompanyInp.value,
        description:productDescriptionInp.value
    }
    
    productsArray.push(product);
    localStorage.setItem("products",JSON.stringify(productsArray));
}

function showProduct()
{
    var temp="";
    for(var i=0;i<productsArray.length;i++)
        {
            temp +=`<div class="col-md-3 ">
                    <div class="border py-3">
                        <h1 class="text-dark">`+productsArray[i].name+`</h1>
                        <h5 class="text-danger">`+productsArray[i].price+`</h5>
                        <h3 class="text-primary">`+productsArray[i].company+`</h3>
                        <p class="text-muted">`+productsArray[i].description+`</p>
                        <button class="btn btn-danger" onclick=deleteProduct(`+i+`)>delete</button>
                        <button class="btn btn-warning" onclick=setForm(`+i+`)>update</button>
                    </div>
                </div>`
        }
    addCol.innerHTML = temp;
}

function clear()
{
    var temp=document.getElementsByClassName("form-control");

    for(var i=0;i<temp.length;i++)
        {
            temp[i].value="";
        }
    
}

function deleteProduct(i)
{
    productsArray.splice(i,1);
    localStorage.setItem("products",JSON.stringify(productsArray));
    showProduct();
}

function setForm(i)
{
    productNameInp.value=productsArray[i].name;
    productPriceInp.value=productsArray[i].price;
    productCompanyInp.value=productsArray[i].company;
    productDescriptionInp.value=productsArray[i].description
    
    currentProduct=i;
    btn.innerHTML ="update product";
}

function update()
{
    productsArray[currentProduct].name = productNameInp.value;
    productsArray[currentProduct].price = productPriceInp.value;
    productsArray[currentProduct].company = productCompanyInp.value;
    productsArray[currentProduct].description =productDescriptionInp.value;
    localStorage.setItem("products",JSON.stringify(productsArray));

    btn.innerHTML ="add product";   
}

searchInp.onkeyup =function()
{
    var temp=searchInp.value;
    
    var col=""
    for(var i=0;i<productsArray.length;i++)
        {
            if(productsArray[i].name.includes(temp))
                {
                col+=`<div class="col-md-3 ">
                    <div class="border py-3">
                        <h1 class="text-dark">`+productsArray[i].name+`</h1>
                        <h5 class="text-danger">`+productsArray[i].price+`</h5>
                        <h3 class="text-primary">`+productsArray[i].company+`</h3>
                        <p class="text-muted">`+productsArray[i].description+`</p>
                    </div>
                </div>`       
                }
        }
        
    searchOut.innerHTML = col;
}
searchInp.onfocusout=function()
{
    searchInp="";
    searchOut.innerHTML = "";   
}

function checkProduct(){

    let alert = document.getElementsByClassName("alert");        
    let regex= /^[a-z A-Z]{3,255}$/;

    let returnValue =true;

    if(regex.test(productNameInp.value) == false || productNameInp.value == "")
    {
        $(alert[0]).show();
        returnValue = false;
    }
    else{
        $(alert[0]).hide();
    }

    regex= /^([1-9][0-9]?[0-9]?|1000)$/

    if(regex.test(productPriceInp.value) == false || isNaN(productPriceInp.value)==true)
    {
        $(alert[1]).show();
        returnValue = false;
    }
    else{
        $(alert[1]).hide();
    }

    regex= /^[a-z A-Z]{3,255}$/;
    if(regex.test(productCompanyInp.value) == false || productNameInp.value == "")
    {
        $(alert[2]).show();
        returnValue = false;
    }
    else{
        $(alert[2]).hide();
    }


    return returnValue;
}










