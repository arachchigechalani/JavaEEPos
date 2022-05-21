//loadAllCustomer();

function customerAddOrUpdate() {
    var id = $("#txtCusID").val();
    var    name = $("#txtCusName").val();
     var   address = $("#txtCusAddress").val();
     var   tp = $("#txtCusTP").val();

    var cus={
        id :id,
        name : name,
        address : address,
        tp : tp
    }

    $.ajax({
        url: "customer",
        method: "POST",
        contentType :"application/json",
        data : JSON.stringify(cus),

        success : function (res){
            if (res.status==200){
                alert(res.message);
            }else if (res.status==400){
                alert(res.data);
            }else {
                alert(res.data);
            }
        }
    });


    /*var id = $("#txtCusID").val();
    var name = $("#txtCusName").val();
    var address = $("#txtCusAddress").val();
    var tp = $("#txtCusTP").val();*/

    /*var customerExist = 0;
    for (var i in customerDB) {
        if (id == customerDB[i].getId()) {
            alert("Customer Allready Exist !");
            customerExist = 1;
        }
    }
    if (customerExist == 0) {
        customerDB.push(new Customer(id, name, address, tp));
        loadAllCustomer();
        alert("Customer Added SuccessFull..")
    }

    showUpdateModal();*/

}

$("#btnSave").click(function () {
    customerAddOrUpdate();


});


/*function showUpdateModal() {
    $("#customerTable>tr").on('dblclick', function (e) {

        $("#updateCustomer #updateCusID").val($(this).children(':eq(0)').text());
        $("#updateCustomer #updateCusID").prop("disabled", true);
        $("#updateCustomer #updateCusName").val($(this).children(':eq(1)').text());
        $("#updateCustomer #updateCusAddress").val($(this).children(':eq(2)').text());
        $("#updateCustomer #updateCusTP").val($(this).children(':eq(3)').text());

        $("#updateCustomer").modal('show');

    });
}*/

function loadAllCustomer() {
    /*$("#customerTable").empty();
    customerDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getAddress()}</td><td>${i.getTp()}</td></tr>`;
        $("#customerTable").append(row);
    });*/
}

/*search customer*/
//var customerExist = 0;
/*$("#customerSearchBtn").click(function () {

    var txtsearch = $("#txtSearchCusID").val();
    for (var i of customerDB) {
        if (i.getId() == txtsearch) {
            $("#customerTable").empty();
            let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getAddress()}</td><td>${i.getTp()}</td></tr>`;
            $("#customerTable").append(row);
            customerExist = 1;
            break;

        } else {
            customerExist = 0;
        }
    }

    if (customerExist == 0) {
        alert("Customer not found ");
    }

    showUpdateModal();

});*/


/*Update Customer*/
/*$("#btnUpdate").click(function () {
    for (var i in customerDB) {
        if ($("#updateCusID").val() == customerDB[i].getId()) {

            var name = $("#updateCusName").val();
            var address = $("#updateCusAddress").val();
            var tp = $("#updateCusTP").val();


            customerDB[i].setName(name);
            customerDB[i].setAddress(address);
            customerDB[i].setTp(tp);

            loadAllCustomer();
            alert("Customer Update complete");
            showUpdateModal();
            break;
        }
    }

});*/



/*customer delete*/

/*
$("#btnCustomerDelete").click(function () {

    var custId = $("#txtSearchCusID").val();

    for (var i in customerDB) {
        if (custId == customerDB[i].getId()) {
            customerDB.splice(i, 1);
            loadAllCustomer();
            alert("Customer Delete Complete");
            break;
        }
    }

});
*/


//customer validation
/*
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusTpRegEx = /^(078|070|071|075|077|091|011|074|072|076)?[0-9]{7}$/;
*/

/*

$("#btnCustomer").prop('disabled', true);


$("#mainDiv input").on('keyup', function (e) {
    validate(e);
    if (e.key == "Tab") {
        e.preventDefault(); // stop execution of the button
    }

    //console.log(e.key);

})


function validate(e) {
    var id = $("#txtCusID").val();
    var name = $("#txtCusName").val();
    var address = $("#txtCusAddress").val();
    var tp = $("#txtCusTP").val();

    if (cusIDRegEx.test(id)) {
        $("#txtCusID").css('border', '2px solid green');
        $("#lblcusid").text("");

        $("#btnSave").prop('disabled', false);
        if (e.key == "Enter") {
            $("#txtCusName").focus()
        }


        if (cusNameRegEx.test(name)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            $("#btnSave").prop('disabled', false);
            if (e.key == "Enter") {
                $("#txtCusAddress").focus()
            }

            if (cusAddressRegEx.test(address)) {
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                $("#btnSave").prop('disabled', false);
                if (e.key == "Enter") {
                    $("#txtCusTP").focus()
                }

                if (cusTpRegEx.test(tp)) {
                    $("#txtCusTP").css('border', '2px solid green');
                    $("#lblcustp").text("");
                    $("#btnSave").prop('disabled', false);
                    if (e.key == "Enter") {
                        customerAddOrUpdate();
                    }


                } else {
                    $("#txtCusTP").css('border', '2px solid red');
                    $("#lblcustp").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    $("#btnSave").prop('disabled', true);
                }

            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                $("#btnSave").prop('disabled', true);
            }

        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            $("#btnSave").prop('disabled', true);
        }

    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        $("#btnSave").prop('disabled', true);
    }
}

*/








