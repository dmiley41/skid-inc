SkidInc.Player = {
    money: 0,
    exp: 0,
    expReq: 100,
    level: 1,
    botnet: 0,
    botnetPower: 0,
    
    getMoneyMult: function() {
        return 1;
    },
    
    getExpMult: function() {
        return 1;
    },
    
    getTimeMult: function() {
        return 1;
    },
    
    getBotnetPower: function() {
        return SkidInc.Player.botnet;
    },
    
    getBotnetPowerAmount: function(amount) {
        return amount;
    },
    
    earn: function(type, amount) {
        if (type == 'money')
            SkidInc.Player.money += amount;
        if (type == 'exp') {
            SkidInc.Player.exp += amount;
            
            while (SkidInc.Player.exp >= SkidInc.Player.expReq) {
                SkidInc.Player.level++;
                SkidInc.Player.exp -= SkidInc.Player.expReq;
                SkidInc.Player.expReq = Math.floor(100 * Math.pow(1.5, SkidInc.Player.level));
                SkidInc.print('Level-up, you are now level <b>' + SkidInc.Player.level + '</b>.');
            };
        };
        if (type == 'botnet') {
            SkidInc.Player.botnet += amount;
            SkidInc.Player.botnetPower = SkidInc.Player.getBotnetPower();
        }
    }
};