package com.project.komfy.services.coupon;

public interface ICouponService {
    double calculateCouponValue(String couponCode, double totalAmount);
}
