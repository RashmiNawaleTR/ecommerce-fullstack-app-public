package com.ecommerce.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartDto {
    private List<CartItemDto> items;
    private BigDecimal subtotal;
    private BigDecimal total;

    @Data
    public static class CartItemDto {
        private Long id;
        private ProductDto product;
        private Integer quantity;
        private BigDecimal itemTotal;
    }
}
