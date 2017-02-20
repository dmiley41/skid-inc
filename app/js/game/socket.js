SkidInc.Socket = {
    connect: true,
    
    init: function() {
        if (!SkidInc.Socket.connect)
            return;
        
        SkidInc.Socket.socket = io('http://skid-inc-server-totominc.c9users.io/', {
            reconnect: false
        });

        SkidInc.Socket.socket.on('connect', function() {
            SkidInc.Socket.socket.emit('user_log', {});
            console.info('Successfully connected to server.', SkidInc.Socket.socket.id);
        });

        SkidInc.Socket.socket.on('disconnect', function() {
            console.warn('Connection lost.');
        });
        
        SkidInc.Socket.socket.on('connect_error', function() {
            console.warn('Can\'t connect to server.');
        });
        
        SkidInc.Socket.socket.on('receive_message', function(message) {
            SkidInc.print(message);
        });
    }
};