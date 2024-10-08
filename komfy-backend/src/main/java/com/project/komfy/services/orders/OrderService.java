package com.project.komfy.services.orders;

import com.project.komfy.dtos.CartItemDTO;
import com.project.komfy.dtos.OrderDTO;
import com.project.komfy.dtos.OrderDetailDTO;
import com.project.komfy.dtos.OrderWithDetailsDTO;
import com.project.komfy.exceptions.DataNotFoundException;
import com.project.komfy.models.*;
import com.project.komfy.repositories.OrderDetailRepository;
import com.project.komfy.repositories.OrderRepository;
import com.project.komfy.repositories.ProductRepository;
import com.project.komfy.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public Order createOrder(OrderDTO orderDTO, User user) throws DataNotFoundException {
        // Tạo một luồng bảng ánh xạ riêng để kiểm soát việc ánh xạ
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true); // Bỏ qua các trường null khi mapping

        // Cấu hình ánh xạ tùy chỉnh nếu cần
        modelMapper.typeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));

        // Tạo đối tượng Order từ OrderDTO
        Order order = modelMapper.map(orderDTO, Order.class);

        // Thiết lập các thuộc tính khác của đơn hàng
        order.setUser(user);
        order.setOrderDate(LocalDate.now()); // Lấy thời điểm hiện tại
        order.setStatus(OrderStatus.PENDING);

        // Kiểm tra shipping date phải >= ngày hôm nay
        LocalDate shippingDate = orderDTO.getShippingDate() != null ? orderDTO.getShippingDate() : LocalDate.now();
        if (shippingDate.isBefore(LocalDate.now())) {
            throw new DataNotFoundException("Date must be at least today!");
        }
        order.setShippingDate(shippingDate);
        order.setActive(true); // Đoạn này nên set sẵn trong SQL

        // Lưu đơn hàng vào cơ sở dữ liệu để có id
        order = orderRepository.save(order);

        // Tạo danh sách các đối tượng OrderDetail từ cartItems
        Order finalOrder = order;
        List<OrderDetail> orderDetails = orderDTO.getCartItems().stream()
                .map(cartItemDTO -> {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(finalOrder);

                    // Tìm thông tin sản phẩm từ cơ sở dữ liệu (hoặc sử dụng cache nếu cần)
                    Product product = null;
                    try {
                        product = productRepository.findById(cartItemDTO.getProductId())
                                .orElseThrow(() -> new DataNotFoundException("Product not found with id: " + cartItemDTO.getProductId()));
                    } catch (DataNotFoundException e) {
                        throw new RuntimeException(e);
                    }

                    // Đặt thông tin cho OrderDetail
                    orderDetail.setProduct(product);
                    orderDetail.setNumberOfProducts(cartItemDTO.getAmount());
                    orderDetail.setPrice(product.getPrice());

                    return orderDetail;
                })
                .collect(Collectors.toList());

        // Lưu danh sách OrderDetail vào cơ sở dữ liệu
        orderDetailRepository.saveAll(orderDetails);

        return order;
    }
    @Transactional
    public Order updateOrderWithDetails(OrderWithDetailsDTO orderWithDetailsDTO) {
        modelMapper.typeMap(OrderWithDetailsDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));
        Order order = new Order();
        modelMapper.map(orderWithDetailsDTO, order);
        Order savedOrder = orderRepository.save(order);

        // Set the order for each order detail
        for (OrderDetailDTO orderDetailDTO : orderWithDetailsDTO.getOrderDetailDTOS()) {
            //orderDetail.setOrder(OrderDetail);
        }

        // Save or update the order details
        List<OrderDetail> savedOrderDetails = orderDetailRepository.saveAll(order.getOrderDetails());

        // Set the updated order details for the order
        savedOrder.setOrderDetails(savedOrderDetails);

        return savedOrder;
    }
    @Override
    public Order getOrder(Long id) {
        Order selectedOrder = orderRepository.findById(id).orElse(null);
        return selectedOrder;
    }

//    @Override
//    @Transactional
//    public Order updateOrder(Long id, OrderDTO orderDTO)
//            throws DataNotFoundException {
//        Order order = orderRepository.findById(id).orElseThrow(() ->
//                new DataNotFoundException("Cannot find order with id: " + id));
//        User existingUser = userRepository.findById(
//                orderDTO.getUserId()).orElseThrow(() ->
//                new DataNotFoundException("Cannot find user with id: " + id));
//        // Tạo một luồng bảng ánh xạ riêng để kiểm soát việc ánh xạ
//        modelMapper.typeMap(OrderDTO.class, Order.class)
//                .addMappings(mapper -> mapper.skip(Order::setId));
//        // Cập nhật các trường của đơn hàng từ orderDTO
//        modelMapper.map(orderDTO, order);
//        order.setUser(existingUser);
//        return orderRepository.save(order);
//    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        //no hard-delete, => please soft-delete
        if(order != null) {
            order.setActive(false);
            orderRepository.save(order);
        }
    }
    @Override
    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Page<Order> getOrdersByKeyword(String keyword, Pageable pageable) {
        return orderRepository.findByKeyword(keyword, pageable);
    }
}
