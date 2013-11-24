var User = function(num){
	var id,
		path;
	
	id = num || createId();
	path = new paper.Path();
	
	return {
		id:id,
		path:path
	};
}

//create a random id used by User
//will be eventually replaced by user name from db
function createId() {
	var id = Math.floor( Math.random() * 100000 ) + 1;
	return id;
}

