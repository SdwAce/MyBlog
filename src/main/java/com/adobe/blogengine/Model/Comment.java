package com.adobe.blogengine.Model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;

    @Column(columnDefinition = "TEXT", nullable = false)
    @NotEmpty(message = "Comment cannot be empty!")
    private String body;

    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private BlogUser author;

    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private Post post;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "create_date", updatable = false, nullable = false)
    private Date createDate;


}
