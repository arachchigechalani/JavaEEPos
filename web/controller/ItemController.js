loadAllItem();

function itemAddOrUpdate() {
    var code=$("#itemCode").val();
    var name=$("#itemName").val();
    var price=$("#itemPrice").val();
    var quantity=$("#itemQty").val();

    var item={
        code:code,
        name:name,
        price:price,
        quantity:quantity
    }


    $.ajax({
        url: "item",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(item),

        success : function (res){
            if (res.status==200){
                alert(res.message);

            }else if (res.status==400){
                alert(res.message)

            }else {
                alert(res.data);

            }
        }

    });
}

$("#itemSave").click(function () {
    alert("ok");
    itemAddOrUpdate();
});



/*Search Item*/

$("#itemBtnSearch").click(function () {
    $.ajax({
        url: "item?option=GETONE&id="+$("#txtSearchItemCode").val(),
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#itemCode").val(res.data.code);
                $("#itemName").val(res.data.name);
                $("#itemPrice").val(res.data.price);
                $("#itemQty").val(res.data.quantity);

            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }


    })
    /*showUpdateModal();*/
});


function loadAllItem() {

    $.ajax({
        url: "item?option=GETALL",
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#itemCode").val(res.data.code);
                $("#itemName").val(res.data.name);
                $("#itemPrice").val(res.data.price);
                $("#itemQty").val(res.data.quantity);

                $("#itemTable").empty();
                for (const item of res.data){
                    let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;
                    $("#itemTable").append(row);
                }


            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }
    })
}



/*
function showUpdateModal() {
    $("#itemTable>tr").on('dblclick', function (e) {

        $("#updateItem #itemUpdateCode").val($(this).children(':eq(0)').text());
        $("#updateItem #itemUpdateCode").prop("disabled", true);
        $("#updateItem #itemUpdateName").val($(this).children(':eq(1)').text());
        $("#updateItem #itemUpdatePrice").val($(this).children(':eq(2)').text());
        $("#updateItem #itemUpdateQty").val($(this).children(':eq(3)').text());

        $("#updateItem").modal('show');

    });
}
*/










/*Update Item*/
/*
$("#btnUpdateItem").click(function () {
    for (var i in itemDB) {
        if ($("#itemUpdateCode").val() == itemDB[i].getCode()) {

            var name = $("#itemUpdateName").val();
            var price = $("#itemUpdatePrice").val();
            var qty = $("#itemUpdateQty").val();


            itemDB[i].setName(name);
            itemDB[i].setPrice(price);
            itemDB[i].setQty(qty);

            loadAllItem();
            alert("Item Update complete");
            showUpdateModal();
            break;
        }
    }

});

*/

/*customer delete*/
$("#btnItemDelete").click(function () {
    $.ajax({
        url :"item?id="+$("#txtSearchItemCode").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
            }else if(res.status == 400){
                alert(res.message);
            }

        },

        error : function (){
            alert("System error");
        }
    });
});
