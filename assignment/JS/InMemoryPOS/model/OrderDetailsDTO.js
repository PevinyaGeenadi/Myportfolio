function OrderDetailsDTO(oId,iCode,price,qty,total) {
    var __OID=oId;
    var __oItemCode=iCode;
    var __iPrice=price;
    var __oQty=qty;
    var __oTotal=total;

    this.getOID=function () {
        return __OID;
    }
    this.setOID=function (oid) {
        __OID=oid;
    }
    this.getoItemCode=function () {
        return __oItemCode;
    }
    this.setoItemCode=function (code) {
        __oItemCode=code;
    }
    this.getiPrice=function () {
        return __iPrice;
    }
    this.setiPrice=function (price) {
        __iPrice=price;
    }
    this.getoQty=function () {
        return __oQty;
    }
    this.setoQty=function (qty) {
        __oQty=qty;
    }
    this.getoTotal=function () {
        return __oTotal;
    }
    this.setoTotal=function (total) {
        __oTotal=total;
    }
}