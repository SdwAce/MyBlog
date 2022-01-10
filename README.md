# MyBlog
Spring boot and React based blog engine.

### Technology Stack
Component         | Technology
---               | ---
Frontend          | React 17.0.2
Backend           | Spring Boot 2.6.2, Java 11+
Security          | Spring Security, JWT
Database          | Mysql built on AWS RDS
Persistence       | Spring Data JPA 
Client Build      | npm, webpack
Server Build      | Maven

### Prerequisites
-  Install Java 11+ (I used Java17)
-  Install Node.js from the Node.js website
-  Clone the repo `git clone https://github.com/SdwAce/MyBlog.git`


### Backend
- Go to your project folder from your terminal
- Run: `mvnw spring-boot:run`

### Frontend
- Go to your project folder from your terminal
- change to src/main/frontend
- Run: `npm install`
- After install, run: `npm run start`
- It will open your browser(http://localhost:3000)



## Screenshots

### Home (you can view all public posts but cannot comment before login, to read full text of a blog, click on it)
<img src="/images/home.jpg" width="90%"></img>

### Login
<img src="/images/login.jpg" width="90%"></img>

### Personal blog space after login (you can view public posts (include post by other users), your personal posts, and add a post)
<img src="/images/personal.jpg" width="90%"></img>

### Add a post
<img src="/images/addnewpost.jpg" width="90%"></img>

### Single post view, where you can view and add comments
<img src="/images/singlepostview.jpg" width="90%"></img>





