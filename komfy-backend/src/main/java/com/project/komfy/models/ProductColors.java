package com.project.komfy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_colors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductColors {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "product_id") // Khóa ngoại liên kết với cột "product_id" của bảng "products"
    private Product product;

    private String color;
}
