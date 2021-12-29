package com.adobe.blogengine.Repository;

import com.adobe.blogengine.Model.Comment;
import com.adobe.blogengine.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    Optional<Collection<Comment>> findAllByPostId(String postId);
}
