(async () => {
	console.log("teste")
	aait fetch("https://code.jquery.com/jquery-3.2.1.slim.js").then((result) => {
		console.log(result)
	})
	console.log("teste2")
})()