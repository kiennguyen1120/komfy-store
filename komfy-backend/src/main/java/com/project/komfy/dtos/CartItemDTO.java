package com.project.komfy.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartItemDTO {

    @JsonProperty("productID")
    private Long productId;

    @JsonProperty("amount")
    private Integer amount;


}
