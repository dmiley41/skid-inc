var SkidInc = SkidInc || {};

$.extend(SkidInc, {
    _VERSION: 0.3,
    _INTERVAL: (1000 / 30),
    _INTERVALS: {},
    _BEFORE: new Date().getTime(),
    _NOW: null,

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
                    });
                });
            });
        });
    }
});

SkidInc.Main = {
    help: function() {
        var str = 'Try adding <b>-h</b> or <b>-l</b> arguments to print a detailled help or a list for some commands.<br>';

        $.each(SkidInc.Console.commands, function(i, command) {
            str += '<b>' + i + '</b>: ' + command.desc + '<br>';
        });

        return SkidInc.print(str);
    },

    detailledHelp: function(b) {
        var str = '',
            command = SkidInc.Console.commands[b];

        str += 'Command usage: <b>' + command.full + '</b><br>';

        (command.list) ? str += 'This command support <b>-l</b> argument.<br>': null;

        for (var i = 0; i < command.argsHelpName.length; i++)
            str += '<b>' + command.argsHelpName[i] + '</b>: ' + command.argsHelp[i] + '<br>';

        return SkidInc.print(str);
    },

    list: function(b, a) {
        var command = SkidInc.Console.commands[b],
            exec = command.listExec;

        if (typeof a == 'object')
            return eval(exec)(a);
        else if (typeof a == 'undefined')
            return eval(exec)();
    },

    display: function() {
        $('#stats-money').html('Money: $' + fix(SkidInc.Player.money));
        $('#stats-level').html('Level: ' + SkidInc.Player.level);
        $('#stats-exp').html('Exp: ' + fix(SkidInc.Player.exp, 0) + '/' + fix(SkidInc.Player.expReq, 0));
        $('#stats-money-mult').html('Money mult: x' + fix(SkidInc.Player.getMoneyMult(), 2));
        $('#stats-exp-mult').html('Exp. mult: x' + fix(SkidInc.Player.getExpMult(), 2));
        $('#stats-time-mult').html('Time mult: /' + fix(SkidInc.Player.getTimeMult(), 2));
        $('#stats-vm-cost').html('VM (lvl. ' + SkidInc.Servers.owned[0] + '): $' + fix(SkidInc.Servers.getCost('vm'), 0));
        $('#stats-vps-cost').html('VPS (lvl. ' + SkidInc.Servers.owned[1] + '): $' + fix(SkidInc.Servers.getCost('vps'), 0));
    },

    update: function(times) {
        SkidInc.Script.loop(times);
        SkidInc.Autoscript.loop(times);
        
        SkidInc.Main.display();
    },

    core: function() {
        SkidInc._NOW = new Date().getTime();

        var elapsed = SkidInc._NOW - SkidInc._BEFORE,
            times = Math.floor(elapsed / SkidInc._INTERVAL);

        (elapsed > SkidInc._INTERVAL) ? SkidInc.Main.update(times): SkidInc.Main.update(1);

        SkidInc._BEFORE = new Date().getTime();
    },

    init: function() {
        document.title = '$' + fix(SkidInc.Player.money, 0) + ' - SkidInc';

        $('#game-version').html('v' + SkidInc._VERSION);
        $('#console-input').focus();

        SkidInc._INTERVALS.core = setInterval(function() {
            SkidInc.Main.core();
        }, SkidInc._INTERVAL);

        $('#console-input').bind('keydown', function(e) {
            (e.which == 13) ? SkidInc.Console.parser() : null;
        }).bind(('cut copy paste'), function(e) {
            e.preventDefault();
        });
        
        $(document).keydown(function(e) {
            var code = e.keyCode || e.chich;
            
            if (code == 9) {
                e.preventDefault();
                $('#console-input').focus();
            }
        });
        
        return console.info('SkidInc.Main init done, ready to play.');
    }
};