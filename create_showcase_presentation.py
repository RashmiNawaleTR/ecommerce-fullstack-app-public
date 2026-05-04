#!/usr/bin/env python3
"""
Create E-Commerce Application Showcase Presentation
"""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def add_title_slide(prs):
    """Title slide"""
    slide = prs.slides.add_slide(prs.slide_layouts[0])

    title = slide.shapes.title
    subtitle = slide.placeholders[1]

    title.text = "E-Commerce Platform"
    subtitle.text = "Full-Stack Web Application\nAngular + Spring Boot + PostgreSQL"

    # Style title
    title.text_frame.paragraphs[0].font.size = Pt(54)
    title.text_frame.paragraphs[0].font.bold = True
    title.text_frame.paragraphs[0].font.color.rgb = RGBColor(63, 81, 181)

    # Style subtitle
    for paragraph in subtitle.text_frame.paragraphs:
        paragraph.font.size = Pt(24)
        paragraph.font.color.rgb = RGBColor(96, 96, 96)
        paragraph.alignment = PP_ALIGN.CENTER

def add_tech_stack_slide(prs):
    """Comprehensive tech stack overview"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])  # Blank

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.4), Inches(9), Inches(0.7))
    title_frame = title_box.text_frame
    title_frame.text = "Technology Stack"
    p = title_frame.paragraphs[0]
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = RGBColor(63, 81, 181)
    p.alignment = PP_ALIGN.CENTER

    # Three columns with backgrounds
    col_width = Inches(2.9)
    col_height = Inches(5.2)
    start_y = Inches(1.3)

    # Frontend column with background
    frontend_bg = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.4), start_y, col_width, col_height
    )
    frontend_bg.fill.solid()
    frontend_bg.fill.fore_color.rgb = RGBColor(227, 242, 253)
    frontend_bg.line.color.rgb = RGBColor(33, 150, 243)
    frontend_bg.line.width = Pt(2)

    frontend_text = slide.shapes.add_textbox(Inches(0.5), start_y + Inches(0.1), col_width - Inches(0.2), col_height - Inches(0.2))
    tf = frontend_text.text_frame
    tf.word_wrap = True
    tf.text = """FRONTEND
━━━━━━━━━━━━

• Angular 17.3
• TypeScript 5.4
• Angular Material
• RxJS 7.8
• Reactive Forms
• Angular Router

Features:
✓ Component architecture
✓ Type safety
✓ Material Design UI
✓ Responsive layout
✓ Real-time updates
✓ Form validation"""

    for i, p in enumerate(tf.paragraphs):
        if i == 0:
            p.font.size = Pt(20)
            p.font.bold = True
            p.font.color.rgb = RGBColor(13, 71, 161)
        else:
            p.font.size = Pt(12)
            p.space_before = Pt(2)

    # Backend column
    backend_bg = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(3.55), start_y, col_width, col_height
    )
    backend_bg.fill.solid()
    backend_bg.fill.fore_color.rgb = RGBColor(232, 245, 233)
    backend_bg.line.color.rgb = RGBColor(76, 175, 80)
    backend_bg.line.width = Pt(2)

    backend_text = slide.shapes.add_textbox(Inches(3.65), start_y + Inches(0.1), col_width - Inches(0.2), col_height - Inches(0.2))
    tf = backend_text.text_frame
    tf.word_wrap = True
    tf.text = """BACKEND
━━━━━━━━━━━━

• Spring Boot 3.2.4
• Java 17
• Spring Security
• Spring Data JPA
• JWT Authentication
• Maven Build

Security:
✓ JWT tokens
✓ BCrypt hashing
✓ Rate limiting
✓ XSS protection
✓ SQL injection prevention
✓ CORS configuration"""

    for i, p in enumerate(tf.paragraphs):
        if i == 0:
            p.font.size = Pt(20)
            p.font.bold = True
            p.font.color.rgb = RGBColor(27, 94, 32)
        else:
            p.font.size = Pt(12)
            p.space_before = Pt(2)

    # Database column
    database_bg = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(6.7), start_y, col_width, col_height
    )
    database_bg.fill.solid()
    database_bg.fill.fore_color.rgb = RGBColor(255, 243, 224)
    database_bg.line.color.rgb = RGBColor(255, 152, 0)
    database_bg.line.width = Pt(2)

    database_text = slide.shapes.add_textbox(Inches(6.8), start_y + Inches(0.1), col_width - Inches(0.2), col_height - Inches(0.2))
    tf = database_text.text_frame
    tf.word_wrap = True
    tf.text = """DATABASE
