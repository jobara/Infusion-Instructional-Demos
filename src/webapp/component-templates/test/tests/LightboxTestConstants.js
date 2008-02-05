/*
Copyright 2007-2008 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

/**
 * This file contains test constants and setup and teardown functions that are used when testing with the data in the Lightbox.html file.
 */
 
var numOfImages = 14;

// The id of the form for submitting changes to the server.
var REORDER_FORM_ID = "reorder-form";

// The base name of the resource bundle for localized strings.
var MESSAGE_BUNDLE_BASE = "message-bundle:";

// The id of the root node of the lightbox
var lightboxRootId = "gallery:::gallery-thumbs:::";

// The id of the parent of the lightbox
var lightboxParentId = "lightbox-parent";

// The ids of the reorderable items in Lightbox.html
var firstReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:0:";
var secondReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:1:";
var thirdReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:2:";
var fourthReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:3:";
var fifthReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:4:";
var sixthReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:5:";
var seventhReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:6:";
var tenthReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:9:";
var fourthLastReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:10:";
var thirdLastReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:11:";
var secondLastReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:12:";
var lastReorderableId = "gallery:::gallery-thumbs:::lightbox-cell:13:";

var orderableBaseId = "gallery:::gallery-thumbs:::lightbox-cell:";
var selectByDivAndId = "div[id^="+orderableBaseId+"]";

// The ids of the images we test with in Lightbox.html
var firstImageId = "fluid.img.first";
var secondImageId = "fluid.img.second";
var thirdImageId = "fluid.img.3";
var fourthImageId = "fluid.img.4";
var fifthImageId = "fluid.img.5";
var sixthImageId = "fluid.img.6";
var seventhImageId = "fluid.img.7";
var eighthImageId = "fluid.img.8";
var ninthImageId = "fluid.img.9";
var tenthImageId = "fluid.img.10";
var eleventhImageId = "fluid.img.11";
var twelvethImageId = "fluid.img.12";
var secondLastImageId = "fluid.img.secondLast";
var lastImageId = "fluid.img.last";

// CSS class names
var defaultClass="orderable-default";
var selectedClass="orderable-selected";
var draggingClass="orderable-dragging";

// All the test function names for the JsUnit tests that test against the Lightbox.html file.  
// This is needed for running JsUnit in IE and Safari.
// It's a very brittle and annoying way of specifying test names and should be fixed. [FLUID-35]
//
function exposeTestFunctionNames() {
	return [
		// GridLayoutHandlerTests.js
		"testGetItemBelow",
		"testGetItemBelowWrapped",
		"testGetItemAbove",
        "testGetItemAboveWrapped",
		"testGetItemBelowOneRow",
		"testGetItemAboveOneRow",
		
		// LightboxTests.js
		"testHandleArrowKeyPressMoveThumbDown",
		"testHandleArrowKeyPressWrapThumbUp",
		"testHandleArrowKeyPressForUpAndDown",
		"testHandleArrowKeyPressForLeftAndRight",
		"testHandleKeyUpAndHandleKeyDownChangesState",
		"testHandleKeyUpAndHandleKeyDownItemMovement",
		"testHandleArrowKeyPressForCtrlLeftAndCtrlRight",
		"testPersistFocus",
		"testfocusItem",
		"testSelectActiveItemNothingSelected",
		"testSelectActiveItemSecondSelected",
		"testChangeActiveItemToDefaultState",
		"testUpdateActiveDescendent",
		"testKeypressesWithNoOrderables",
		"testUpdateGrabProperty",
		"testAddFocusToElement",
		
		// LightboxPersistenceTets.js
		"testIsOrderChangedCallbackCalled"
	];
}

var imgListClone;

function fetchLightboxRoot () {
    return jQuery("[id=" + lightboxRootId + "]");
}

// This setUp will be called before each of the tests that are included in Lightbox.html 
function setUp() {
    imgListClone = document.getElementById(lightboxRootId).cloneNode(true);
    
    // Force the grid size to three thumbnails wide
    fetchLightboxRoot().addClass ("width-3-thumb");
}

// This tearDown will be called after each of the tests that are included in Lightbox.html 
function tearDown() {
    var fluidLightboxDOMNode = document.getElementById(lightboxRootId);
    var lightboxParent = document.getElementById(lightboxParentId);
    lightboxParent.removeChild(fluidLightboxDOMNode);
    lightboxParent.appendChild(imgListClone);
}

function findOrderableByDivAndId (containerEl) {
    return jQuery (selectByDivAndId, containerEl);
}

function findNoOrderables() {
	return [];
}

function findImgsInLightbox() {
    return jQuery("img", fetchLightboxRoot());
}
    
function createLightbox() {
	var lightboxRoot = fetchLightboxRoot ();
    var layoutHandlerParams = {
        findMovables: findOrderableByDivAndId
    };
    return new fluid.Reorderer (lightboxRoot, {
        layoutHandler: new fluid.GridLayoutHandler (layoutHandlerParams),
        findMovables: findOrderableByDivAndId
    });
}

function createLightboxWithNoOrderables() {
	var lightboxRoot = fetchLightboxRoot ();
    var layoutHandlerParams = {
        findMovables: findNoOrderables
    };
	return new fluid.Reorderer (lightboxRoot, {
        layoutHandler: new fluid.GridLayoutHandler (layoutHandlerParams),
        findMovables: findNoOrderables
    });
}

function createGridLayoutHandler () {
    return new fluid.GridLayoutHandler ({
        findMovables: findOrderableByDivAndId
    });
}

