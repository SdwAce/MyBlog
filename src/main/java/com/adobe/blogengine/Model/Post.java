package com.adobe.blogengine.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;

@Data
@Entity
@Table(name = "posts")

public class Post {

    private static final int min_len = 5;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;

    @Column(nullable = false)
    @Size(min = min_len, message = "Title must be at least " + min_len + " characters long")
    @NotEmpty(message = "Please enter the title")
    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String body;

    @NotNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private BlogUser user;

    @Column
    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private Collection<Comment> comments;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", updatable = false,nullable = false)
    private Date createDate;

}
