game.console.cmds = {
    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        args: [
            ['hack'],
            ['hack', '-stats'],
            ['hack', '-help'],
            // places
            ['hack', '-place', 'mini-market'],
            ['hack', '-place', 'market'],
            ['hack', '-place', 'jewelry'],
            ['hack', '-place', 'bank'],
            ['hack', '-place', 'trading-center'],
            ['hack', '-place', '-list']
        ],
        exec: [
            'game.hack("sp")',
            'game.hack("stats")',
            'game.hack("help")',
            // places
            'game.hack("mini-market")',
            'game.hack("market")',
            'game.hack("jewelry")',
            'game.hack("bank")',
            'game.hack("trading-center")',
            'game.hack("list")'
        ]
    },

    'help': {
        name: 'help',
        desc: 'print a list of all the commands.',
        args: [
            ['help']
        ],
        exec: [
            'game.console.printHelp()'
        ]
    },

    'clear': {
        name: 'clear',
        desc: 'clear console output',
        args: [
            ['clear'],
            ['clear', '-help']
        ],
        exec: [
            'game.console.clear()',
            'game.console.clear("help")'
        ]
    },

    'config': {
        name: 'config',
        desc: 'configure game settings.',
        args: [
            ['config'],
            ['config', '-help'],
            ['config', '-sounds', '0'],
            ['config', '-sounds', '1'],
            ['config', '-background', '0'],
            ['config', '-background', '1']
        ],
        exec: [
            'game.config("sp")',
            'game.config("help")',
            'game.config("sound-off")',
            'game.config("sound-on")',
            'game.config("background-off")',
            'game.config("background-on")'
        ]
    },
    
    'buy': {
        name: 'buy',
        desc: 'buy a server to increase hack income.',
        args: [
            ['buy'],
            ['buy', '-server'],
            ['buy', '-help'],
            ['buy', '-info'],
            ['buy', '-server', '-help'],
            ['buy', '-server', 'personal'],
            ['buy', '-server', 'professional'],
            ['buy', '-server', 'vm'],
            ['buy', '-server', 'quickhack']
        ],
        exec: [
            'game.buy("sp")',
            'game.buy("serv")',
            'game.buy("help")',
            'game.buy("info")',
            'game.buy("serv-help")',
            'game.buy("serv-pers")',
            'game.buy("serv-pro")',
            'game.buy("serv-speedhack")',
            'game.buy("serv-quickhack")'
        ]
    },
    
    'guide': {
        name: "guide",
        desc: "learn the basics of the game",
        args: [
            ['guide']
        ],
        exec: [
            'game.console.printGuide()'
        ]
    },
    
    'achievements': {
        name: 'achievements',
        desc: 'see all game achievements here.',
        args: [
            ['achievements'],
            ['achievements', '-help'],
            ['achievements', '-list']
        ],
        exec: [
            'game.achievements.exec("sp")',
            'game.achievements.exec("help")',
            'game.achievements.exec("list")'
        ]
    }
};