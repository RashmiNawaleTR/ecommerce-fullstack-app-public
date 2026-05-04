package com.ecommerce.service;

import com.ecommerce.dto.CartDto;
import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.dto.ProductDto;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.exception.BadRequestException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartDto getCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);

        List<CartDto.CartItemDto> items = cartItems.stream()
                .map(this::toCartItemDto)
                .collect(Collectors.toList());

        BigDecimal subtotal = items.stream()
                .map(CartDto.CartItemDto::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartDto cart = new CartDto();
        cart.setItems(items);
        cart.setSubtotal(subtotal);
        cart.setTotal(subtotal);

        return cart;
    }

    @Transactional
    public CartDto addToCart(Long userId, CartItemRequest request) {
        log.info("Adding product {} to cart for user {}", request.getProductId(), userId);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock available");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CartItem cartItem = cartItemRepository
                .findByUserIdAndProductId(userId, request.getProductId())
                .orElse(new CartItem());

        if (cartItem.getId() == null) {
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
        } else {
            int newQuantity = cartItem.getQuantity() + request.getQuantity();
            if (product.getStock() < newQuantity) {
                throw new BadRequestException("Insufficient stock available");
            }
            cartItem.setQuantity(newQuantity);
        }

        cartItemRepository.save(cartItem);
        log.info("Cart item saved for user {}", userId);

        return getCart(userId);
    }

    @Transactional
    public CartDto updateCartItem(Long userId, Long productId, Integer quantity) {
        log.info("Updating cart item for user {}, product {}", userId, productId);

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        Product product = cartItem.getProduct();
        if (product.getStock() < quantity) {
            throw new BadRequestException("Insufficient stock available");
        }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        return getCart(userId);
    }

    @Transactional
    public CartDto removeFromCart(Long userId, Long productId) {
        log.info("Removing product {} from cart for user {}", productId, userId);

        cartItemRepository.deleteByUserIdAndProductId(userId, productId);

        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        log.info("Clearing cart for user {}", userId);
        cartItemRepository.deleteByUserId(userId);
    }

    private CartDto.CartItemDto toCartItemDto(CartItem cartItem) {
        CartDto.CartItemDto dto = new CartDto.CartItemDto();
        dto.setId(cartItem.getId());
        dto.setProduct(ProductDto.fromEntity(cartItem.getProduct()));
        dto.setQuantity(cartItem.getQuantity());
        dto.setItemTotal(cartItem.getProduct().getPrice()
                .multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        return dto;
    }
}
