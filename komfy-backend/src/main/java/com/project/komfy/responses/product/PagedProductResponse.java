package com.project.komfy.responses.product;

import com.project.komfy.models.Product;
import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PagedProductResponse {
    private List<Product> products;
    private int currentPage;
    private int totalPages;
    private long totalElements;
}
