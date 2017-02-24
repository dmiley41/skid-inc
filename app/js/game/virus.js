SkidInc.Virus = {
    owned: [],
    amount: [],
    time: 0,
    maxTime: null,
    working: false,
    workingOn: null,
    
    list: function() {
        var str = '';
        
        $.each(SkidInc.Virus.virus, function(i, virus) {
            str += '<b>' + i + '</b>: ' + virus.desc + ' <b>+' + fix(virus.amount, 0) + ' botnet power</b>, execution time of <b>' + fix(virus.time, 0) + '</b> sec. ';
            
            (SkidInc.Virus.owned[virus.index]) ? str += 'You own this virus. ' : str += 'You don\'t own this virus. It cost <b>$' + fix(virus.cost, 0) + '</b>. ';
            
            str += '<br>';
        });
        
        return SkidInc.print(str);
    },
    
    exec: function(a) {
        if (typeof SkidInc.Virus.virus[a[0]] !== 'object')
            return SkidInc.print('<b>' + a[0] + '</b> is not a known virus. Get a list of available virus with <b>virus -l</b>.');
        
        var thisVirus = SkidInc.Virus.virus[a[0]];
        
        if (!SkidInc.Virus.owned[thisVirus.index])
            return SkidInc.print('You don\'t own <b>' + thisVirus.name + '</b> virus.');

        if (!SkidInc.Virus.working && a.indexOf('-c') == 1)
            return SkidInc.print('You must be creating a virus to cancel it (that seems logic).');
        
        if (SkidInc.Virus.working && a.indexOf('-c') == 1) {
            var virus = SkidInc.Virus.virus[SkidInc.Virus.workingOn];

            SkidInc.Virus.time = 0;
            SkidInc.Virus.maxTime = null;
            SkidInc.Virus.working = false;
            SkidInc.Virus.workingOn = null;

            $('#navbar-virusinfos').html('');
            
            return SkidInc.print('<b>' + virus.name + '</b> virus creation have been stopped.');
        };
        
        if (SkidInc.Virus.working)
            return SkidInc.print('You can\'t create multiple virus at once, wait for <b>' + SkidInc.Virus.workingOn + '</b> virus to finish or cancel it with <b>virus ' + SkidInc.Virus.workingOn + '-c</b>.');
        
        if (SkidInc.Virus.owned[thisVirus.index] && !SkidInc.Virus.working) {
            SkidInc.Virus.working = true;
            SkidInc.Virus.workingOn = thisVirus.name;
            SkidInc.Virus.maxTime = (thisVirus.time / SkidInc.Player.getTimeMult());
            SkidInc.Virus.time = 0;
            
            $('#navbar-virusinfos').html('<b>' + thisVirus.name + '</b>: ' + fix(SkidInc.Virus.maxTime, 0) + ' sec.');
            
            return SkidInc.print('Virus <b>' + thisVirus.name + '</b> creation have started. You can cancel it with <b>virus ' + thisVirus.name + ' -c</b>.');
        };
    },
    
    loop: function(times) {
        if (SkidInc.Virus.working) {
            var virus = SkidInc.Virus.virus[SkidInc.Virus.workingOn];
            
            SkidInc.Virus.time += (times / SkidInc._INTERVAL);
            
            $('#navbar-virusinfos').html('<b>' + virus.name + '</b>: ' + fix(SkidInc.Virus.maxTime - SkidInc.Virus.time, 2) + ' sec.');
            
            if (SkidInc.Virus.time >= SkidInc.Virus.maxTime) {
                var botnet = virus.amount,
                    botnetPower = SkidInc.Player.getBotnetPowerAmount(botnet);
                
                SkidInc.Player.earn('botnet', botnet);
                
                SkidInc.Virus.time = 0;
                SkidInc.Virus.maxTime = null;
                SkidInc.Virus.working = false;
                SkidInc.Virus.workingOn = null;
                
                $('#navbar-virusinfos').html('');
                
                return SkidInc.print('<b>' + virus.name + '</b> virus creation finished, you earned <b>' + fix(botnetPower, 0) + ' BP</b>.');
            };
        };
    },
    
    init: function(callback) {
        $.getJSON('app/virus.json', function(data, err) {
            SkidInc.Virus.virus = data;
            
            $.each(SkidInc.Virus.virus, function(i, virus) {
                SkidInc.Virus.owned.push(false);
                SkidInc.Virus.amount.push(0);
            });
            
            console.info('SkidInc.Virus fetched.', SkidInc.Virus.virus);
            return callback();
        });
    }
};