function OrderDTO(oId,cusName,total,date) {
    var __oID=oId;
    var __cusName=cusName;
    var __total=total;
    var __orderDate=date;

    this.getOrderID=function () {
        return __oID;
    }
    this.setOrderID=function (oID) {
        __oID=oID;
    }
    this.getCusName=function () {
        return __cusName;
    }
    this.setCusName=function (cusID) {
        __cusName=cusID;
    }
    this.getOrderTotal=function () {
        return __total;
    }
    this.setOrderTotal=function (total) {
        __total=total;
    }
    this.getOrderDate=function () {
        return __orderDate;
    }
    this.setOrderDate=function (date) {
        __orderDate=date;
    }
}