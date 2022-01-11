package com.adobe.blogengine.Config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;


@Configuration
public class RDSConfig {
    private static final String instance = "myblog-instance.crmpg9f2oru7.us-east-1.rds.amazonaws.com";
    private static final String port = "3306";
    private static final String db_name = "myblog";
    private static final String user_name = "admin";
    private static final String password = "admin123";
    public static final String URL = "jdbc:mysql://" + instance + ":" +port + "/" + db_name + "?" +
            "user=" + user_name + "&" + "password=" + password;

    @Bean
    public DataSource getDataSource(){
        //create connection pool to solve the issue of multi-threading and close issue for singleton
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(URL);
        config.setMinimumIdle(1);
        config.setMaximumPoolSize(5);
        DataSource dataSource = new HikariDataSource(config);
        config.setIdleTimeout(30000);
        return dataSource;
    }

    @Bean
    public PasswordEncoder bcryptEncoder() {
        return new BCryptPasswordEncoder();
    }
}