━━━━━━━━━━━━

• PostgreSQL
• JPA/Hibernate
• Parameterized queries
• Connection pooling
• Transaction mgmt

Architecture:
✓ RESTful API
✓ Layered design
✓ DTO pattern
✓ Service layer
✓ Repository pattern

Environment:
• localhost:4200 (UI)
• localhost:8080 (API)"""

    for i, p in enumerate(tf.paragraphs):
        if i == 0:
            p.font.size = Pt(20)
            p.font.bold = True
            p.font.color.rgb = RGBColor(230, 81, 0)
        else:
            p.font.size = Pt(12)
            p.space_before = Pt(2)

    # Footer
    footer = slide.shapes.add_textbox(Inches(0.5), Inches(6.8), Inches(9), Inches(0.5))
    tf = footer.text_frame
    tf.text = "🛡️ Security-First Development  •  Full-Stack Integration  •  Production-Ready"
    p = tf.paragraphs[0]
    p.font.size = Pt(14)
    p.font.bold = True
    p.alignment = PP_ALIGN.CENTER
    p.font.color.rgb = RGBColor(66, 66, 66)

def add_products_page_slide(prs):
    """Products page screenshot slide"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])

    # Title
    title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.6))
    tf = title.text_frame
    tf.text = "Product Catalog - Frontend Implementation"
    p = tf.paragraphs[0]
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = RGBColor(63, 81, 181)
    p.alignment = PP_ALIGN.CENTER

    # Tech stack badge
    tech_badge = slide.shapes.add_textbox(Inches(0.5), Inches(0.95), Inches(9), Inches(0.3))
    tf = tech_badge.text_frame
    tf.text = "💻 Angular 17 + Material Design + TypeScript"
    p = tf.paragraphs[0]
    p.font.size = Pt(16)
    p.font.italic = True
    p.font.color.rgb = RGBColor(76, 175, 80)
    p.alignment = PP_ALIGN.CENTER

    # Screenshot placeholder with border
    screenshot_area = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.8), Inches(1.4), Inches(8.4), Inches(3.8)
    )
    screenshot_area.fill.solid()
    screenshot_area.fill.fore_color.rgb = RGBColor(245, 245, 245)
    screenshot_area.line.color.rgb = RGBColor(63, 81, 181)
    screenshot_area.line.width = Pt(3)

    # Placeholder text
    placeholder = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(1.2))
    tf = placeholder.text_frame
    tf.text = "📸 INSERT SCREENSHOT HERE\n\nProducts Page (localhost:4200/products)\nShowing: Wireless Headphones, T-Shirt, Water Bottle"
    tf.paragraphs[0].font.size = Pt(24)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(158, 158, 158)
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(14)
        p.font.color.rgb = RGBColor(117, 117, 117)
        p.alignment = PP_ALIGN.CENTER

    # Features section
    features_box = slide.shapes.add_textbox(Inches(0.5), Inches(5.4), Inches(9), Inches(1.8))
    tf = features_box.text_frame
    tf.word_wrap = True
    tf.text = """✨ Key Features Implemented

• Product Grid Layout - Responsive 3-column design using Angular Material cards
• Search Functionality - Real-time product filtering with search bar
• Product Cards - Image, title, price, description, and stock count display
• Action Buttons - "View Details" (routing) and "Add to Cart" (state management)
• Stock Management - Live stock count display (e.g., "Stock: 45")
• Pricing Display - Formatted currency display ($89.99, $24.99, $34.99)"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(63, 81, 181)
    tf.paragraphs[0].space_after = Pt(8)

    for p in tf.paragraphs[2:]:
        p.font.size = Pt(13)
        p.space_before = Pt(3)

def add_technical_details_slide(prs):
    """Technical implementation details"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])

    # Title
    title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.5))
    tf = title.text_frame
    tf.text = "Technical Implementation Details"
    p = tf.paragraphs[0]
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = RGBColor(63, 81, 181)
    p.alignment = PP_ALIGN.CENTER

    # Frontend section
    frontend_section = slide.shapes.add_textbox(Inches(0.5), Inches(1.1), Inches(4.4), Inches(2.8))
    tf = frontend_section.text_frame
    tf.word_wrap = True
    tf.text = """FRONTEND ARCHITECTURE

Component Structure:
• ProductListComponent
• ProductCardComponent
• SearchBarComponent
• CartComponent

Services:
• ProductService (API calls)
• CartService (state management)
• AuthService (JWT handling)

Routing:
• /products - Product listing
• /products/:id - Product details
• /cart - Shopping cart
• /auth/login - Authentication"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(33, 150, 243)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(12)
        p.space_before = Pt(2)

    # Backend section
    backend_section = slide.shapes.add_textbox(Inches(5.1), Inches(1.1), Inches(4.4), Inches(2.8))
    tf = backend_section.text_frame
    tf.word_wrap = True
    tf.text = """BACKEND ARCHITECTURE

