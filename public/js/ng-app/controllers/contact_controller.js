angular
  .module("app")
  .controller("ContactController", ContactController);

ContactController.$inject = ['$http'];

function ContactController($http) {
  var vm = this; 
  vm.isEditing = false;
  
  vm.setContactList = function() {
    $http.get("/contact")
      .success(function(data) {
        vm.contactList = data;
        vm.contact = {};
      });
  };

  vm.setContactList();
  
  vm.addContact = function(contact) {
    $http.post("/contact", contact )
      .success(function(data) {
        vm.setContactList(); 
      });
  };

  vm.viewContact = function(contactID) {
    $http.get("/contact/" + contactID)
      .success(function(data) {
        vm.contact = data;
        vm.isEditing = true;
      });
  };

  vm.updateContact = function(contact) {
    $http.put("/contact/" + contact._id, contact)
      .success(function(data) {
        vm.contact = {};
        vm.isEditing = false;
        vm.setContactList();
      });
  };

  vm.deleteContact = function(contactID) {
    $http.delete("/contact/" + contactID)
      .success(function(data) {
        vm.setContactList();
      });
  };
}
