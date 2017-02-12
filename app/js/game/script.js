SkidInc.Script = {
    owned: [],
    time: 0,
    maxTime: null,
    working: false,
    workingOn: null,
    
    list: function() {
        var str = '';
        
        $.each(SkidInc.Script.scripts, function(i, script) {
            str += '<b>' + i + '</b>: ' + script.desc + ' <b>+$' + fix(SkidInc.Player.getMoneyMult() * script.money, 0) + '</b> and <b>' + fix(SkidInc.Player.getExpMult() * script.exp, 0) + ' exp</b>, execution time of <b>' + fix(script.time, 0) + ' sec</b>. ';
            
            (SkidInc.Script.owned[script.index]) ? str += 'You own this script. ' : str += 'You don\'t own this script. It cost <b>$' + fix(script.cost, 0) + '</b>. ';
            
            str += '<br>';
        });
        
        return SkidInc.print(str);
    },
    
    exec: function(a) {
        if (typeof SkidInc.Script.scripts[a[0]] !== 'object')
            return SkidInc.print('<b>' + a[0] + '</b> is not a known script. Get a list of available scripts with <b>script -l</b>.');
        
        var thisScript = SkidInc.Script.scripts[a[0]];
        
        if (!SkidInc.Script.owned[thisScript.index])
            return SkidInc.print('You don\'t own <b>' + thisScript.name + '</b> script.');
        
        if (SkidInc.Autoscript.owned[thisScript.index] && a.indexOf('-c') == 1)
            return SkidInc.print('You already have an autoscript for <b>' +  thisScript.name+ '</b>, you can\'t stop the autoscript, it will always execute the script.');
            
        if (!SkidInc.Script.working && a.indexOf('-c') == 1)
            return SkidInc.print('You must execute a script to cancel it (that seems logic).');
        
        if (SkidInc.Script.working && a.indexOf('-c') == 1) {
            var script = SkidInc.Script.scripts[SkidInc.Script.workingOn];

            SkidInc.Script.time = 0;
            SkidInc.Script.maxTime = null;
            SkidInc.Script.working = false;
            SkidInc.Script.workingOn = null;

            $('#navbar-scriptinfos').html('');
            
            return SkidInc.print('<b>' + script.name + '</b> script have been stopped.');
        };
        
        if (SkidInc.Script.working)
            return SkidInc.print('You can\'t manually execute multiple scripts at once, wait for <b>' + SkidInc.Script.workingOn + '</b> script to finish or cancel it with <b>script ' + SkidInc.Script.workingOn + '-c</b>.');
        
        if (SkidInc.Autoscript.owned[thisScript.index])
            return SkidInc.print('You already have an autoscript for <b>' + thisScript.name + '</b> script, you can\'t manually execute it.');
        
        if (SkidInc.Script.owned[thisScript.index] && !SkidInc.Script.working) {
            SkidInc.Script.working = true;
            SkidInc.Script.workingOn = thisScript.name;
            SkidInc.Script.maxTime = (thisScript.time / SkidInc.Player.getTimeMult());
            SkidInc.Script.time = 0;
            
            $('#navbar-scriptinfos').html('<b>' + thisScript.name + '</b>: ' + fix(SkidInc.Script.maxTime, 0) + ' sec.');
            
            return SkidInc.print('Script <b>' + thisScript.name + '</b> have started. You can cancel it with <b>script ' + thisScript.name + ' -c</b>.');
        };
    },
    
    loop: function(times) {
        if (SkidInc.Script.working) {
            var script = SkidInc.Script.scripts[SkidInc.Script.workingOn];
            
            SkidInc.Script.time += (times / SkidInc._INTERVAL);
            
            $('#navbar-scriptinfos').html('<b>' + script.name + '</b>: ' + fix(SkidInc.Script.maxTime - SkidInc.Script.time, 2) + ' sec.');
            
            if (SkidInc.Script.time >= SkidInc.Script.maxTime) {
                var money = SkidInc.Player.getMoneyMult() * script.money,
                    exp = SkidInc.Player.getExpMult() * script.exp;
                
                SkidInc.Player.earn('money', money);
                SkidInc.Player.earn('exp', exp);
                
                SkidInc.Script.time = 0;
                SkidInc.Script.maxTime = null;
                SkidInc.Script.working = false;
                SkidInc.Script.workingOn = null;
                
                $('#navbar-scriptinfos').html('');
                
                return SkidInc.print('<b>' + script.name + '</b> script finished, you earned <b>$' + fix(money, 0)  + '</b> and <b>' + fix(exp, 0) + ' exp</b>.');
            };
        };
    },
    
    init: function(callback) {
        $.getJSON('app/scripts.json', function(data, err) {
            SkidInc.Script.scripts = data;
            
            $.each(SkidInc.Script.scripts, function(i, script) {
                SkidInc.Script.owned.push(false);
            });
            
            SkidInc.Script.owned[0] = true;
            
            console.info('SkidInc.Script scripts fetched.', SkidInc.Script.scripts);
            return callback();
        });
    }
};