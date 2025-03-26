document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
})


let products = [
    { id: 1, image:'./image/motorbike.jpg', title:'wooden toy', price: 100, count:1, },
    { id: 2, image:'./image/car.jpg', title:'wooden toy', price: 200, count:1, },
    { id: 3, image:'./image/dumptruck.jpg', title:'wooden toy', price: 300, count:1, },
    { id: 4, image:'./image/helicopter.jpg', title:'wooden toy', price: 400, count:1, },
    { id: 5, image:'./image/montessori-object.jpg', title:'wooden toy', price: 500, count:1, },
    { id: 6, image:'./image/montessori_frog.webp', title:'wooden toy', price: 600, count:1, },
    { id: 7, image:'./image/montessori_shape.jpg', title:'wooden toy', price: 700, count:1, },
    { id: 8, image:'./image/tumbler-toy-montessori.jpg', title:'wooden toy', price: 800, count:1, },
  ];



function RenderInThePage(){
    document.getElementById("box2").innerHTML = products && products.map((item,ind)=>{
        let{id,image,title,price} = item
        // console.log(title);
   
        return `
            <div class="card" style="width: 18rem;height: 330px;">
            <div class="card-body">
                <div id="card-parent">
                    <div id="card-child">
                        <img id="img" src="${image}" class="card-img-top" alt="wooden-toy">
                    </div>
                </div>
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${price}</p>
              <button class="btn btnclick btn-primary" onclick="orderData(${ind})">Add to card</button>
            </div>
        </div>
        `
      }).join(" ")
}

// ------------------------------- // addcardfun() //--------------------------------

function addCardfun(){

  document.getElementById("card-details").innerHTML = addCard && addCard.map((item,ind)=>{
       
    let{id,image,title,price,count} = item

    document.getElementById("card-count").innerHTML = addCard.length;

    // let newData = addCard.filter((item,index)=>{addCard.indexOf(item) == index});
    // console.log(newData);


    return `
  <div id="product-order">
  <div id="imgtag">
    <img id="img1" src="${image}" alt="wooden-toy">
  </div>
  <div id="title">
    ${title}
  </div>
  <div id="icon">
  <button id="button"  onClick="inc_dec(${id},'Decrement')"><i class="fa-solid fa-minus change-value" id="minus-icon" ></i></button>
  
  </div>
  <div id="quantity">
    ${count}
  </div>
  <div id="icon">
  <i class="fa-solid fa-plus change-value" onclick="inc_dec(${id},'Increment')"></i>
  </div>
  
  <div id="amount">
  ${price}
  </div>
  
  <div id="icon">
  <i class="fa-solid fa-trash change-trash" onclick="deleteCartItem(${id})"></i>
  </div>
  
  </div> 
  <br>
    ` 
  }).join(" ")

  
} 

//--------------------------------------------// to get new array ORDER-DATA //-----------------------------

let addCard = JSON.parse(localStorage.getItem("productData"))  || []; //---get stored data from local storage

// console.log(addCard);

let button = document.getElementById("button")  //  console.log();
console.log(button);

function orderData(index){
let existingData = products[index]

console.log(existingData.id);


if(addCard.some((v,i)=>{ return v.id === existingData.id })){
  alert("this product was already exist")
  return
}

if(existingData.count === 1){

   console.log(button);
   if(button){

      button.disabled = true
   }
   else{
    console.log("not found");
    
   }
   
}

    addCard.push({...existingData,count:1}) // ---- push new array datas
    // addCard = addCard2;
    addCardfun();
    uiCardCount();   
}


// --------------- DUPLICATE REMOVE -----------

// function orderData(index){
//   let selectedProduct = products[index]
//   let existingProduct = addCard.find(item => item.id === selectedProduct.id);

//   if(existingProduct){
//     existingProduct.count++;
//   }else{
//     addCard.push({...selectedProduct});
//   }

