event-delegate
==============

Create a large number of buttons that open a popup window without adding an event listener to each button (not performant). Instead, the event listening is on the container form of the many buttons and the click event will bubble up from any of the buttons to the form where it gets handled.
