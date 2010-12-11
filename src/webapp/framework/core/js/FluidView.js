/*
Copyright 2010 Lucendo Development Ltd.

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/** This file contains functions which depend on the presence of a DOM document
 *  and which depend on the contents of Fluid.js **/

// Declare dependencies.
/*global jQuery*/

var fluid_1_3 = fluid_1_3 || {};

(function ($, fluid) {

    fluid.defaults("fluid.ariaLabeller", {
        labelAttribute: "aria-labelledby",
        labelMarkup: "<span style='display: none'></span>",
        invokers: {
            generateLabelId: {funcName: "fluid.ariaLabeller.generateLabelId", args: ["{ariaLabeller}", "@0"]},
            getLabelElement: {funcName: "fluid.ariaLabeller.getLabelElement", args: ["{ariaLabeller}", "@0"]},
            generateLabelElement: {funcName: "fluid.ariaLabeller.generateLabelElement", args: ["{ariaLabeller}", "@0"]}
        }
    });
 
    fluid.ariaLabeller = function(element, options) {
        var that = fluid.initView("fluid.ariaLabeller", element, options);
        fluid.initDependents(that);
        that.freshLabel = true;

        that.update = function(newOptions) {
            newOptions = newOptions || that.options;
            var element = that.getLabelElement(true);
            if (!that.alreadyLabelled) {
                element.text(newOptions.text);
            }
        }
        that.update();
        that.freshLabel = false;
        return that;
    };
    
    fluid.ariaLabeller.generateLabelId = function(that, baseId) {
        return that.typeName + "-" + baseId; // + "-" + fluid.allocateGuid();
    };
    
    fluid.ariaLabeller.generateLabelElement = function(that, labelId) {
        var labEl = $(that.options.labelMarkup);
        labEl.attr("id", labelId);
        that.container.append(labEl);
         //$("body").append(labEl);
        return labEl;
    };
    
    fluid.ariaLabeller.getLabelElement = function(that, rebind) {
        var labelId = that.container.attr(that.options.labelAttribute);
        if (labelId && that.freshLabel) {
            that.alreadyLabelled = true;
        }
        if (!labelId) {
            var ourId = fluid.allocateSimpleId(that.container);
            labelId = that.generateLabelId(ourId);
            that.container.attr(that.options.labelAttribute, labelId);
        }
      /*  else if (rebind) {
            fluid.log("rebinding target");
            that.container.attr(that.options.labelAttribute, "");
            window.setTimeout(function() {
                that.container.attr(that.options.labelAttribute, labelId);
            }, 1000);
        }*/
        var labEl = fluid.jById(labelId);
        if (labEl.length === 0) {
            labEl = that.generateLabelElement(labelId);
        }
        return labEl;
    };
    
    var LABEL_KEY = "aria-labelling";
    
    fluid.getAriaLabeller = function(element) {
        element = $(element);
        var that = fluid.getScopedData(element, LABEL_KEY);
        return that;      
    };
    
    /** Manages an ARIA-mediated label attached to a given DOM element. An
     * aria-labelledby attribute and target node is fabricated in the document
     * if they do not exist already, and a "little component" is returned exposing a method
     * "update" that allows the text to be updated. */
    
    fluid.updateAriaLabel = function(element, text, options) {
        fluid.log("updateLabel: " + fluid.allocateSimpleId(element) + ": " + text);
        var options = $.extend({}, options || {}, {text: text});
        var that = fluid.getAriaLabeller(element);
        if (!that) {
            that = fluid.ariaLabeller(element, options);
            fluid.setScopedData(element, LABEL_KEY, that);
        }
        else that.update(options);
        return that;
    };
    
    /** Sets an interation on a target control, which morally manages a "blur" for
     * a possibly composite region.
     * A timed blur listener is set on the control, which waits for a short period of
     * time (options.delay, defaults to 150ms) to discover whether the reason for the 
     * blur interaction is that either a focus or click is being serviced on a nominated
     * set of "exclusions" (options.exclusions, a free hash of elements or jQueries). 
     * If no such event is received within the window, options.handler will be called
     * with the argument "control", to service whatever interaction is required of the
     * blur.
     */
    
    fluid.deadMansBlur = function (control, options) {
        var that = fluid.initLittleComponent(control, options);
        that.blurPending = false;
        $(control).blur(function () {
            that.blurPending = true;
            setTimeout(function () {
                if (that.blurPending) {
                    that.options.handler(control);
                }
            }, that.options.delay);
        });
        that.canceller = function () {
            that.blurPending = false; 
        };
        fluid.each(that.options.exclusions, function(exclusion) {
            var exclusion = $(exclusion);
            exclusion.focusin(that.canceller);
            exclusion.click(that.canceller);
        });
        return that;
    };

    fluid.defaults("fluid.deadMansBlur", {
        delay: 150,
    });
    
})(jQuery, fluid_1_3);
