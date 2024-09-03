package com.project.komfy.services.user;

import com.project.komfy.dtos.UpdateUserDTO;
import com.project.komfy.dtos.UserDTO;
import com.project.komfy.exceptions.DataNotFoundException;
import com.project.komfy.exceptions.InvalidPasswordException;
import com.project.komfy.models.Order;
import com.project.komfy.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String username, String password) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
    Page<User> findAll(String keyword, Pageable pageable) throws Exception;
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    public void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
}
