Demo-v2: Web services. Ruby running on server side. Front-end polls data on demand
==================================================================================

Live demo:
http://synoptic-demo-v2.herokuapp.com/

# Technologies:

 * Back-end: http://www.sinatrarb.com/
 * Front-end: Angularjs

# Main Project Goals:

 * To extend the architecture of the project, adding a Back-end that serves the data of the satelite.
 * To test the new architecture/performance of the app, Getting data through web services and updating heavy SVG images.
 * Angular App organized by feature => 'Modular-App'.

# General behaviour: 

 * Periodically the client app polls data from the server. (Server is not mocked anymore)
 * Waits for the server response and updates the SVG image according to this data.
 * The server mocks the connexion with the satelite. (There is not an actual satelite)

# Trello: Find project main activities at:

https://trello.com/b/hN1j5TIl