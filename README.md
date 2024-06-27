To run the backend after installing all the dependencies :

1) Naavigate to .\TaskManager\backend
2) perform "node server.js" or  "nodemon server.js" in cmd

3) To add a task, use a tool like thunder client or postman
   using POST localhost:4000/tasks
   ![image](https://github.com/Jayurp/TaskManager/assets/88538315/3f22769c-5611-4876-906c-22263e531659)

5) To fetch all the data, 
   using GET localhost:4000/tasks
   ![image](https://github.com/Jayurp/TaskManager/assets/88538315/21b7a007-f57d-4e39-b159-bf18b67c786c)

6) To fetch using id as parameter
   using GET localhost:4000/tasks/667c29cf75811fabd6de90b6
   ![image](https://github.com/Jayurp/TaskManager/assets/88538315/80ad02cd-b0d8-41e8-a761-efa64a3b4661)

7) To update using id as parameter
   usng PUT localhost:4000/tasks/667bc438e596f79fe21dbc90
   ![image](https://github.com/Jayurp/TaskManager/assets/88538315/d1d372a2-e1c9-4ea8-90a0-66149331d95a)

8) To delete a task using id as parameter
   using DELETE localhost:4000/tasks/667bd88b420643abda21ad18
   ![image](https://github.com/Jayurp/TaskManager/assets/88538315/292452e1-accf-4e46-87fc-7d40a7ab6d0b)


TO run the frontend 

1) Naviagte to .\TaskManager
2) execute "npm start" in cmd 
