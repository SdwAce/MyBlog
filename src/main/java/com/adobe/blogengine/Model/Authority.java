package com.adobe.blogengine.Model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;

//@Data
//@Entity
//@Table(name = "authorities")
//@SequenceGenerator(name = "auth_seq_gen", sequenceName = "auth_seq", initialValue = 10, allocationSize = 1)
//public class Authority implements GrantedAuthority {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq_gen")
//    @Column(name = "id")
//    private String id;
//
//    @Column(name = "authority", unique = true, nullable = false)
//    private String authority;
//
//    @ManyToMany(mappedBy = "authorities", cascade = CascadeType.ALL)
//    private Collection<User> users;
//
//    @Override
//    public String toString() {
//        return "Authority{" +
//                "id=" + id +
//                ", authority='" + authority + '\'' +
////                ", users=" + users +
//                '}';
//    }
//}
