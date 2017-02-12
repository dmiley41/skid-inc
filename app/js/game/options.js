SkidInc.Options = {
    options: ['background', 'typing'],
    execPath: ['SkidInc.Options.toggleBackground', 'SkidInc.Options.toggleTyping'],
    toggled: [false, false],
    
    toggleBackground: function(param) {
        if (param == true) {
            $('#matrix').fadeIn('slow');
            return SkidInc.print('Matrix background enabled.');
        };
        
        if (param == false) {
            $('#matrix').fadeOut('slow');
            return SkidInc.print('Matrix background disabled.');
        };
    },
    
    toggleTyping: function(param) {
        if (param == true) {
            SkidInc.Options.toggled[SkidInc.Options.options.indexOf('typing')] = true;
            return SkidInc.print('Typing text effect enabled.');
        };
        
        if (param == false) {
            SkidInc.Options.toggled[SkidInc.Options.options.indexOf('typing')] = false;
            return SkidInc.print('Typing text effect disabled.');
        };
    },
    
    list: function() {
        var str = '<b>option background true/false</b>: enable/disable matrix background effect (disabling it increase performances).<br>' +
            '<b>option typing true/false</b>: enable/disable the typing text effect.';
        
        return SkidInc.print(str);
    },
    
    exec: function(a) {
        if (SkidInc.Options.options.indexOf(a[0]) == -1)
            return SkidInc.print('<b>' + a[0] + '</b> is an unknown option, type <b>option -l</b> for a list of options.');
        if (a[1] !== 'true' && a[1] !== 'false')
            return SkidInc.print('You must put <b>true</b> or <b>false</b> as a parameter instead of <b>' + a[1] + '</b>.');
        if (a[1] == 'true' || a[1] == 'false') {
            var index = SkidInc.Options.options.indexOf(a[0]),
                parameter = (a[1] == 'true'); // string to boolean
            
            return eval(SkidInc.Options.execPath[index])(parameter);
        };
    },
    
    init: function() {
        if (SkidInc.Options.toggled[SkidInc.Options.options.indexOf('background')] == true)
            $('#matrix').fadeIn('slow');
        
        return console.info('SkidInc.Options init done.');
    }
};