package com.project.komfy.services.comment;

import com.project.komfy.dtos.CommentDTO;
import com.project.komfy.exceptions.DataNotFoundException;
import com.project.komfy.models.Comment;
import com.project.komfy.responses.comment.CommentResponse;

import java.util.List;

public interface ICommentService {
    Comment insertComment(CommentDTO comment);

    void deleteComment(Long commentId);
    void updateComment(Long id, CommentDTO commentDTO) throws DataNotFoundException;

    List<CommentResponse> getCommentsByUserAndProduct(Long userId, Long productId);
    List<CommentResponse> getCommentsByProduct(Long productId);
}
