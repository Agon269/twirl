
# Twirl

A website that lets coders share their coding problems and other coders can help solve with detailed video explanation.

## Demo

[Live](https://twirl-845f4.web.app/)

  
## Screenshots

![App Screenshot](https://res.cloudinary.com/dvfihlcxd/image/upload/v1628425364/screencapture-twirl-845f4-web-app-2021-08-08-20_20_57_wje2mf.png)

  
![Logo](https://fontmeme.com/permalink/210622/444e2d24ffeace5b4e7270a711a82848.png)

    
## Features


- Users can share their coding problems with others
- Other users can help solve the problem with video
- Users can comment if solution is helpful or not
- Light/dark mode toggle

  
## Tech Stack

**Client:** React, Redux, Chakra-UI

**Server:** Node, Express, Firebase, MongoDB

  
## Installation

Clone repository

Create a firebase project
Get api keys and replace the keys in the firebase file

```
const app = firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxx",
  storageBucket: "xxxxxxxxxx",
  messagingSenderId: "xxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxx",
});

```
client directory

```cmd
  npm install 
  npm start
```
same for backend directory
```cmd
  npm install 
  npm start
```
