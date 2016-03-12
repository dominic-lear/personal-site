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

	function init () {
		console.log($('.tab-link')[0]);
		for (var i = 0; i < tabs.length; i++) {
			toggleTab(tabs[i]);
		}
	}

	// Create the toggle function
	var toggleTab = function(element) {
		// Click handler for tab links
		$(element)[0].addEventListener('click', function(e){

			// Stop default anchor behaviour with #links
			e.preventDefault();

			// Set the click tab link as active
			toggleTabLink();
			this.classList.add('tab-link--active');

			// Set the tab content as active
			var tabId = this.getAttribute('data-tab-id');
			toggleTabContent(tabId);

		});
	};

	// Toggle Tab Links
	function toggleTabLink() {
		var tabSelectors = $('.tab-link');
		for (var i = 0; i < tabSelectors.length; i++) {
			tabSelectors[i].classList.remove('tab-link--active');
		}
	}

	// Toggle Tab Content
	function toggleTabContent(activeTab) {
		// Get all the tabs
		var tabs = $('.tab-content');

		for (var i = 0; i < tabs.length; i++) {

			// Get the tab index from the current tab
			var tabId = tabs[i].getAttribute('data-tab');

			// If it matches the active tab id from the link show it if not hide it
			if (tabId == activeTab) {
				tabs[i].classList.remove('tab-content--hidden');
				tabs[i].classList.add('tab-content--visible');
			} else {
				tabs[i].classList.remove('tab-content--visible');
				tabs[i].classList.add('tab-content--hidden');
			}
		}

	}

	init();
}
