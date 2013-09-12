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
			"name" : "Form Group Horizontal",
			"template":"form_group_horizontal",
			"label" : "Label",
			"columns" : "3"
		},
		{
			"group" : "form",
			"name" : "Form Group Vertical ",
			"template":"form_group_vertical",
			"label" : "Label"
		},
		{
			"group" : "input",
			"name" : "Input",
			"template":"input",
			"label":"Input label",
			"placeholder": "Input placeholder",
			"type" : "text"
		},
		{
			"group" : "input",
			"name" : "Textarea",
			"template":"textarea",
			"label":"Input label",
			"rows": "3"
		},
		{
			"group" : "input",
			"name" : "Select",
			"template":"select",
			"label":"Input label",
			"placeholder": "Input placeholder"
		},
		{
			"group" : "input",
			"name" : "Checkbox",
			"template":"checkbox",
			"text":"I agree ...",
		},
		{
			"group" : "input",
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
		{
			"group" : "test",
			"name" : "Test Element",
			"template":"form_group",
			"label" : "Brand",
			"columns" : "2",
			"elements" : [
				{
					"template": "button",
					"label": "Click Me",
              }
			]
		},

	];
	
});