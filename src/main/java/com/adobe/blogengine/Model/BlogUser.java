package com.adobe.blogengine.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Collection;

@Data
@Entity
@Table(name="users",indexes = @Index(name="username_index",columnList = "username"))
public class BlogUser {
    private static final int min_pwd_length = 8;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "Please enter username")
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    @Size(min = min_pwd_length, message = "Password must be at least " + min_pwd_length + " characters long")
    private String password;

    @OneToMany(mappedBy = "user")
    @Column
    private Collection<Post> posts;


}
