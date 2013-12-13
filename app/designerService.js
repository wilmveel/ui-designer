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
			"template":"column",
			"data" : {
				"columns" : 6
			}
		},
		{
			"group" : "form",
			"name" : "Form",
			"template" : "form",
			"data" : {
				"orientation":""
			}
		},
		{
			"group" : "input",
			"name" : "Input",
			"template":"input",
			"data" : {
				"label":"Input label",
				"placeholder": "Input placeholder",
				"type" : "text",
				"columns" : 3,
				"orientation":""
			},
            "attributes": {
              "model": {
                "ngModel": "data.init"
              },
              "validation": {
                "ngMaxlength": 6
              }
            }
		},
		{
			"group" : "input",
			"name" : "Textarea",
			"template":"textarea",
			"data" : {
				"label":"Input label",
				"rows": "3",
				"orientation":""
			},
            "attributes": {
                "model": {
                  "ngModel": "data.init"
                },
                "validation": {
                  "ngMaxlength": 6
                }
              }
		},
		{
			"group" : "input",
			"name" : "Select",
			"template":"select",
			"data" : {
				"label":"Input label",
				"placeholder": "Input placeholder",
				"orientation":""
			},
            "attributes": {
                "model": {
                  "ngModel": "data.init"
                },
                "validation": {
                  "required": true
                }
             }
		},
		{
			"group" : "input",
			"name" : "Checkbox",
			"template":"checkbox",
			"data" : {
				"text":"I agree ...",
				"columns" : 3,
				"orientation":""
			},
            "attributes": {
                "model": {
                  "ngModel": "data.init"
                },
                "validation": {
                  "required": true
                }
            }
		},
		{
			"group" : "input",
			"name" : "Button",
			"template":"button",
			"data" : {
				"label": "Button",
				"color": "default",
				"size": "",
				"ngclick": "alert('test')",
				"icon" : "",
				"block" : 0,
				"orientation":"",
				"columns" : 3
			},
            "attributes": {
                "click": {
                  "ngClick": "send()"
                }
            }
		},
		{
			"group" : "panel",
			"name" : "Panel",
			"template":"panel",
			"data" : {
				"title" : "Title panel",
				"color" : "default"
			}
		},
		{
			"group" : "tab",
			"name" : "Tabset",
			"template":"tabset"
		},
		{
			"group" : "tab",
			"name" : "Tab",
			"template":"tab",
			"data" : {
				"title" : "Heading"
			}
		},
		
		{
			"group" : "navigation",
			"name" : "Navbar",
			"template":"navbar"
		},
		{
			"group" : "navigation",
			"name" : "Navbar header",
			"template":"navbar_header"
		},
		{
			"group" : "navigation",
			"name" : "Navbar brand",
			"template":"navbar_brand",
			"data" : {
				"text" : "Brand"
			}
		},
		{
			"group" : "test",
			"name" : "Test Element",
			"template":"form_group",
			"data" : {
				"label" : "Brand",
				"columns" : "2"
			},
			"elements" : [
				{
					"template": "button",
					"label": "Click Me"
              }
			]
		},

	];
	
});