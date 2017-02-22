SkidInc.Socket = {
    connect: true,
    dev: false,
    
    init: function() {
        if (!SkidInc.Socket.connect)
            return;
        
        if (SkidInc.Socket.dev) {
            SkidInc.Socket.socket = io('http://skid-inc-server-totominc.c9users.io/', {
                reconnect: false
            });
        }
        else {
            SkidInc.Socket.socket = io('http://skid-inc-server.herokuapp.com/', {
                reconnect: false
            });
        };

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
            $('#navbar-events').html('<i class="fa fa-cloud-upload"></i> Cloud save done.');
            $('#navbar-events').fadeIn('slow', function() {
                $('#navbar-events').fadeOut('slow');
            });
            
            console.info('Cloud save success.');
        });
        
        SkidInc.Socket.socket.on('cloud_load_success', function(save) {
            $('#navbar-events').html('<i class="fa fa-cloud-download"></i> Cloud save loaded.');
            $('#navbar-events').fadeIn('slow', function() {
                $('#navbar-events').fadeOut('slow');
            });
            
            SkidInc.Save.loadSavefile(save);
            
            console.info('Cloud load success.');
        });
    }
};