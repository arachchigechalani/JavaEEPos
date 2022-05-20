function Customer(id, name, address, tp) {
    var cusId = id;
    var cusName = name;
    var cusAddress = address;
    var cusTp = tp;

    this.setId = function (id) {
        cusId = id;
    }

    this.getId = function () {
        return cusId;
    }

    this.setName = function (name) {
        cusName = name;
    }

    this.getName = function () {
        return cusName;
    }

    this.setAddress = function (address) {
        cusAddress = address;
    }

    this.getAddress = function () {
        return cusAddress;
    }

    this.setTp = function (tp) {
        cusTp = tp;
    }

    this.getTp = function () {
        return cusTp;
    }

}


