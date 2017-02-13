SkidInc.Console = {
    parser: function() {
        var str = $('#console-input').val(),
            command = str.split(' '),
            base = command[0];
        
        $('#console-input').val('');
        
        if (str == '' || str.indexOf(' ') == 0)
            return SkidInc.print('You can\'t send empty or blank commands.');
        
        if (typeof SkidInc.Console.commands[base] == 'object') {
            var thisCommand = SkidInc.Console.commands[base],
                args = null;
            
            if (command.length > 0)
                args = command.splice(1, command.length);
            
            if (!thisCommand.args)
                return eval(thisCommand.exec)();
            
            // no arg included
            if (args.length == 0)
                return SkidInc.print('This command need argument(s).');
            
            // got -h arg in the right place
            if (args.indexOf('-h') == 0 && typeof args[1] == 'undefined')
                return SkidInc.Main.detailledHelp(base);
            else if (args.indexOf('-h') > -1)
                return SkidInc.print('The <b>-h</b> argument must be the only one argument in your command <b>' + str + '</b>.');
            
            
            if (args.indexOf('-l') == 0) {
                if (!thisCommand.list)
                    return SkidInc.print('The <b>' + base + '</b> command doesn\'t accept the <b>-l</b> argument.');
                
                if (thisCommand.listArgs) {
                };
                
                if (!thisCommand.listArgs) {
                    if (args.indexOf('-l') == 0 && typeof args[1] == 'undefined')
                        return SkidInc.Main.list(base);
                    else if (args.indexOf('-l') > -1)
                        return SkidInc.print('The <b>-l</b> argument must be the only one argument in your command <b>' + str + '</b>.');
                };
            };
            
            // args handler
            for (var i = 0; i < thisCommand.argsNeeded.length; i++) {
                // a required arg is missing
                if (thisCommand.argsNeeded[i] == 'req' && typeof args[i] == 'undefined')
                    return SkidInc.print('An argument is required at the word place <b>' + (i + 2) + '</b> of your command <b>' + str + '</b>.');
                
                // bad arg type or order
                if (!isNaN(args[i]))
                    args[i] = parseInt(args[i]);
                
                if (thisCommand.argsType[i] !== typeof args[i] && typeof args[i] !== 'undefined')
                    return SkidInc.print('Wrong argument type for <b>' + args[i] + '</b> in command <b>' + str + '</b> at word place <b>' + (i + 2) + '</b>, expected a <b>' + thisCommand.argsType[i] + '</b>, not a <b>' + typeof args[i] + '</b>.');
            };
            
            return eval(thisCommand.exec)(args);
        }
        else
            return SkidInc.print('<b>' + base + '</b> is not a recognized command.');
    },
    
    init: function(callback) {
        $.getJSON('app/commands.json', function(data) {
            SkidInc.Console.commands = data;
            
            console.info('SkidInc.Console commands fetched.', SkidInc.Console.commands);
            return callback();
        });
    }
}