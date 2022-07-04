loadAllItem();

function itemAddOrUpdate() {

    var code=$("#txtItemCode").val();
    var name=$("#txtItemName").val();
    var price=$("#txtItemPrice").val();
    var qty=$("#txtItemQty").val();

    var item={
        code:code,
        name:name,
        price:price,
        qty:qty
    }


    $.ajax({
        url: "item",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(item),

        success : function (res){
            if (res.status==200){
                alert(res.message);
                loadAllItem();

            }else if (res.status==400){
                alert(res.message)

            }else {
                alert(res.data);

            }
        }

    });
}

$("#btnItemSave").click(function () {
    itemAddOrUpdate();
    loadAllItem();
});


function loadAllItem() {

    //$("#itemTable").empty();

    $.ajax({
        url: "item?option=GETALL",
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#itemTable").empty();
                for (const item of res.data){
                    let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
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


/*Search Item*/

$("#itemBtnSearch").click(function () {

    $.ajax({
        url: "item?option=GETONE&id="+$("#txtSearchItemCode").val(),
        method: "GET",

        success : function (res){
            if (res.status==200){

                /*$("#itemCode").val(res.data.code);
                $("#itemName").val(res.data.name);
                $("#itemPrice").val(res.data.price);
                $("#itemQty").val(res.data.qty);
*/
                $("#itemTable").empty();

                let row = `<tr><td>${res.data.code}</td><td>${res.data.name}</td><td>${res.data.price}</td><td>${res.data.qty}</td></tr>`;
                $("#itemTable").append(row);

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



/*customer delete*/
$("#btnItemDelete").click(function () {

    $.ajax({
        url :"item?id="+$("#txtSearchItemCode").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
                $("#itemTable").empty();
                loadAllItem();
            }else if(res.status == 400){
                alert(res.message);
            }

        },

        error : function (){
            alert("System error");
        }
    });
});




















/*Update Item*/
/*$("#btnUpdateItem").click(function () {
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

});*/

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


