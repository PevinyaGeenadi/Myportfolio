function CartDTO(cartOID,cartICode,cartIName,cartIPrice,orderQty,cartTotal) {
    var __cartOID=cartOID;
    var __cartICode=cartICode;
    var __cartIName=cartIName;
    var __cartIPrice=cartIPrice;
    var __orderQty=orderQty;
    var __total=cartTotal;

    this.getCartOID=function () {
        return __cartOID;
    }
    this.setCartOID=function (oid) {
        __cartOID=oid;
    }
    this.getcartICode=function () {
        return __cartICode;
    }
    this.setcartICode=function (iCode) {
        __cartICode=iCode;
    }
    this.getcartIName=function () {
        return __cartIName;
    }
    this.setcartIName=function (iName) {
        __cartIName=iName;
    }
    this.getcartIPrice=function () {
        return __cartIPrice;
    }
    this.setcartIPrice=function (iPrice) {
        __cartIPrice=iPrice;
    }
    this.getcartOQty=function () {
        return __orderQty;
    }
    this.setcartOQty=function (qty) {
        __orderQty=qty;
    }
    this.getTotal=function () {
        return __total;
    }
    this.setTotal=function (total) {
        __total=total;
    }
}