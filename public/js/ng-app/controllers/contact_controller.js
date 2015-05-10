angular
  .module("app")
  .controller("ContactController", ContactController);

ContactController.$inject = ['$http', 'Contact'];

function ContactController($http, Contact) {
  var vm = this; 
  vm.isEditing = false;
  
  vm.setContactList = function() {
    Contact.all()
      .success(function(data) {
        vm.contactList = data;
        vm.contact = {};
      });
  };

  vm.setContactList();
  
  vm.addContact = function(contact) {
    Contact.add(contact)
      .success(function(data) {
        vm.setContactList(); 
      });
  };

  vm.viewContact = function(contactID) {
    Contact.show(contactID)
      .success(function(data) {
        vm.contact = data;
        vm.isEditing = true;
      });
  };

  vm.updateContact = function(contact) {
    Contact.update(contact)
      .success(function(data) {
        vm.contact = {};
        vm.isEditing = false;
        vm.setContactList();
      });
  };

  vm.deleteContact = function(contactID) {
    Contact.remove(contactID)
      .success(function(data) {
        vm.setContactList();
      });
  };
}
