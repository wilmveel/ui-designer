app.service('designerService', function($http, $q) {
	
	this.templates = [
		{
			"group" : "grid",
			"name" : "Row",
			"template":"row"
		},
		{	
			"group" : "grid",
			"name" : "Column",
			"columns" : 6,
			"template":"column"
		},
		{
			"group" : "form",
			"name" : "Form",
			"template":"form",
			"orientation":"",
		},
		{
			"group" : "form",
			"name" : "Input",
			"template":"input",
			"label":"Input label",
			"placeholder": "Input placeholder",
			"type" : "text"
		},
		{
			"group" : "form",
			"name" : "Textarea",
			"template":"textarea",
			"label":"Input label",
			"rows": "3"
		},
		{
			"group" : "form",
			"name" : "Select",
			"template":"select",
			"label":"Input label",
			"placeholder": "Input placeholder"
		},
		{
			"group" : "form",
			"name" : "Checkbox",
			"template":"checkbox",
			"text":"I agree ...",
		},
		{
			"group" : "form",
			"name" : "Button",
			"template":"button",
			"label": "Button",
			"color": "default",
			"size": "",
			"ngclick": "alert('test')",
			"icon" : "",
			"block" : 0,
			"pull" : ""
		},
		{
			"name" : "Button group",
			"group" : "form",
			"template":"button_group",
			"label":"Button",
			"size":""
		},
		{
			"group" : "panel",
			"name" : "Panel",
			"template":"panel",
			"title" : "Title panel",
			"color" : "default"
		},
		{
			"group" : "tab",
			"name" : "Tabset",
			"template":"tabset",
		},
		{
			"group" : "tab",
			"name" : "Tab",
			"template":"tab",
		},
		
		{
			"group" : "navigation",
			"name" : "Navbar",
			"template":"navbar",
		},
		{
			"group" : "navigation",
			"name" : "Navbar header",
			"template":"navbar_header",
		},
		{
			"group" : "navigation",
			"name" : "Navbar brand",
			"template":"navbar_brand",
			"text" : "Brand"
		},

	];
	
});