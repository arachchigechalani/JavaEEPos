function Item(code, name, price, qty) {

    var itemCode = code;
    var itemName = name;
    var itemPrice = price;
    var itemQty = qty;

    this.setCode = function (code) {
        itemCode = code;
    }

    this.getCode = function () {
        return itemCode;
    }

    this.setName = function (name) {
        itemName = name;
    }

    this.getName = function () {
        return itemName;
    }

    this.setPrice = function (price) {
        itemPrice = price;
    }

    this.getPrice = function () {
        return itemPrice;
    }

    this.setQty = function (qty) {
        itemQty = qty;
    }

    this.getQty = function () {
        return itemQty;
    }

}