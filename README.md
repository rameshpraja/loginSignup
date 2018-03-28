#Login Signup, After Login view UserProfile, Update user profile built with Angular4, MongoDB and ExpressJS

1. Create Sign in, signup,home page and User profile page
2. make an authentication service for security layer from where user should not open home page without login
3. save user token in local storage	
4. Implement one service like interceptor from where I can pass authentication token to all APIs
5. Sign up the user with following details.
 - first name, last name, surname, mobile, email, profile picture, Address, date of birth
 - all above field is required
 - first name, last name, and surname should be maximum 30 characters
 - email validation
 - date of birth should not greater than the current date

6. Homepage should have header and footer type design
 - header page and footer page should have separate component. so I can use same on another page also.

7. The home page should display login user detail and profile picture. All this detail should fetch through API call.
	

##Steps for Running the Application
 Note : Before run the application, you must have to install node and npm in your system

- This application frontend built in Angular4 and Backend we have used ExpressJS and MongoDB(NoSQL) database
- download the project in your local system
	
- In source code there are two folder 
  1. src : its contain the Angular4 setups for running frontend application
  2. server : it contain the ExpressJS setups for running the backend nodeJS services 

- got to src folder and install npm : 
  - cd src
  - npm install
  - npm start
- open new terminal for running the Node.JS services
- goto the server folder and install npm
  - cd server
  - npm install
  - npm start
