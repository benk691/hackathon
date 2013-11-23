paper.install(window);

window.onload = function() {
	//define our canvas element
	var canvas = document.getElementById('whiteBoard');
	//define paper scope
	paper.setup(canvas);
	//define tool and path objects 
	var tool = new Tool(),
		path;
	
	tool.onMouseDown = function(event){
		path = new Path();
		path.strokeColor = 'black';
		path.add(event.point);
		view.draw();
	}

	tool.onMouseDrag = function(event) {
		path.add(event.point);
		view.draw();
	}
}
