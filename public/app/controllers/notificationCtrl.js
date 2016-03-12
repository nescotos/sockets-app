app.controller('NotificationController', function(Auth, Notification, Socket){
  var vm = this;



  vm.sendNotification = function(){
    Notification.send(vm.notification).then(function(data){
      console.log(data);
    });
    Auth.getUser()
      .then(function(data) {
        vm.user = data.data.userName;
        vm.notification.userNameSender = vm.user;
        Socket.emit('send:notification', {notification: vm.notification})
      });

  }
});
