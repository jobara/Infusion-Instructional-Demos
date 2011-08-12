/*
Copyright 2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global demo:true, fluid, jQuery*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var demo = demo || {};

(function ($) {
    
    fluid.defaults("demo.radioRenderer", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],

        finalInitFunction: "demo.radioRenderer.finalInit",
        selectors: {
            radioRow: ".democ-radios-radio",
            radioButton: ".democ-radios-radioButton",
            radioLabel: ".democ-radios-radioLabel"
        },
        repeatingSelectors: ["radioRow"],
        model: {
            radios: {
                selection: [],
                choices: ["opt1", "opt2", "opt3", "opt4"],
                names: ["Option 1", "Option 2", "Option 3", "Option 4"]
            }
        },
        produceTree: "demo.radioRenderer.produceTree"
    });

    demo.radioRenderer.finalInit = function (that) {
        that.refreshView();
    };
    
    demo.radioRenderer.produceTree = function (that) {
        var tree = {
            "expander": {
                "type": "fluid.renderer.selection.inputs",
                "rowID": "radioRow",
                "labelID": "radioLabel",
                "inputID": "radioButton",
                "selectID": "radio-buttons",
                "tree": {
                    "selection": "${radios.selection}",
                    "optionlist": "${radios.choices}",
                    "optionnames": "${radios.names}"
                }
            }
        };
        return tree;
    };
    
})(jQuery);