paper.install(window);

window.onload = function() {
	//define our canvas element
	var canvas = document.getElementById('whiteBoard');
	//define paper scope
	paper.setup(canvas);

	//define self
	var user = new User();
	//define guests
	var guests = new Array ();
	//define 

	var tool = new Tool(); //needed to create tools
	tool.onMouseDown = function(event){
		path = new Path();
		path.strokeColor = 'black';
		path.add(event.point);

		socket.emit('addPath',{ id:user.id,
							    x:event.point.x,
							    y:event.point.y });
		view.draw();
	}

	tool.onMouseDrag = function(event) {
		path.add(event.point);

		socket.emit('addPoint',{ id:user.id,
		                         x:event.point.x,
								 y:event.point.y });
		view.draw();
	}

	//helper for finding user in array of users (guests)
	function findUser ( arr, id ){
		for ( var i = 0; i < guests.length; ++i ){
			if ( arr[i].id === id )
				return i;
		}
		console.log('error finding user');
		return -1;
	}
		
	//////////////////////////////////////////
	//socket actions
	/////////////////////////////////////////

	socket.on('connect', function() {
		console.log('My id is: ' + user.id);
		socket.emit('addUser', { id : user.id });
	});

	socket.on('addUser', function(data) {
		console.log('User with id: ' + data.id + ' has logged in');
		guests.push(new User(data.id));
	});

	socket.on('removeUser', function(data) {
		console.log('User with id: ' + data.id + ' has logged out');
		var index = findUser ( guests, data.id );
		guests.splice(index,1);
	});

	socket.on('addPath', function (data){
		var index = findUser( guests, data.id );
		if ( index > -1 ){
			var tmpPath = new Path();
			tmpPath.strokeColor = 'black';
			guests[index].path = tmpPath;
		}
	});

	socket.on('addPoint', function (data){
		var index = findUser( guests, data.id );
		guests[index].path.add({x:data.x, y:data.y});
		view.draw();
	});
}
