chrome.tabs.onUpdated.addListener(function (tabId , info, tab) {
	if (info.status === 'complete') {
		// console.log("loaded");
		// chrome.tabs.executeScript(
		// 	tabId,
		// 	{
		// 		code: "var ted_ini = false;"
		// 	}
		// );

		// var core = [
		// 	"babel.min",
		// 	"coffee-script",
		// 	"e",
		// 	"less.min",
		// 	"marked",
		// 	"sass",
		// 	"sass.worker",
		// 	"stylus.min",
		// 	"TED",
		// 	"typescript"
		// ];
		// for(var i = 0; i < core.length; i++) {
		// 	chrome.tabs.executeScript(
		// 		tabId,
		// 		{
		// 			file: 'core/' + core[i] + ".js"
		// 		}
		// 	);
		// }
	}
});