package com.project.komfy.responses.coupon;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.komfy.models.Comment;
import com.project.komfy.responses.user.UserResponse;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponCalculationResponse {
    @JsonProperty("result")
    private Double result;
}