//   localStorage.setItem("productData",JSON.stringify(addCard)) // --- store data to localstorage (set data) 
//   addCardfun();
//   uiCardCount();
// }


//---------------------------// delete item function - 1st Method  //-----------------------------

function deleteCartItem(idValue){
 console.log(idValue);
 // Remove all occurrences of 30
 addCard = addCard.filter(item => item.id !== idValue);
 console.log(addCard); // Output: [10, 20, 40, 50]

 addCardfun();
 uiCardCount();

}

addCardfun();
// uiCardCount()


//-------------------------------------// INCREMENT & DECREMENT  //-----------------------------

 // + -> add count 

 function inc_dec(idValue,Operation) {
  // console.log(idValue);

  // Find the item in the array and increase its count
  addCard = addCard.map((item) => {
    if (item.id === idValue) {

      // Ensure count is treated as a number and increment by 1
      if(Operation==="Increment"){item.count = Number(item.count) + 1;
        addCardfun();
        uiCardCount();
        // removeDuplicate(idValue)
      }
      else if(Operation==="Decrement" && item.count > 1){
        item.count = Number(item.count) - 1;
        addCardfun();
        uiCardCount();
        // console.log(item.count);

        if(item.count===1){
          console.log("disable");
          
        }
        
        // removeDuplicate(idValue)
      }
      
    }
    return item;
  });

  // console.log(addCard);

}
 addCardfun();


 //---------------------------------// count update in ui cart  //--------------------------------------

 function uiCardCount(){

  localStorage.setItem("productData",JSON.stringify(addCard)) // --- store data to localstorage (set data) 
  // console.log(addCard);



  let sumOf = addCard.reduce((acc,cur)=>{return acc += cur.count},0)

  // console.log(sumOf);
  

  addCardfun();
  document.getElementById("card-count").innerHTML = sumOf;
  }


//---------------------------------- // to remove Duplicate products //--------------------------------

// let addCard2 = [];

// addCard.forEach((data)=>{ 
//   if(!addCard2.includes(data)){
//     addCard.push(data);
//   }
// })
// console.log(addCard);

// console.log(addCard2);




























// window.addEventlistener / .onload function - used to store the function and run it after the html and css  page was rendering completely in browser.
// DOMContentLoaded - whenever the window page render this  js functions all have to run.

// 1st method 

window.addEventListener("DOMContentLoaded",()=>{
    RenderInThePage()
})









// -----------------------------------------// OTHER / 2ND methods // --------------------------------------

//2nd method

//onload-after render the window the given function are render.
// window.onload = function(){
//     RenderInThePage()
// }



////////////////////////----------delete item function -2nd Method-----------////////////////////////////////


function deleteCartItems(idValue){
  // Remove all occurrences of 30
  addCard = addCard.filter((item) => 
    {
   return item.id !== idValue;
}); // Output: [10, 20, 40, 50]
console.log(addCard)

  addCardfun();
 }




 
//   let x=10;

  // ternary opr
  // x===10 ?  console.log("true") : console.log("false");


  //------------------------2nd method---------------------------//

 // <div id="icon">
  // <i class="fa-solid fa-minus change-value" onClick="inc_dec(${ind}, -1)"></i>
  // </div>

  // <div id="icon">
  // <i class="fa-solid fa-plus change-value" onClick="inc_dec(${ind}, +1)"></i>
  // </div>

  

 function incdec(indexValue,count){ 
  console.log(indexValue,count);

  let matchData = addCard.filter((item,ind)=>{
    
    return ind === indexValue

  });

  matchData[0].count = Math.max(1,matchData[0].count += count) // to stop the - value will execute only after 1 not allow below 1

  addCardfun();
  // console.log(matchData);
  
 }


 //--------------------------------- // Store & get data in local storage //-----------------------------


// localStorage.setItem("productData",JSON.stringify(addCard)) // to set data in local storage 

// let addCard = JSON.parse(localStorage.getItem("productData"))  || []; //---get stored data from local storage

// console.log(addCard);


addCardfun();