REST API Endpoints:
• GET /api/products
• GET /api/products/{id}
• POST /api/cart/add
• GET /api/cart
• POST /api/auth/login

Security Features:
• JWT authentication
• BCrypt password hashing
• Request rate limiting
• Input validation
• XSS sanitization

Database Tables:
• users, products, cart_items
• orders, categories"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(76, 175, 80)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(12)
        p.space_before = Pt(2)

    # Security section
    security_section = slide.shapes.add_textbox(Inches(0.5), Inches(4.1), Inches(9), Inches(2.5))
    tf = security_section.text_frame
    tf.word_wrap = True
    tf.text = """🛡️ SECURITY IMPLEMENTATION

Authentication & Authorization:
• JWT-based authentication with secure token storage
• Role-based access control (USER, ADMIN)
• Protected API endpoints with Spring Security
• Automatic token refresh mechanism

Input Validation & Sanitization:
• Server-side validation using Bean Validation (@Valid, @NotNull)
• HTML sanitization with Jsoup to prevent XSS attacks
• Parameterized SQL queries to prevent SQL injection
• Client-side validation for better UX

Rate Limiting & Protection:
• Bucket4j for API rate limiting (prevent DDoS)
• CORS configuration for cross-origin security
• Secure password storage with BCrypt (cost factor 12)
• Security headers (CSRF protection, X-Frame-Options)"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(211, 47, 47)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(12)
        p.space_before = Pt(3)

def add_product_details_slide(prs):
    """Product details implementation"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])

    title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.5))
    tf = title.text_frame
    tf.text = "Product Catalog - Items Displayed"
    p = tf.paragraphs[0]
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = RGBColor(63, 81, 181)
    p.alignment = PP_ALIGN.CENTER

    # Product 1
    product1 = slide.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(9), Inches(1.5))
    tf = product1.text_frame
    tf.word_wrap = True
    tf.text = """🎧 Wireless Bluetooth Headphones - $89.99

Premium noise-cancelling headphones with 30-hour battery life. Crystal clear sound quality with deep bass and comfortable over-ear design. Perfect for music lovers and professionals.

Stock: 45  |  Category: Electronics"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(33, 150, 243)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(13)

    # Product 2
    product2 = slide.shapes.add_textbox(Inches(0.5), Inches(2.9), Inches(9), Inches(1.5))
    tf = product2.text_frame
    tf.word_wrap = True
    tf.text = """👕 Organic Cotton T-Shirt - $24.99

Soft, breathable 100% organic cotton t-shirt. Available in multiple colors. Perfect for everyday wear with a classic fit. Eco-friendly and sustainably sourced.

Stock: 120  |  Category: Clothing"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(76, 175, 80)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(13)

    # Product 3
    product3 = slide.shapes.add_textbox(Inches(0.5), Inches(4.6), Inches(9), Inches(1.5))
    tf = product3.text_frame
    tf.word_wrap = True
    tf.text = """💧 Stainless Steel Water Bottle - $34.99

Double-wall insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design with 32oz capacity. Perfect for gym, travel, or daily use.

Stock: 78  |  Category: Home & Kitchen"""

    tf.paragraphs[0].font.size = Pt(18)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(255, 152, 0)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(13)

    # Data flow note
    dataflow = slide.shapes.add_textbox(Inches(0.5), Inches(6.3), Inches(9), Inches(1))
    tf = dataflow.text_frame
    tf.word_wrap = True
    tf.text = """📊 Data Flow: PostgreSQL Database → Spring Boot REST API → Angular Frontend

Products are fetched via GET /api/products endpoint, processed by ProductService, and rendered using Angular Material cards with responsive grid layout."""

    tf.paragraphs[0].font.size = Pt(13)
    tf.paragraphs[0].font.italic = True
    tf.paragraphs[0].font.color.rgb = RGBColor(96, 96, 96)

