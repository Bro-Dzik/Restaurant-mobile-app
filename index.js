import { menuArray } from "/data.js"
const orderModal = document.getElementById("order-modal")
const paymentModal = document.getElementById("payment-modal")
const orderFeed = document.getElementById("order-feed")
const inputName = document.getElementById("name")
const paymentForm = document.getElementById("payment-form")
let order = []
let totalPrice = 0
 
document.addEventListener("click",function(e){
    if(e.target.dataset.add){
        addOrderItem(e.target.dataset.add)
        
 }else if(e.target.dataset.remove){
     removeOrderItem(e.target.dataset.remove)
     
 }else if(e.target.id === "complete-btn"){
     renderPayProces()
 }else if(e.target.id === "btn-pay"){
      e.preventDefault()
      paying()
    
 }
    
})
function renderPayProces(){
    paymentModal.style.display = "flex"
}
function paying(){
   const userName = inputName.value
    paymentModal.style.display = "none"
    orderFeed.innerHTML = `<div class="text-container">
        <p class="ths-msg">Thanks, ${userName}! Your order is on its way!</p>
    </div>
    `

}

function addOrderItem(itemId){
    const targetOrderItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    if(!order.includes(targetOrderItemObj)){
        order.push(targetOrderItemObj)
        totalPrice += targetOrderItemObj.price
        renderFeedOrder()
        renderOrderItems()
    }
}
function removeOrderItem(itemId){
    itemId = Number(itemId)
const targetOrderObj = order.filter(function(item){
        return item.id == itemId
    })[0]
    if(order.includes(targetOrderObj)){
        let index = order.indexOf(targetOrderObj)
        order.splice(index, 1)
        totalPrice -= targetOrderObj.price
        renderFeedOrder()
        renderOrderItems()
    }
    console.log(itemId)
}

function getFeedOrderHtml(){
    return `
    <div class="order-header">
          <h3>Your order</h3>
      </div>
    <div class="order-detail" id="order-detail">
          <-- order items here -->
      </div>
      <div class="total-price-container">
      <div class="text-total">
        <p>Total price:</p>
      </div>
      <div class="total-figure">
          <p>$${totalPrice}</p>
      </div>
      </div>
      <div class="btn-container">
      <button class="complete-btn" id="complete-btn">Complete order</button>
      </div>
    `
}

function getOrderItems(){
    let orderItems = ""
    order.forEach(function(item){
        orderItems += `
        <div class="order-container">
        <div class="order-item">
           <p>${item.name}</p>
           <button class="remove-btn" data-remove=${item.id}>remove</button>
        </div>
        <div class="order-price">
        <p>$${item.price}</p>
        </div>
        
        </div>
        `
    })
    return orderItems
}





function getFeedHtml(){
 let feedHtml = ""
 menuArray.forEach(function(item){
     feedHtml += `
     <div class="order-items">
         <div class="order-inner">
       <div class="emoji-pic">${item.emoji}
       </div>
     <div class="item-description">
       <p class="item-name">${item.name}</p>
       <p class="item-ingrigiens">${item.ingredients}</p>
       <p class="item-price" >$${item.price}</p>
       
 </div>
 <div class="icon-details">
 <div class="icon-detail">
  <button class="menu-btn" data-add="${item.id}">+</button>
  </div>
  </div>
       </div>
       
       
              </div>

          
     `
     
 })
 return feedHtml
}

 getFeedHtml()
 
 
function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
}
render()

function renderOrderItems(){
    document.getElementById("order-detail").innerHTML = getOrderItems()
    
}

function renderFeedOrder(){
    orderFeed.innerHTML = getFeedOrderHtml()
}

