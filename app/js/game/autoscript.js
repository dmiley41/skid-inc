SkidInc.Autoscript = {
    owned: [],
    time: [],
    
    loop: function(times) {
        $.each(SkidInc.Script.scripts, function(i, script) {
            if (SkidInc.Autoscript.owned[script.index] && SkidInc.Script.owned[script.index]) {
                SkidInc.Autoscript.time[script.index] += (times / SkidInc._INTERVAL);
                
                if (SkidInc.Autoscript.time[script.index] >= (script.time / SkidInc.Player.getTimeMult())) {
                    var money = SkidInc.Player.getMoneyMult() * script.money,
                        exp = SkidInc.Player.getExpMult() * script.exp;
                    
                    SkidInc.Player.earn('money', money);
                    SkidInc.Player.earn('exp', exp);
                    
                    SkidInc.Autoscript.time[script.index] = 0;
                };
            };
        });
    },
    
    init: function(callback) {
        $.getJSON('app/autoscripts.json', function(data) {
            SkidInc.Autoscript.autoscripts = data;
            
            $.each(SkidInc.Autoscript.autoscripts, function(i, server) {
                SkidInc.Autoscript.owned.push(false);
                SkidInc.Autoscript.time.push(0);
            });
            
            console.info('SkidInc.Autoscript autoscripts fecthed.', SkidInc.Autoscript.autoscripts);
            return callback();
        });
    }
};