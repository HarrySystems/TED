// NOTHING TO SEE HERE

// chrome.contentSettings['javascript'].set({
//     primaryPattern: '<all_urls>',
//     setting: "block"
// })


// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		if (request.ted_dom == "loaded") {
// 			chrome.contentSettings['javascript'].set({
// 				primaryPattern: '<all_urls>',
// 				setting: "allow"
// 			})
// 			sendResponse({
// 				ted_extension: "js_enabled"
// 			})
// 		}
// 	}
// );