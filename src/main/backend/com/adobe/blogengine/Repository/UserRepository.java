package com.adobe.blogengine.Repository;

import com.adobe.blogengine.Model.BlogUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<BlogUser,String> {
    Optional<BlogUser> findByUsername(String username);
}
