
genarateOrderId();
genarateResOrderId();
updateDate();

function updateDate() {
    let now = new Date();
    let today = now.getDate()  + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    $("#txtDate").val(today);
}



//search Item start
$("#txtSelectItemCode").on('keyup',function (e) {
      console.log(e.key);
    var existItem=0;
    if (e.key=="Enter") {
        var itemCode = $("#txtSelectItemCode").val();

        for (var i in itemDB) {
            if (itemCode == itemDB[i].getCode()) {
                $("#txtSelectItemDescription").val(itemDB[i].getName());
                $("#txtSelectItemPrice").val(itemDB[i].getPrice());
                $("#txtSelectQTYOnHand").val(itemDB[i].getQty());

                 existItem=1;
            }
        }
        if (existItem==0){
            $("#txtSelectItemDescription").val('');
            $("#txtSelectItemPrice").val('');
            $("#txtxtICodetSelectQTYOnHand").val('');
            $("#txtSelectItemDiscount").val('');
            alert("No Such as Item..!");
        }

    }
});
//search Item End





//add to cart start
$("#btnAddToTable").click(function () {

   /*var itemCode= $("#txtSelectItemCode").val();
   var itemName= $("#txtSelectItemDescription").val();
   var itemPrice= $("#txtSelectItemPrice").val();
   var qtyOnHand=$("#txtSelectQTYOnHand").val();


  var qty=parseInt( $("#txtQty").val());

  //var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);
  var totalItemPrice=itemPrice*qty;


      var itemExist=0;
      for(var i in cartItems){
          if (cartItems[i].getItemCode()==itemCode){

             var oldItemQty =cartItems[i].getItemQty();
             var newItemQty=oldItemQty+qty;

              cartItems[i].setItemQty(newItemQty);
              cartItems[i].setItemPrice(itemPrice);
              cartItems[i].setTotalItemPrice(totalItemPrice);
              itemExist=1;
              loadCart();
              break;
          }
      }
      if (itemExist==0){
          var orderCart = new OrderCart(itemCode,itemName,qty,itemPrice,totalItemPrice);
          cartItems.push(orderCart);
          loadCart();
      }



*/

    var itemCode= $("#txtSelectItemCode").val();
    var itemName= $("#txtSelectItemDescription").val();
    var itemPrice= $("#txtSelectItemPrice").val();
    var qty=parseInt( $("#txtQty").val());
    var totalItemPrice=itemPrice*qty;
    var Oqty=parseInt($('#txtSelectQTYOnHand').val());
    if($('#txtQty').val()!="") {
        if (Oqty < qty) {
            alert("Not Available This QTY");
        } else {
            var itemExist = 0;
            for (var i in cartItems) {
                if (cartItems[i].getItemCode() == itemCode) {

                    var oldItemQty = cartItems[i].getItemQty();
                    var newItemQty = oldItemQty + qty;

                    cartItems[i].setItemQty(newItemQty);
                    cartItems[i].setItemPrice(itemPrice);
                    cartItems[i].setTotalItemPrice(totalItemPrice);
                    itemExist = 1;
                    loadCart();
                    break;
                }
            }
            if (itemExist == 0) {
                var orderCart = new OrderCart(itemCode, itemName, qty, itemPrice, totalItemPrice);
                cartItems.push(orderCart);
                qtyUpdate();
                loadCart();

            }
        }
    }else {
        alert("Please Enter Order Qty");
    }
});


function loadCart(){
    var total=0;

    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total+=i.getTotalItemPrice();
        $("#orderTable").append(row);
    });

    $("#total").text('');
    $("#total").text(total);
    $("#subtotal").text('');
    $("#subtotal").text(total);


}


$("#txtCash,#txtDiscount").on('keyup',function (e) {
         keyPress();
});




function keyPress() {
    var total=$("#total").text();
    var cash= $("#txtCash").val();
    var discount=$("#txtDiscount").val();




           if (cash!=''){
               $("#txtBalance").val('');
               $("#txtBalance").val(cash-total);

               if (discount!=''){
                   var itemFinallytotal= total-((discount/100)*total);
                   $("#subtotal").text('');
                   $("#subtotal").text(itemFinallytotal);
                   $("#txtBalance").val('');
                   $("#txtBalance").val(cash-$("#subtotal").text());
               }else {
                   $("#subtotal").text('');
                   $("#subtotal").text(total);
                   $("#txtBalance").val('');
                   $("#txtBalance").val(cash-total);
               }

           }else {
               $("#txtBalance").val('');
           }


        /*  if (discount!='' && cash!=''){

              alert("ok");
               /!* $("#subtotal").text(itemFinallytotal);

                if (cash==''){
                    alert("cash");
                    $("#txtBalance").val('');
                }else {
                    alert("cashFound");}
              $("#txtBalance").val('');
              $("#txtBalance").val(cash-subTotal);

          }else {
              $("#subtotal").text('');
              $("#subtotal").text(total);*!/
          }else {
              alert("no");
          }*/
/*
          if(discount==''){

          }*/




 /*   if (discount!=''){
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);

    }else {
        $("#subtotal").text(total);
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);
    }

    if (cash!=''){
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);


    }else {
        $("#txtBalance").val('');
    }
*/

}





