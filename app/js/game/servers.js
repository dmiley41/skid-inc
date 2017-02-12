SkidInc.Servers = {
    owned: [],
    
    getCost: function(what) {
        var server = SkidInc.Servers.servers[what],
            owned = SkidInc.Servers.owned[server.index];
        
        return eval(server.costFormula);
    },
    
    init: function(callback) {
        $.getJSON('app/servers.json', function(data) {
            SkidInc.Servers.servers = data;
            
            $.each(SkidInc.Servers.servers, function(i, server) {
                SkidInc.Servers.owned.push(0);
            });
            
            console.info('SkidInc.Servers servers fecthed.', SkidInc.Servers.servers);
            return callback();
        });
    }
};