/* global $ fix M SkidInc */
SkidInc.Player = {
    money: 0,
    exp: 0,
    expReq: 100,
    level: 1,
    
    getMoneyMult: function() {
        return 1;
    },
    
    getExpMult: function() {
        return 1;
    },
    
    getTimeMult: function() {
        return 1;
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
    }
};