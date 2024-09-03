package com.project.komfy.services.orders;

import com.project.komfy.dtos.OrderDTO;
import com.project.komfy.exceptions.DataNotFoundException;
import com.project.komfy.models.Order;
import com.project.komfy.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO, User user) throws Exception;
    Order getOrder(Long id);
//    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    void deleteOrder(Long id);
    List<Order> findByUserId(Long userId);
    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);
}