/*
function genarateOrderId() {
    var array=new Array();

    for (var i in customerDB){
        if ((customerDB[i].getCustomerOrder().length)!=0){

            var orderArray=customerDB[i].getCustomerOrder();
            array.push( orderArray[orderArray.length-1].getOrderId());
        }
    }
    array.sort();
    alert(array[array.length-1]);
}*/





//purchase order start

$("#btnSubmitOrder").click(function () {

    let res=confirm("Place order?");
    if (res) {


        if (genarateResOrderId() == $("#txtOrderID").val()) {


            var orderId = $("#txtOrderID").val();
            var custId = $("#orderCustomerID").val();
            var date = $("#txtDate").val();
            var cost = $("#subtotal").val();
            var discount = $("#txtDiscount").val();

            var order = new Order(orderId, custId, date, discount, cost);


            var orderDetailsArray = order.getOrderDetails();
            for (var i in cartItems) {
                orderDetailsArray.push(new OrderDetails(cartItems[i].getItemCode(), cartItems[i].getItemName(), cartItems[i].getItemQty(), cartItems[i].getItemPrice()));
            }

            orders.push(order);

            alert("order Placed Complete");
            clearAll();

            //loading next orderId when purchase is complete
            genarateOrderId();

            updateDate();

        } else {
            alert("Order Fail OrderId Incorrect");
            let res=confirm("Automatically reset order ID?");
            if (res){
                genarateOrderId();
            }
        }

    }else {
        alert("order cancelld");
    }
});




//customer search start
$("#btnOrderCusSearch").click(function () {
         let id = $("#orderCustomerID").val();

         var customerExist=0
         for (var i in customerDB){
             if (id==customerDB[i].getId()){
                 $("#orderCustomerName").val(customerDB[i].getName());
                 $("#orderCustomerTp").val(customerDB[i].getTp());
                 $("#orderCustomerAddress").val(customerDB[i].getAddress());
                 customerExist=1;
                 break;
             }
         }
         if (customerExist==0){
             alert("No Such as Customer ..!");
         }


});
//customer search End



//generate orderId automatically
function genarateOrderId() {
    if (orders.length!=0) {

        let lastrecord = orders[orders.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let genarateId="O00-" + "00" + splitElement;
            $("#txtOrderID").val(genarateId);

        } else if (splitElement > 99) {
            let genarateId="O00-" + splitElement
            $("#txtOrderID").val(genarateId);



        } else {
            let genarateId="O00-001"
            $("#txtOrderID").val(genarateId);

        }
    }else{
        let genarateId="O00-001"
        $("#txtOrderID").val(genarateId);

    }
}


//when automatically orderId prints,that we can delete but after using this code automatically reset that deleted ID
$("#txtOrderID").on('keyup',function () {
    if ($("#txtOrderID").val()==''){
        genarateOrderId();
    }
});














function genarateResOrderId() {
    if (orders.length!=0) {

        let lastrecord = orders[orders.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let genarateId="O00-" + "00" + splitElement;

            return genarateId;
        } else if (splitElement > 99) {
            let genarateId="O00-" + splitElement;

            return genarateId;

        } else {

            let genarateId="O00-001";
            return genarateId;
        }
    }else{
        let genarateId="O00-001";
        return genarateId;

    }
}




function clearAll(){
    $("#txtOrderID").val('');
    $("#txtDate").val('');
    $("#orderCustomerID").val('');
    $("#orderCustomerID").css('border', '');

    $("#orderCustomerName").val('');
    $("#orderCustomerName").css('border', '');
    $("#orderCustomerTp").val('');
    $("#orderCustomerTp").css('border', '');
    $("#orderCustomerAddress").val('');
    $("#orderCustomerAddress").css('border', '');

    $("#txtSelectItemCode").val('');
    $("#txtSelectItemDescription").val('');
    $("#txtSelectItemPrice").val('');
    $("#txtSelectQTYOnHand").val('');
    $("#txtQty").val('');

    $("#total").text("00.00");
    $("#subtotal").text("00.00");

    $("#txtCash").val('');
    $("#txtDiscount").val('');
    $("#txtBalance").val('');

    $("#orderTable").empty();


}



//get order
$("#txtOrderID").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderID").val())!=''){

            for (var order of orders){

                if (order.getOrderId()==($("#txtOrderID").val())){

                    $("#txtOrderID").val(order.getOrderId());
                    $("#txtDate").val(order.getOrderDate());
                    $("#orderCustomerID").val(order.getCusId());

                    for(var i of customerDB){
                        if (i.getId()==order.getCusId()){

                            $("#orderCustomerName").val(i.getName());
                            $("#orderCustomerTp").val(i.getTp());
                            $("#orderCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    $("#orderTable").empty();
                    for (var obj of (order.getOrderDetails())){
                        let row = `<tr><td>${obj.getItemCode()}</td><td>${obj.getItemName()}</td><td>${obj.getItemQty()}</td><td>${obj.getItemUnitPrice()}</td><td>${obj.getItemUnitPrice()*obj.getItemQty()}</td></tr>`;
                        $("#orderTable").append(row);
                    }

                    break;
                }

            }

        }

    }

});