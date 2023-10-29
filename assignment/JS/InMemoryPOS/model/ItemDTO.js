function ItemDTO(itemId, itemName, unitPrice, itemQTY) {
    var __itemId = itemId;
    var __itemName = itemName;
    var __itemQTY = itemQTY;
    var __unitPrice = unitPrice;

    this.getItemId = function () {
        return __itemId;
    }
    this.setItemId = function (setId) {
        __itemId = setId;
    }
    this.getItemName = function () {
        return __itemName;
    }
    this.setItemName = function (setName) {
        __itemName = setName;
    }
    this.getUnitPrice = function () {
        return __unitPrice;
    }
    this.setUnitPrice = function (setPrice) {
        __unitPrice = setPrice;
    }
    this.getItemQty = function () {
        return __itemQTY;
    }
    this.setItemQTY = function (setQTY) {
        __itemQTY = setQTY;
    }

}