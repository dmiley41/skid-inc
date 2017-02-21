SkidInc.Save = {
    toSave: [
        'SkidInc.Autoscript.owned',
        'SkidInc._VERSION',
        'SkidInc._BEFORE',
        'SkidInc.Options.themesLocked',
        'SkidInc.Options.uuid',
        'SkidInc.Player.money',
        'SkidInc.Player.exp',
        'SkidInc.Player.expReq',
        'SkidInc.Player.level',
        'SkidInc.Script.owned',
        'SkidInc.Servers.owned'
    ],
    
    setItem: function(key, value) {
        localStorage.setItem(key, btoa(JSON.stringify(value)));
    },
    
    getItem: function(key) {
        var oldValue = eval(key);
        
        if (localStorage.getItem(key) == null) {
            console.warn(key + ' is unknown in the localStorage.');
            return oldValue;
        };
        
        return JSON.parse(atob(localStorage.getItem(key)));
    },
    
    removeItem: function(key) {
        localStorage.removeItem(key);
    },
    
    removeAll: function() {
        var conf = confirm('Do you really want to hard-reset and start everything form scratch? Game will reload if you say yes.');
        
        if (conf) {
            for (var i in localStorage)
                SkidInc.Save.removeItem(i);
            
            clearInterval(SkidInc._INTERVALS.save);
            location.reload();
        };
    },
    
    saveData: function() {
        if (SkidInc._INIT) {
            localStorage.setItem('save-exist', true);
            
            for (var i = 0; i < SkidInc.Save.toSave.length; i++)
                SkidInc.Save.setItem(SkidInc.Save.toSave[i], eval(SkidInc.Save.toSave[i]));
        };
    },

    loadData: function(callback) {
        if (localStorage.getItem('save-exist') == null)
            return console.warn('No save found!');
        
        SkidInc.Autoscript.owned = SkidInc.Save.getItem('SkidInc.Autoscript.owned');
        SkidInc._OLDVERSION = SkidInc.Save.getItem('SkidInc._VERSION');
        SkidInc._BEFORE = SkidInc.Save.getItem('SkidInc._BEFORE');
        SkidInc.Options.themesLocked = SkidInc.Save.getItem('SkidInc.Options.themesLocked');
        SkidInc.Options.uuid = SkidInc.Save.getItem('SkidInc.Options.uuid');
        SkidInc.Player.money = SkidInc.Save.getItem('SkidInc.Player.money');
        SkidInc.Player.exp = SkidInc.Save.getItem('SkidInc.Player.exp');
        SkidInc.Player.expReq = SkidInc.Save.getItem('SkidInc.Player.expReq');
        SkidInc.Player.level = SkidInc.Save.getItem('SkidInc.Player.level');
        SkidInc.Script.owned = SkidInc.Save.getItem('SkidInc.Script.owned');
        SkidInc.Servers.owned = SkidInc.Save.getItem('SkidInc.Servers.owned');
        
        console.info('Save loaded, old save v' + SkidInc._OLDVERSION);
        
        if (typeof callback == 'function')
            return callback();
    },
    
    getSave: function() {
        var save = [];
        
        for (var i = 0; i < SkidInc.Save.toSave.length; i++)
            save.push(atob(localStorage.getItem(SkidInc.Save.toSave[i])));
        
        save = btoa(save);
        
        return save;
    },
    
    init: function() {
        SkidInc.Save.loadData(function() {
            SkidInc.Save.saveData();
            
            SkidInc._INTERVALS.save = setInterval(function() {
                SkidInc.Save.saveData();
            }, 50);
            
            SkidInc._INTERVALS.emitSave = setInterval(function() {
                SkidInc.Socket.socket.emit('cloud_save', {
                    uuid: SkidInc.Options.uuid,
                    save: SkidInc.Save.getSave()
                });
            }, 300000);
        });
    }
};