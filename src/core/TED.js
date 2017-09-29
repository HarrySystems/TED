var sass = null;

var transpilers = [

	// HTML
		// haml
		// blade
		// mustache

		{
		    name: "pug",
		    ext: "pug",
		    ini: function() {
		    	try{
		       		e.partial("jade.js");
		    	}
		    	catch(ex) {

		    	}
		    },
		    elements: {
		        inline: {
		            input: 	"body>pre",
		            output: "body"
		        },
		        external: {
		            input: null,
		            output: null
		        }
		    },
		    transpile: function(source, target) {
		        if(e.getExt(location.href) == "pug")
					document.body.innerHTML =  jade.compile(source, {
						pretty: true,
						doctype: '5'
					})(null)
		    }
		},
		{
		    name: "jade",
		    ext: "jade",
		    ini: function() {
		        // e.partial("jade.js");
		    },
		    elements: {
		        inline: {
		            input: 	"body>pre",
		            output: "body"
		        },
		        external: {
		            input: null,
		            output: null
		        }
		    },
		    transpile: function(source, target) {
		        if(e.getExt(location.href) == "jade")
					document.body.innerHTML =  jade.compile(source, {
						pretty: true,
						doctype: '5'
					})(null)
		    }
		},
		{
		    name: "markdown",
		    ext: "md",
		    ini: function() {
		        e.partial("marked.js");
		    },
		    elements: {
		        inline: {
		            input: "body>pre",
		            output: null
		        },
		        external: {
		            input: null,
		            output: null
		        }
		    },
		    transpile: function(source, target) {
		        if(e.getExt(location.href) == "md")
		            target.innerHTML = marked(source);
		    }
		},
		{
		    name: "ejs",
		    ext: "ejs",
		    ini: function() {
		        e.partial("ejs.min.js");
		    },
		    elements: {
		        inline: {
		            input: "body>pre",
		            output: null
		        },
		        external: {
		            input: null,
		            output: null
		        }
		    },
		    transpile: function(source, target) {
		        if(e.getExt(location.href) == "ejs")
		        	target.innerHTML = ejs.render(source);
		    }
		},
		{
		    name: "haml",
		    ext: "haml",
		    ini: function() {
		        e.partial("underscore-min.js");
		        e.partial("underscore.string.min.js");
		        e.partial("ejs.js");
		    },
		    elements: {
		        inline: {
		            input: "body>pre",
		            output: null
		        },
		        external: {
		            input: null,
		            output: null
		        }
		    },
		    transpile: function(source, target) {
		        if(e.getExt(location.href) == "haml")
		        	target.innerHTML = haml.compileHaml({source: source})();
		    }
		},

	// CSS
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
				//sass = new Sass(e.here() + 'sass.worker.js');
				// sass = new Sass();
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
				Sass.compile(
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
				//sass = new Sass(e.here() + 'sass.worker.js');
				// sass = new Sass();
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
				Sass.compile(
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
		    name: "css",
		    ext: "css",
		    ini: function() {
		    },
		    elements: {
		        inline: {
		            input: 	"style[lang='css']",
		            output: "style"
		        },
		        external: {
		            input: "link[lang='css']",
		            output: "style"
		        }
		    },
		    transpile: function(source, target) {
		    	if(["pug", "jade"].includes(e.getExt(location.href))){
		    		target.innerHTML = source;
				}
		  //       target.innerHTML += Babel.transform(source, {
				// 	presets: []
				// }).code;
		    }
		},

	// JS
		{
		    name: "js",
		    ext: "js",
		    ini: function() {
		    },
		    elements: {
		        inline: {
		            input: 	null,
		            output: null
		        },
		        external: {
		            input: "script[lang='js']",
		            output: "script"
		        }
		    },
		    transpile: function(source, target) {
		    	if(["pug", "jade"].includes(e.getExt(location.href))){
		    		target.innerHTML = source;
				}
		  //       target.innerHTML += Babel.transform(source, {
				// 	presets: []
				// }).code;
		    }
		},
		{
		    name: "typescript",
		    ext: "ts",
		    ini: function() {
		       	e.partial("babel.min.js");
		    },
		    elements: {
		        inline: {
		            input: 	"script[lang='ts']",
		            output: "script"
		        },
		        external: {
		            input: "script[lang='ts']",
		            output: "script"
		        }
		    },
		    transpile: function(source, target) {
		        target.innerHTML += ts.transpileModule(source, {
					reportDiagnostics: true,
					compilerOptions: {
						noEmitOnError: true,
						diagnostics: true,
						module: ts.ModuleKind.ES2015
					}
				}).outputText;
		    }
		},
		{
		    name: "babel",
		    ext: "js",
		    ini: function() {
		       	e.partial("babel.min.js");
		    },
		    elements: {
		        inline: {
		            input: 	"script[lang='babel']",
		            output: "script"
		        },
		        external: {
		            input: "script[lang='babel']",
		            output: "script"
		        }
		    },
		    transpile: function(source, target) {
		        target.innerHTML += Babel.transform(source, {
					presets: []
				}).code;
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

		// typescript


];


// load transpiler files
	if(handler == undefined)
		handler = "inline";

	if(handler == "inline")
		for(transpiler of transpilers) {
			transpiler.ini();
		}

// add event for traspiling
	// window.addEventListener("load",function() {
		for(config in transpilers) {
			config = transpilers[config];
			transpile(config);
		}
	// })

	function transpile(config) {
		if(config == undefined)
			return null;

		// inline
			var inline = document.querySelectorAll(config.elements.inline.input);

			for(style of inline) {
				if(style.innerText != null && style.innerText != undefined)
					config.transpile(style.innerText, style);
			}

		// external
			var links = document.querySelectorAll(config.elements.external.input);

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
        					document.querySelector("head").appendChild(external);


							if(source != null && source != undefined)
        						config.transpile(source, external);
						}
					},
					async: false
				});

				link.remove();
			}

	}
