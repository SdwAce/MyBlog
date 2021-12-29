package com.adobe.blogengine.Repository;

import com.adobe.blogengine.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Collection;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    Optional<Post> findById(String id);
    Optional<Collection<Post>> findAllByOrderByCreateDateDesc();
}
