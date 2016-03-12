//Modernizr.classlist = false;
if (Modernizr.queryselector && Modernizr.classlist) {
	tabatron2000();
}
else {
	//document.getElementsByTagName('html')[0].className+=' no-classlist';
}

// Based on http://codepen.io/LukyVj/pen/yNwgrK
function tabatron2000() {
	// jQuery like query selector
	var $ = function (selector) {
		return document.querySelectorAll(selector);
	};

	// Define tabs
	var tabs = [
		'.tabbed-section__selector-tab-1',
		'.tabbed-section__selector-tab-2',
		'.tabbed-section__selector-tab-3',
		'.tabbed-section__selector-tab-4'
	];	

	// Create the toggle function
	var toggleTab = function(element) {
		var parent = element.parentNode;
		
		// Do things on click
		$(element)[0].addEventListener('click', function(e){
			// Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			e.preventDefault();
			//console.log(this.parentNode.childNodes);
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
			
			// Check if the clicked tab contains the class of the 1 or 2
			if(this.classList.contains('tabbed-section__selector-tab-1')) {
				toggleClass(1, [2,3,4]);
			}

			if(this.classList.contains('tabbed-section__selector-tab-2')) {
				toggleClass(2, [1,3,4]);
			}
			
			if(this.classList.contains('tabbed-section__selector-tab-3')) {
				toggleClass(3, [1,2,4]);
			}

			if(this.classList.contains('tabbed-section__selector-tab-4')) {
				toggleClass(4, [1,2,3]);
			}

		});
	};

	function toggleClass(id, excludes) {
		$('.tabbed-section-' + id)[0].classList.remove('hidden');
		$('.tabbed-section-' + id)[0].classList.add('visible');

		for (var i = 0; i < excludes.length; i++) {
			$('.tabbed-section-' + excludes[i])[0].classList.remove('visible');
			$('.tabbed-section-' + excludes[i])[0].classList.add('hidden');    	
		}
	}

	for (var i = tabs.length - 1; i >= 0; i--) {
		toggleTab(tabs[i]);
	}

}
