package com.ecommerce.service;

import com.ecommerce.dto.PageResponse;
import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.ProductRequest;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final FileUploadUtil fileUploadUtil;

    public PageResponse<ProductDto> getAllProducts(int page, int limit, String category, String search, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page - 1, limit, sort);
        Page<Product> productPage;

        if (search != null && !search.isEmpty()) {
            productPage = productRepository.searchProducts(search, pageable);
        } else if (category != null && !category.isEmpty()) {
            productPage = productRepository.findByCategoryAndDeletedAtIsNull(category, pageable);
        } else {
            productPage = productRepository.findByDeletedAtIsNull(pageable);
        }

        return new PageResponse<>(
                productPage.getContent().stream().map(ProductDto::fromEntity).toList(),
                productPage.getTotalElements(),
                page,
                limit,
                productPage.getTotalPages()
        );
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getDeletedAt() != null) {
            throw new ResourceNotFoundException("Product not found");
        }

        return ProductDto.fromEntity(product);
    }

    @Transactional
    public ProductDto createProduct(ProductRequest request, MultipartFile image) {
        log.info("Creating product: {}", request.getName());

        Product product = new Product();
        product.setName(sanitizeHtml(request.getName()));
        product.setDescription(sanitizeHtml(request.getDescription()));
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileUploadUtil.uploadFile(image, "products");
            product.setImageUrl(imageUrl);
        }

        product = productRepository.save(product);
        log.info("Product created: {}", product.getId());

        return ProductDto.fromEntity(product);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductRequest request, MultipartFile image) {
        log.info("Updating product: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setName(sanitizeHtml(request.getName()));
        product.setDescription(sanitizeHtml(request.getDescription()));
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileUploadUtil.uploadFile(image, "products");
            product.setImageUrl(imageUrl);
        }

        product = productRepository.save(product);
        log.info("Product updated: {}", product.getId());

        return ProductDto.fromEntity(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        log.info("Deleting product: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setDeletedAt(LocalDateTime.now());
        productRepository.save(product);

        log.info("Product soft deleted: {}", id);
    }

    private String sanitizeHtml(String input) {
        if (input == null) return null;
        return Jsoup.clean(input, Safelist.basic());
    }
}
