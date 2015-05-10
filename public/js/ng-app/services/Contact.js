angular
  .module("app")
  .factory("Contact", Contact);

Contact.$inject = ['$http'];

function Contact($http) {
  var service = {
    all: all,
    show: show,
    add: add,
    update: update,
    remove: remove
  };

  return service;

  function all() {
    return $http.get("/contact");
  }

  function show(contactID) {
    return $http.get("/contact/" + contactID);
  }

  function add(contact) {
    return $http.post("/contact", contact);
  }

  function update(contact) {
    return $http.put("/contact/" + contact._id, contact);
  }

  function remove(contactID) {
    return $http.delete("/contact/" + contactID);
  }
}
