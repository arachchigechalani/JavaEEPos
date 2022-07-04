genarateOrderId();
/*
genarateResOrderId();
updateDate();
*/

function updateDate() {
    let now = new Date();
    let today = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    $("#txtDate").val(today);
}


//customer search start
$("#btnOrderCusSearch").click(function () {
    let id = $("#orderCustomerID").val();

    $.ajax({
        url :"customer?option=GETONE&id="+id,
        method : "GET",
        success : function (res){
            if (res.status==200){
                $("#orderCustomerName").val(res.data.name);
                $("#orderCustomerTp").val(res.data.tp);
                $("#orderCustomerAddress").val(res.data.address);



            }else if(res.status==400){
                alert(res.message);
            }
        }
    });
});
//customer search End






//search Item start
$("#txtSelectItemCode").on('keyup', function (e) {
    if (e.key=="Enter") {
        $.ajax({
            url: "item?option=GETONE&id=" + $("#txtSelectItemCode").val(),
            method: "GET",

            success: function (res) {

                if (res.status == 200) {

                    $("#txtSelectItemDescription").val(res.data.name);
                    $("#txtSelectItemPrice").val(res.data.price);
                    $("#txtSelectQTYOnHand").val(res.data.qty);

                } else if (res.status == 400) {

                    $("#txtSelectItemDescription").val("");
                    $("#txtSelectItemPrice").val("");
                    $("#txtSelectQTYOnHand").val("");
                    alert("Item not found");
                }
            },
            error: function (res) {
                alert("System Error");
            }
        })
    }
});
//search Item End





//add to cart start
$("#btnAddToTable").click(function () {

    var itemCode = $("#txtSelectItemCode").val();
    var itemName = $("#txtSelectItemDescription").val();
    var itemPrice = $("#txtSelectItemPrice").val();
    var qty = parseInt($("#txtQty").val());

    var totalItemPrice = itemPrice * qty;

    var Oqty = parseInt($('#txtSelectQTYOnHand').val());

    if ($('#txtQty').val() != "") {
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
    } else {
        alert("Please Enter Order Qty");
    }
});


function loadCart() {
    var total = 0;

    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total += i.getTotalItemPrice();
        $("#orderTable").append(row);
    });

    $("#total").text('');
    $("#total").text(total);
    $("#subtotal").text('');
    $("#subtotal").text(total);


}


$("#txtCash,#txtDiscount").on('keyup', function (e) {
    keyPress();
});


function keyPress() {
    var total = $("#total").text();
    var cash = $("#txtCash").val();
    var discount = $("#txtDiscount").val();


    if (cash != '') {
        $("#txtBalance").val('');
        $("#txtBalance").val(cash - total);

        if (discount != '') {
            var itemFinallytotal = total - ((discount / 100) * total);
            $("#subtotal").text('');
            $("#subtotal").text(itemFinallytotal);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - $("#subtotal").text());
        } else {
            $("#subtotal").text('');
            $("#subtotal").text(total);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - total);
        }

    } else {
        $("#txtBalance").val('');
    }
}



//purchase order start

$("#btnSubmitOrder").click(function () {

    let res = confirm("Place order?");
    if (res) {

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

        var order={
            orderId : $("#txtOrderID").val(),
            custId  : $("#orderCustomerID").val(),
            date    : $("#txtDate").val()
        }

        $.ajax({

            url: "order",
            method : "POST",
            contentType : "application/json",
            data : JSON.stringify(order),

            success : function (res){
                if (res.status==200){
                    alert(res.message);
                    clearAll();


                }else if (res.status==400){
                    alert(res.message);
                }
            },

            error : function (res){


            }

        });

        //loading next orderId when purchase is complete
        genarateOrderId();

        updateDate();

    } else {
        alert("order cancelld");
    }
});




//generate orderId automatically
function genarateOrderId() {
    $.ajax({
        url : "order?option=GenarateNewId",
        method : "GET",

        success : function (res){
            $("#txtOrderID").val(res.data);
        },

        error : function (){

        }

    });
}


//when automatically orderId prints,that we can delete but after using this code automatically reset that deleted ID
$("#txtOrderID").on('keyup', function () {
    if ($("#txtOrderID").val() == '') {
        genarateOrderId();
    }
});


function genarateResOrderId() {
    if (orders.length != 0) {

        let lastrecord = orders[orders.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let genarateId = "O00-" + "00" + splitElement;

            return genarateId;
        } else if (splitElement > 99) {
            let genarateId = "O00-" + splitElement;

            return genarateId;

        } else {

            let genarateId = "O00-001";
            return genarateId;
        }
    } else {
        let genarateId = "O00-001";
        return genarateId;

    }
}


function clearAll() {
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
$("#txtOrderID").on('keydown', function (event) {

    if (event.key == "Enter") {

        if (($("#txtOrderID").val()) != '') {

            for (var order of orders) {

                if (order.getOrderId() == ($("#txtOrderID").val())) {

                    $("#txtOrderID").val(order.getOrderId());
                    $("#txtDate").val(order.getOrderDate());
                    $("#orderCustomerID").val(order.getCusId());

                    for (var i of customerDB) {
                        if (i.getId() == order.getCusId()) {

                            $("#orderCustomerName").val(i.getName());
                            $("#orderCustomerTp").val(i.getTp());
                            $("#orderCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    $("#orderTable").empty();
                    for (var obj of (order.getOrderDetails())) {
                        let row = `<tr><td>${obj.getItemCode()}</td><td>${obj.getItemName()}</td><td>${obj.getItemQty()}</td><td>${obj.getItemUnitPrice()}</td><td>${obj.getItemUnitPrice() * obj.getItemQty()}</td></tr>`;
                        $("#orderTable").append(row);
                    }

                    break;
                }
            }
        }
    }
});