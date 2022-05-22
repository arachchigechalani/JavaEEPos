function OrderDetails(code,name,qty,unitPrice){
    var itemCode=code;
    var itemName=name;
    var itemQty=qty;
    var itemUnitPrice=unitPrice;


    this.setItemCode=function (code) {
        itemCode=code;
    }
    this.getItem=function (){
        return itemCode;
    }
    
    this.setItemName=function (name) {
        itemName=name;
    }

    this.getItemName=function () {
        return itemName;
    }

    this.setItemQty=function (qty) {
        itemQty=qty;
    }

    this.getItemQty=function () {
        return itemQty;
    }

    this.setItemUnitPrice=function (unitPrice) {
        itemUnitPrice=unitPrice;
    }

    this.getItemUnitPrice=function () {
        return itemUnitPrice;
    }


    
}