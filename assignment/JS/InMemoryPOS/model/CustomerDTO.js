function CustomerDTO(id, name, address, salary) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __salary = salary;

    this.getCustomerId = function () {
        return __id;
    }
    this.setCustomerId = function (setId) {
        __id = setId;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.setCustomerName = function (setName) {
        __name = setName;
    }
    this.getAddress = function () {
        return __address;
    }
    this.setCustomerAddress = function (setAddress) {
        __address = setAddress;
    }
    this.getSalary = function () {
        return __salary;
    }
    this.setCustomerSalary = function (setSalary) {
        __salary = setSalary;
    }
}