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