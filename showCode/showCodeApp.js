(function() {
	
	var app = angular.module("puzzleCode", []);
	
	app.controller("ShowCodeController", function() {
		this.showCode = false;
		this.codeIndex = 0;
		
		this.setShowCode = function() {
			
			this.showCode = !this.showCode;
		};
		
		this.changeCodeIndex = function(value) {
			
			this.codeIndex += value;
			
			if (this.codeIndex > 2)
				this.codeIndex = 0;
				
			if (this.codeIndex < 0)
				this.codeIndex = 1;
		};
	});
	
	app.directive("showhtml", function() {
		return {
			restrict: "E",
			templateUrl: "showCode/show_html.html"
		};
	});
	
	app.directive("showreact", function() {
		return {
			restrict: "E",
			templateUrl: "showCode/show_react.html"
		};
	});
	
	app.directive("showangular", function() {
		return {
			restrict: "E",
			templateUrl: "showCode/show_angular.html"
		};
	});
})();