/*jslint browser: true */

// Closure to prevent any name collision.
(function (window) {
    'use strict';

    // Namespace, to keep things tidy.
    var sampleCode = {};

    // Format a number into a string if leading zeros.
    sampleCode.zeroPad = function (num, numZeros) {
        var n, zeros, zeroString;

        n = Math.abs(num);
        zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
        zeroString = Math.pow(10, zeros).toString().substr(1);

        if (num < 0) {
            zeroString = '-' + zeroString;
        }

        return zeroString + n;
    };

    // Popup a window.
    sampleCode.popupWindow = function (parameters) {
        var leftPosition, topPosition;

        // Allow for borders.
        leftPosition = (window.screen.width / 2) - ((parameters.width / 2) + 10);

        // Allow for title and status bars.
        topPosition = (window.screen.height / 2) - ((parameters.height / 2) + 50);

        // Open the window.
        window.open(parameters.url, parameters.id, 'status=no,height=' + parameters.height + ',width=' + parameters.width + ',resizable=yes,left=' + leftPosition + ',top=' + topPosition + ',screenX=' + leftPosition + ',screenY=' + topPosition + ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no');
    };

    // Listen to an event on a container parent of possibly many children.
    sampleCode.attachListener = function (parameters) {
        var element, listenTo;

        // Json parameters.
        element = parameters.element;
        listenTo = parameters.listenTo;

        // Listens to a given event 'listenTo' on a given 'element'.
        element.addEventListener(listenTo, function (e) {
            var event, target;

            // Cross-browser event and target.
            event = e || window.event;
            target = e.target || e.srcElement;

            // Stop the event bubbling further.
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }

            // Popup
            sampleCode.popupWindow({
                url: 'http://pool.looky.hyves.org/pool/lib/13920_2nd.jpg',
                width: 600,
                height: 380,
                id: target.id
            });
        });
    };

    // Create a large number of form elements.
    sampleCode.setupForm = (function () {
        var form, input, index;

        // Create form and append it to the body.
        form = document.createElement('form');
        form.id = 'ManyInputsForm';
        document.getElementsByTagName('body')[0].appendChild(form);

        // Create input and append them to the body.
        for (index = 0; index < 1000; index = index + 1) {
            input = document.createElement('input');
            input.setAttribute('type', 'button');
            input.id = 'input' + index;
            input.value = sampleCode.zeroPad(index, 3);
            form.appendChild(input);
        }

        // Attach the event listening to the parent form, not the input buttons.
        // The event will bubble up from any of the many buttons to the container form.
        sampleCode.attachListener({
            element: document.getElementById('ManyInputsForm'),
            listenTo: 'click'
        });
    }()); // () executes this function automatically when script is loaded.

}(window));