var SkidInc = {
    _VERSION: 0.3,
    _INTERVAL: (1000 / 30),
    _INTERVALS: {},
    _BEFORE: new Date().getTime(),
    _NOW: null,
    _INIT: false,

    capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomID: function() {
        return Math.random().toString(36).substring(7);
    },

    print: function(str) {
        var id = SkidInc.randomID(),
            fullStr = '<p><b>[' + moment().format('HH:mm:ss') + ']</b> ' + str + '</p>';

        $('.text-side').prepend('<div id="' + id + '" class="typed"></div>');
        
        if (SkidInc.Options.toggled[SkidInc.Options.options.indexOf('typing')]) {
            $('#' + id).typed({
                strings: [fullStr],
                contentType: 'html',
                typeSpeed: -100,
                callback: function() {
                    $('.typed-cursor').remove();
                }
            });
        }
        else
            $('#' + id).html(fullStr);
    },

    clear: function() {
        $('.text-side').empty();
    },

    init: function() {
        // async $.getJSON
        SkidInc.Console.init(function() {
            SkidInc.Script.init(function() {
                SkidInc.Autoscript.init(function() {
                    SkidInc.Servers.init(function() {
                        M.init(); // matrix background init
                        SkidInc.Options.init();
                        SkidInc.Main.init();
                        SkidInc.Socket.init();
                        SkidInc.Save.init();
                        
                        SkidInc._INIT = true;
                    });
                });
            });
        });
    }
};