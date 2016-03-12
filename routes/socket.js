module.exports = function(socket){

    socket.on('join:page', function(userName){
      var userName = userName.userName;
      console.log(userName, 'connected')
      socket.join(userName);
    });

    socket.on('disconnect', function(userName){
      socket.leave(userName);
    });

    socket.on('send:notification', function(notification){
      console.log('Sending notification to', notification.notification.userNameReceiver);
      socket.in(notification.notification.userNameReceiver).emit('notification', notification.notification);
    });
}
