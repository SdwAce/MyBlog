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
- Go to your project root folder from your terminal
- Run: `.\mvnw spring-boot:run`
- if you got any error, please clean, install and rerun the maven
- <img src="/images/backend-run.jpg" width="90%"></img>

### Frontend
- Go to your project folder from your terminal
- change to src/main/frontend
- Run: `npm install`
- After install, run: `npm run start`
- It will open your browser(http://localhost:3000)
-  <img src="/images/frontend-run.jpg" width="90%"></img>

### Database
-The database is maintained in the AWS RDS cloud, I will keep the service open so you should be fine with it.



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


## Credits (The sources I lend help from)
-  https://www.bezkoder.com/react-jwt-auth/#Register_Page (help me implement spring security and build react validation forms)
-  https://www.toptal.com/spring/spring-security-tutorial
-  https://academind.com/tutorials/reactjs-pagination (help me implement pagination)
-  https://react-bootstrap.github.io/components/alerts(the official website of react-bootstrap)
-  https://github.com/SaiUpadhyayula/spring-ng-blog (borrow some structure design of the backend code)
-  https://www.readingteen.net/wp-content/uploads/2020/07/blog.jpg (blog image on the personal blog page)
-  https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).webp   (background image of the whole application)






