var transpilers = [

	{
		name: "less",
		ext: "less",
		ini: function() {
			Premise.partial("less.min.js");
		},
		elements: {
			inline: "style",
			external: "link"
		},
		transpile: function(source, target) {
			less.render(
				source,
			    function (e, output) {
			    	aux = output.css;
			    	target.innerHTML = output.css;
			    }
			);
		}
	},

	{
		name: "scss",
		ext: "scss",
		ini: function() {
			Premise.partial("sass.js");
			sass = new Sass(Premise.here() + 'sass.worker.js');
		},
		elements: {
			inline: "style",
			external: "link"
		},
		transpile: function(source, target) {
			sass.compile(
				source,
				{ indentedSyntax: false},
				function(result) {
					// Something was wrong
					// if (result.line && result.message) {
					// 	showErrors('css', [
					// 		{ lineNumber: result.line - 1, message: result.message }
					// 	]);
					// }
					//console.log(result);
					target.innerHTML = result.text;
					// console.log(result.text);
				}
			);
		}
	},

	{
		name: "sass",
		ext: "sass",
		ini: function() {
			Premise.partial("sass.js");
			sass = new Sass(Premise.here() + 'sass.worker.js');
		},
		elements: {
			inline: "style",
			external: "link"
		},
		transpile: function(source, target) {
			sass.compile(
				source,
				{ indentedSyntax: true},
				function(result) {
					// Something was wrong
					// if (result.line && result.message) {
					// 	showErrors('css', [
					// 		{ lineNumber: result.line - 1, message: result.message }
					// 	]);
					// }
					//console.log(result);
					target.innerHTML = result.text;
					// console.log(result.text);
				}
			);
		}
	},

	{
		name: "stylus",
		ext: "stylus",
		ini: function() {
			Premise.partial("stylus.min.js");
		},
		elements: {
			inline: "style",
			external: "link"
		},
		transpile: function(source, target) {
			stylus(source).render(function(error, result) {
				// if (error) {
				// 	window.err = error;
				// 	// Last line of message is the actual message
				// 	var tempArr = error.message.split('\n');
				// 	tempArr.pop(); // This is empty string in the end
				// 	showErrors('css', [
				// 		{
				// 			lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
				// 			message: tempArr.pop()
				// 		}
				// 	]);
				// }

				target.innerHTML = result
			});
		}
	}

];


// load transpiler files
	for(transpiler of transpilers) {
		transpiler.ini();
	}

// add event for traspiling
	window.addEventListener("load",function() {
		for(config in transpilers) {
			config = transpilers[config];
			transpile(config);
		}
	})

	function transpile(config) {
		if(config == undefined)
			return null;

		try {
			// inline
				var inline = document.querySelector(config.elements.inline + "[lang='" + config.ext + "']");
				if(!Array.isArray(inline) && inline != null)
					inline = [inline];
				else
					inline = [];

				for(style of inline) {
					less.render(
						style.innerHTML,
					    function (e, output) {
					    	style.innerHTML = output.css;
					    }
					);
				}

			// external
				var links = document.querySelector(config.elements.external + "[lang='" + config.ext + "']");
				if(!Array.isArray(links) && links != null)
					links = [links];
				else
					links = [];

				for(link of links) {
					var source = "";
					
					var url = link.href;
					if(url == null)
						url = link.src;

					e.fetch({
						url: link.href,
						events: {
							success: function(data) {
								source = data;
							}
						},
						async: false
					});

					var external = document.createElement(config.elements.inline);
					document.body.appendChild(external);

					config.transpile(source, external);
					link.remove();
				}
		}
		catch(ex) {

		}
		
	}