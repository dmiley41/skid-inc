SkidInc.Buy = {
    categories: ['script', 'server', 'autoscript'],
    categoryDesc: ['get new scripts to earn more.', 'buy or upgrade servers to increase your multipliers.', 'buy autoscripts to automatize scripts execution.'],
    path: ['SkidInc.Script.scripts', 'SkidInc.Servers.servers', 'SkidInc.Autoscript.autoscripts'],
    ownedPath: ['SkidInc.Script.owned', 'SkidInc.Servers.owned', 'SkidInc.Autoscript.owned'],
    
    list: function() {
        var str = '';
        
        for (var i = 0; i < SkidInc.Buy.categories.length; i++) {
            str += 'Category <b>' + SkidInc.Buy.categories[i] + '</b>: ' + SkidInc.Buy.categoryDesc[i] + '<br>';
            
            var indexObj = eval(SkidInc.Buy.path[i]),
                ownedObj = eval(SkidInc.Buy.ownedPath[i]);
            
            $.each(indexObj, function(e, item) {
                var owned = ownedObj[item.index];
                
                str += '<b>' + item.name + '</b>: ';
                
                if (item.descInList)
                    str += item.desc;
                
                if (item.oneTime) {
                    (owned) ? str += ' you already own this item.<br>' : str += ' you don\'t own this item, cost <b>$' + fix(item.cost, 0) + '</b>.<br>';
                };
                
                if (!item.oneTime) {
                    var price = item.cost;
                    str += ' you own <b>' + owned + '</b> ' + item.name + ',';
                    
                    if (item.costType == 'formula')
                        price = eval(item.costFormula);
                    
                    str += ' next one cost <b>$' + fix(price, 0) + '</b>.<br>';
                };
            });
        };
        
        return SkidInc.print(str);
    },
    
    exec: function(a) {
        var categories = SkidInc.Buy.categories,
            path = SkidInc.Buy.path,
            ownedPath = SkidInc.Buy.ownedPath;
        
        if (categories.indexOf(a[0]) == -1)
            return SkidInc.print('<b>' + a[0] + '</b> is an unknown category.');
        
        var index = categories.indexOf(a[0]),
            itemObj = eval(path[index]);
        
        if (typeof itemObj[a[1]] == 'undefined')
            return SkidInc.print('<b>' + a[1] + '</b> is an unknown item in this category.');
        
        var item = itemObj[a[1]],
            ownedArr = eval(ownedPath[index]);
        
        // one time items should not relate on a formula
        if (item.oneTime) {
            var isOwned = ownedArr[item.index];
            
            if (item.costType == 'formula')
                return SkidInc.print('[DEV ERROR] One time items should not relate on formulas.');
            if (SkidInc.Player.money < item.cost)
                return SkidInc.print('You don\'t have enough money to buy <b>' + item.name + '</b>, it cost <b>$' + fix(item.cost, 0) + '</b>.');
            if (typeof isOwned === 'boolean' && isOwned)
                return SkidInc.print('You already own <b>' + item.name + '</b>.');
            if (item.costType == 'number' && SkidInc.Player.money >= item.cost) {
                SkidInc.Player.money -= item.cost;
                ownedArr[item.index] = true;
                return SkidInc.print('You bought ' + categories[index] + ' <b>' + item.name + '</b> for <b>$' + fix(item.cost, 0) + '</b>.');
            };
        };
        
        if (!item.oneTime) {
            var owned = ownedArr[item.index];
            
            if (item.costType == 'formula') {
                var price = eval(item.costFormula);
                
                if (SkidInc.Player.money < price)
                    return SkidInc.print('You don\'t have enough money to upgrade your <b>' + item.name + '</b>, it cost <b>$' + fix(price, 0) + '</b>.');
                if (SkidInc.Player.money >= price) {
                    SkidInc.Player.money -= price;
                    ownedArr[item.index]++;
                    return SkidInc.print('You upgraded your <b>' + item.name + '</b> for <b>$' + fix(price, 0) + '</b>.');
                };
            };
        };
    }
};