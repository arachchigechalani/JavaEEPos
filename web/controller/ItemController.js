loadAllItem();

function itemAddOrUpdate() {
    //getting input values of textFields
    var code = $("#itemCode").val();
    var name = $("#itemName").val();
    var price = $("#itemPrice").val();
    var qty = $("#itemQty").val();


    var itemExits = 0;
    let itemOb = new Item(code, name, price, qty);
    for (var i in itemDB) {
        if (code == itemDB[i].getCode()) {
            alert("Item AllReadyExits..")
            itemExits = 1;
            break;
        }
    }
    if (itemExits == 0) {
        itemDB.push(itemOb);
        loadAllItem();
        alert("Item Added SuccessFull..")
    }

    showUpdateModal();

}

$("#btnItemSave").click(function () {
    itemAddOrUpdate();
});


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


function loadAllItem() {
    $("#itemTable").empty();
    itemDB.forEach(function (i) {
        //create a html row
        let row = `<tr><td>${i.getCode()}</td><td>${i.getName()}</td><td>${i.getPrice()}</td><td>${i.getQty()}</td></tr>`;
        $("#itemTable").append(row);
    })
}

/*Search Item*/
var itemExist = 0;
$("#itemBtnSearch").click(function () {

    var txtsearch = $("#txtSearchItemCode").val();
    for (var i in itemDB) {
        if (txtsearch == itemDB[i].getCode()) {
            $("#itemTable").empty();
            let row = `<tr><td>${itemDB[i].getCode()}</td><td>${itemDB[i].getName()}</td><td>${itemDB[i].getPrice()}</td><td>${itemDB[i].getQty()}</td></tr>`;
            $("#itemTable").append(row);
            itemExist = 1;
            break;

        } else {
            customerExist = 0;
        }
    }

    if (itemExist == 0) {
        alert("Item not found ");
    }

    showUpdateModal();

});


/*Update Item*/
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


/*customer delete*/


$("#btnItemDelete").click(function () {

    var itemCode = $("#txtSearchItemCode").val();

    for (var i in itemDB) {
        if (itemCode == itemDB[i].getCode()) {
            itemDB.splice(i, 1);
            loadAllItem();
            alert("Item Delete Complete");
            break;
        }
    }

});
