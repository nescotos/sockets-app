app.factory('Notification', function($http){
  var notificationFactory = {};

  notificationFactory.send = function(notification){
    return $http.post('/api/notifications', notification);
  }

  return notificationFactory;
})
