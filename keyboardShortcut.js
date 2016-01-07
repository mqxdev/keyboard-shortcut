/*
    Config variables
 */
var config = {
    active: true,
    debug: true,
    keys: {
        active:'f2',
        debug:'f4'
    },
    press: {
        shift: false,
        ctrl: false,
        alt: false
    }
};

/*
    Keyboard KeyCodes
 */
var keyboardKeys = {
    'backspace':8,
    'tab':9,
    'enter':13,
    'shift':16,
    'ctrl':17,
    'alt':18,
    'pausebreak':19,
    'capslock':20,
    'escape':27,
    'pageup':33,
    'pagedown':34,
    'end':35,
    'home':36,
    'leftarrow':37,
    'uparrow':38,
    'rightarrow':39,
    'downarrow':40,
    'insert':45,
    'delete':46,
    'n0':48,
    'n1':49,
    'n2':50,
    'n3':51,
    'n4':52,
    'n5':53,
    'n6':54,
    'n7':55,
    'n8':56,
    'n9':57,
    'a':65,
    'b':66,
    'c':67,
    'd':68,
    'e':69,
    'f':70,
    'g':71,
    'h':72,
    'i':73,
    'j':74,
    'k':75,
    'l':76,
    'm':77,
    'n':78,
    'o':79,
    'p':80,
    'q':81,
    'r':82,
    's':83,
    't':84,
    'u':85,
    'v':86,
    'w':87,
    'x':88,
    'y':89,
    'z':90,
    'leftwindowkey':91,
    'rightwindowkey':92,
    'selectkey':93,
    'numpad0':96,
    'numpad1':97,
    'numpad2':98,
    'numpad3':99,
    'numpad4':100,
    'numpad5':101,
    'numpad6':102,
    'numpad7':103,
    'numpad8':104,
    'numpad9':105,
    'multiply':106,
    'add':107,
    'subtract':109,
    'decimalpoint':110,
    'divide':111,
    'f1':112,
    'f2':113,
    'f3':114,
    'f4':115,
    'f5':116,
    'f6':117,
    'f7':118,
    'f8':119,
    'f9':120,
    'f10':121,
    'f11':122,
    'f12':123,
    'numlock':144,
    'scrolllock':145,
    'semicolon':186,
    'equalsign':187,
    'comma':188,
    'dash':189,
    'period':190,
    'forwardslash':191,
    'graveaccent':192,
    'openbracket':219,
    'backslash':220,
    'closebraket':221,
    'singlequote':222
};

/*
    Toggle key to config
 */
function toggleKey(key){
    if(config[key]==true){
        config[key]=false;
        return true
    }
    config[key]=true;
    return true
}

/*
    Show debug if active
 */
function keyboardShortcutDebug(options){
    if(config.debug){
        console.log(config,options)
    }
    return true;
}

/*
    Verify shortcut and execute closure
 */
function keyboardShortcut(options,closure){
    if(!config.active) return false;
    //set options to special keys false if unset
    if(!options.alt){ options.alt=false}
    if(!options.ctrl){ options.ctrl=false}
    if(!options.shift){ options.shift=false}
    //verify options to special keys
    if(options.alt!=config.press.alt) return false;
    if(options.ctrl!=config.press.ctrl) return false;
    if(options.shift!=config.press.shift) return false;
    if(
        (options.selector.which==keyboardKeys[options.key] || options.selector.keyCode==keyboardKeys[options.key])
    ){
        if(typeof closure === 'function'){
            closure()
        }
        keyboardShortcutDebug([options,closure]);
        return true
    }
    return false
}

$(document).ready(function(){
    $(document).keydown(function( e ){
        if(e.which==keyboardKeys[config.keys.active]) {toggleKey('active')}
        if(e.which==keyboardKeys[config.keys.debug]) {toggleKey('debug')}
        /*
         on key down verify special keys
         */
        if(e.which==keyboardKeys.shift){ config.press.shift = true; return true;}
        if(e.which==keyboardKeys.ctrl){ config.press.ctrl = true; return true;}
        if(e.which==keyboardKeys.alt){ config.press.alt = true; return true;}
    });
    /*
     on key up turn false all special keys
     */
    $(document).keyup(function() {
        config.press.shift = false;
        config.press.ctrl = false;
        config.press.alt = false;
    })
});