def add_features_summary_slide(prs):
    """Features summary"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])

    title = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.6))
    tf = title.text_frame
    tf.text = "Application Features & Capabilities"
    p = tf.paragraphs[0]
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = RGBColor(63, 81, 181)
    p.alignment = PP_ALIGN.CENTER

    # Left column - User features
    left_col = slide.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(4.4), Inches(5.5))
    tf = left_col.text_frame
    tf.word_wrap = True
    tf.text = """USER FEATURES

🛒 Shopping Experience:
• Browse product catalog
• Search products
• View product details
• Add items to cart
• Update quantities
• Remove items
• Checkout process

👤 Account Management:
• User registration
• Secure login/logout
• JWT authentication
• Session management

📱 User Interface:
• Responsive design
• Material Design
• Mobile-friendly
• Intuitive navigation
• Real-time updates"""

    tf.paragraphs[0].font.size = Pt(20)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(33, 150, 243)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(13)
        p.space_before = Pt(3)

    # Right column - Technical features
    right_col = slide.shapes.add_textbox(Inches(5.1), Inches(1.2), Inches(4.4), Inches(5.5))
    tf = right_col.text_frame
    tf.word_wrap = True
    tf.text = """TECHNICAL FEATURES

🔒 Security:
• JWT authentication
• Password encryption
• XSS protection
• SQL injection prevention
• Rate limiting
• CORS configuration

⚡ Performance:
• Lazy loading
• Caching strategies
• Optimized queries
• Connection pooling

🏗️ Architecture:
• RESTful API design
• Layered architecture
• Service pattern
• Repository pattern
• DTO mapping

🧪 Quality:
• Input validation
• Error handling
• Logging
• Transaction management"""

    tf.paragraphs[0].font.size = Pt(20)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(76, 175, 80)
    for p in tf.paragraphs[1:]:
        p.font.size = Pt(13)
        p.space_before = Pt(3)

def add_closing_slide(prs):
    """Closing slide"""
    slide = prs.slides.add_slide(prs.slide_layouts[5])

    # Main message
    message = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(2))
    tf = message.text_frame
    tf.text = "E-Commerce Platform\nFull-Stack Application"
    tf.paragraphs[0].font.size = Pt(48)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = RGBColor(63, 81, 181)
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER
    tf.paragraphs[1].font.size = Pt(32)
    tf.paragraphs[1].font.color.rgb = RGBColor(96, 96, 96)
    tf.paragraphs[1].alignment = PP_ALIGN.CENTER

    # Tech summary
    tech_summary = slide.shapes.add_textbox(Inches(2), Inches(4.8), Inches(6), Inches(1.5))
    tf = tech_summary.text_frame
    tf.text = """Angular 17  •  Spring Boot 3.2  •  PostgreSQL
TypeScript  •  Java 17  •  Material Design
Security-First  •  Production-Ready"""
    for p in tf.paragraphs:
        p.font.size = Pt(16)
        p.font.color.rgb = RGBColor(76, 175, 80)
        p.alignment = PP_ALIGN.CENTER
        p.space_before = Pt(4)

def main():
    print("\n" + "="*80)
    print("CREATING E-COMMERCE PLATFORM PRESENTATION")
    print("="*80 + "\n")

    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    print("📄 Adding slides...\n")

    print("   1. Title slide")
    add_title_slide(prs)

    print("   2. Technology Stack Overview")
    add_tech_stack_slide(prs)

    print("   3. Product Catalog Page (with screenshot placeholder)")
    add_products_page_slide(prs)

    print("   4. Product Details")
    add_product_details_slide(prs)

    print("   5. Technical Implementation")
    add_technical_details_slide(prs)

    print("   6. Features Summary")
    add_features_summary_slide(prs)

    print("   7. Closing slide")
    add_closing_slide(prs)

    output_path = "/Users/rashminawale/ecommerce-app/E-Commerce-Platform-Showcase.pptx"
    prs.save(output_path)

    print(f"\n{'='*80}")
    print(f"✅ PRESENTATION CREATED SUCCESSFULLY")
    print(f"{'='*80}\n")
    print(f"📁 File: E-Commerce-Platform-Showcase.pptx")
    print(f"📊 Total Slides: {len(prs.slides)}")
    print(f"💾 Size: {os.path.getsize(output_path) / 1024:.1f} KB")
    print(f"\n📝 Next Step: Insert the product catalog screenshot into Slide 3")
    print(f"   (Screenshot placeholder is marked for easy identification)\n")

if __name__ == "__main__":
    import os
    main()
