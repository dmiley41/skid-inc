SkidInc.Options = {
    options: ['background', 'typing', 'theme'],
    execPath: ['SkidInc.Options.toggleBackground', 'SkidInc.Options.toggleTyping', 'SkidInc.Options.changeTheme'],
    toggled: [true, false, 'default'],
    themes: ['default', 'fallout'],
    themesLocked: [false, true],
    uuid: null,
    
    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    
    getThemes: function() {
        var themes = '';
        
        for (var i = 0; i < SkidInc.Options.themes.length; i++) {
            themes += SkidInc.Options.themes[i]
            
            if (i !== (SkidInc.Options.themes.length - 1))
                themes += ', ';
        };
        
        return themes;
    },
    
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
    
    changeTheme: function(param) {
        if (SkidInc.Options.themesLocked[SkidInc.Options.themes.indexOf(param)])
            return SkidInc.print('<b>' + param + '</b> theme is locked.');
        else if (!SkidInc.Options.themesLocked[SkidInc.Options.themes.indexOf(param)]) {
            $('.console').removeClass().addClass('console ' + param);
            $('.navbar').removeClass().addClass('navbar navbar-default navbar-fixed-top ' + param);
            
            SkidInc.Options.toggled[SkidInc.Options.options.indexOf('theme')] = param;
            
            return SkidInc.print('<b>' + param + '</b> theme enabled.');
        };
    },
    
    list: function() {
        var str = '<b>option background true/false</b>: enable/disable matrix background effect (disabling it increase performances).<br>' +
            '<b>option typing true/false</b>: enable/disable the typing text effect.<br>' +
            '<b>option theme [theme name]</b>: change your theme according to this list (<b>' + SkidInc.Options.getThemes() + '</b>).<br>';
        
        return SkidInc.print(str);
    },
    
    exec: function(a) {
        if (SkidInc.Options.options.indexOf(a[0]) == -1)
            return SkidInc.print('<b>' + a[0] + '</b> is an unknown option, type <b>option -l</b> for a list of options.');
        
        // exception: theme
        if (a[0] == 'theme') {
            if (SkidInc.Options.themes.indexOf(a[1]) == -1)
                return SkidInc.print('<b>' + a[1] + '</b> is an unknown theme, type <b>option -l</b> for a list of options, and themes.');
            if (SkidInc.Options.themes.indexOf(a[1]) > -1)
                return SkidInc.Options.changeTheme(a[1]);
        };
        
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
        
        SkidInc.Options.uuid = SkidInc.Options.guid();
        
        return console.info('SkidInc.Options init done.');
    }
};