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
            console.info('Successfully connected to server.');
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
        
        SkidInc.Socket.socket.on('cloud_save_success', function() {
            $('#navbar-cloudsuccess').fadeIn('slow', function() {
                $('#navbar-cloudsuccess').fadeOut('slow');
            });
            
            console.info('Cloud save success.');
        });
        
        SkidInc.Socket.socket.on('btn_test_click_receive', function() {
            console.log('This is a test sent by one of the developers. If you see that, he is working on the code of the game');
        });
    }
};