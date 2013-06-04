var eventuality = function (that){
    var registry = {
        /*"event_1" : [
            { method : "get_name" },
            { method : "aaaa"     }
        ]*/
    };

    that.trigger = function (event, p){
        var handlers, handler, i, func;
        if(registry.hasOwnProperty(event)){
            handlers = registry[event];
            for(i = 0; i < handlers.length; i++){
                handler = handlers[i];
                func = handler.method;
                func.apply(this, p || []);                  
            }
        }
    }

    that.on = function(event, callback){
        if(registry.hasOwnProperty(event)){
            registry[event].push({method : callback})
        }else{
            registry[event] = [{method : callback}] 
        }
    }
    
    that.off = function(){ registry = {}; }

    return that;
}