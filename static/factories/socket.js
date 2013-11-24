function socketFunc ($rootScope) {
	var socket = io.connect();
	var listeners = [];
	return {
		on: function(eventName, callback){
			//add event and listener to list
			//so we can remove them on destroy
			listeners.push({
				eventName:eventName,
				callback:callback
			});
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});
		},
		emit: function (eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callback){
						callback.apply(socket,args);
					}
				});
			});
		},
		removeAllListeners: function() {
			for(var i = 0; i < listeners.length; ++i ){
				var listener = listeners[i];
				socket.removeListener(listener.eventName,listener.callback);
			}
		}
	};
}

