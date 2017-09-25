var transpilers = [
    
	// CONSIDER document.getElementsByTagName("pre")[0].innerHTML
	// pug/jade
	// haml
	// markdown
	
	{
	    name: "pug",
	    ext: "pug",
	    ini: function() {
	        e.partial("jade.js");
	    },
	    elements: {
	        inline: {
	            input: "body",
	            output: null
	        },
	        external: {
	            input: null,
	            output: null
	        }
	    },
	    transpile: function(source, target) {
	        if(e.getExt(location.href) == "pug")
	            target.innerHTML = jade.render(source);
	    }
	},
	
	{
		name: "less",
		ext: "less",
		ini: function() {
			e.partial("less.min.js");
		},
		
		elements: {
			inline: {
			    input: "style[lang='less']",
			    output: "style"
			},
			external: {
			    input: "link[lang='less']",
			    output: "style"
			}
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
			e.partial("sass.js");
			sass = new Sass(e.here() + 'sass.worker.js');
		},
		elements: {
			inline: {
			    input: "style[lang='scss']",
			    output: "style"
			},
			external: {
			    input: "link[lang='scss']",
			    output: "style"
			}
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
			e.partial("sass.js");
			sass = new Sass(e.here() + 'sass.worker.js');
		},
		
		elements: {
			inline: {
			    input: "style[lang='sass']",
			    output: "style"
			},
			external: {
			    input: "link[lang='sass']",
			    output: "style"
			}
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
		ext: "styl",
		ini: function() {
			e.partial("stylus.min.js");
		},
		
		elements: {
			inline: {
			    input: "style[lang='styl']",
			    output: "style"
			},
			external: {
			    input: "link[lang='styl']",
			    output: "style"
			}
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
	},

	{
		name: "coffeescript",
		ext: "coffee",
		ini: function() {
			e.partial("coffee-script.js");
		},
		
		elements: {
			inline: {
			    input: "script[lang='coffee']",
			    output: "script"
			},
			external: {
			    input: "script[lang='coffee']",
			    output: "script"
			}
		},
		transpile: function(source, target) {
			stylus(source).render(function(error, result) {
				// try {
					target.innerHTML = CoffeeScript.compile(source, { bare: true });
				// } catch (e) {
					// showErrors('js', [
					// 	{ lineNumber: e.location.first_line, message: e.message }
					// ]);
				// }
			});
		}
	}
	// babel
	// typescript


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
				var inline = document.querySelector(config.elements.inline.input);
				if(!Array.isArray(inline) && inline != null)
					inline = [inline];
				else
					inline = [];

				for(style of inline) {
					config.transpile(style.innerHTML, style);
				}

			// external
				var links = document.querySelector(config.elements.external.input);
				if(!Array.isArray(links) && links != null)
					links = [links];
				else
					links = [];

				for(link of links) {
					var source = "";
					
					var url = link.href;
					if(url == undefined)
						url = link.src;

					e.fetch({
						url: url,
						events: {
							success: function(data) {
								source = data;
								
            					var external = document.createElement(config.elements.external.output);
            					document.body.appendChild(external);
            
            					config.transpile(source, external);
							}
						},
						async: false
					});

					link.remove();
				}
		}
		catch(ex) {

		}
		
	}