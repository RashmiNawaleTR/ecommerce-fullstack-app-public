#!/usr/bin/env python3
"""
Add screenshots to E-Commerce presentation with tech stack annotations
"""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
import os

# Paths
PRESENTATION_PATH = "/Users/rashminawale/ecommerce-app/E-Commerce-Presentation.pptx"
OUTPUT_PATH = "/Users/rashminawale/ecommerce-app/E-Commerce-Presentation-Updated.pptx"

# Screenshots to add
SCREENSHOTS = [
    {
        "path": "/Users/rashminawale/Desktop/Screenshot 2026-04-21 at 6.19.50 PM.png",
        "title": "Product Listing Page",
        "tech": "Angular 17 + Angular Material",
        "features": [
            "Responsive product grid layout",
            "Search functionality",
            "Product cards with images and details",
            "Add to Cart buttons"
        ]
    },
    {
        "path": "/Users/rashminawale/Desktop/Screenshot 2026-04-21 at 6.20.02 PM.png",
        "title": "Product Detail Page",
        "tech": "Angular Router + Material Components",
        "features": [
            "Dynamic product details",
            "Category and stock badges",
            "Add to Cart functionality",
            "Responsive image display"
        ]
    },
    {
        "path": "/Users/rashminawale/Desktop/Screenshot 2026-04-21 at 6.15.28 PM.png",
        "title": "Empty Shopping Cart",
        "tech": "Angular Components + RxJS State Management",
        "features": [
            "Empty state handling",
            "User-friendly messaging",
            "Call-to-action button",
            "Clean UI design"
        ]
    },
    {
        "path": "/Users/rashminawale/Desktop/Screenshot 2026-04-21 at 6.20.05 PM.png",
        "title": "Shopping Cart with Items",
        "tech": "Angular Services + Spring Boot REST API",
        "features": [
            "Cart item management",
            "Quantity controls (+/-)",
            "Order summary with calculations",
            "Proceed to checkout flow",
            "Clear cart functionality"
        ]
    },
    {
        "path": "/Users/rashminawale/Desktop/Screenshot 2026-04-21 at 6.15.12 PM.png",
        "title": "Shopping Cart - Different Product",
        "tech": "Real-time Cart Updates",
        "features": [
            "Dynamic price calculation",
            "Product variant display",
            "Consistent UI across products",
            "Remove item functionality"
        ]
    }
]

def add_tech_stack_slide(prs):
    """Add a comprehensive tech stack overview slide"""
    slide = prs.slides.add_slide(prs.slide_layouts[0])  # Use default layout

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(9), Inches(0.6))
    title_frame = title_box.text_frame
    title_frame.text = "Technology Stack"
    title_para = title_frame.paragraphs[0]
    title_para.font.size = Pt(36)
    title_para.font.bold = True
    title_para.font.color.rgb = RGBColor(63, 81, 181)  # Material Blue
    title_para.alignment = PP_ALIGN.CENTER

    # Create three columns for Frontend, Backend, Database
    col_width = Inches(2.8)
    col_height = Inches(4.5)
    start_y = Inches(1.2)

    # Frontend Column
    frontend_box = slide.shapes.add_textbox(Inches(0.5), start_y, col_width, col_height)
    frontend_frame = frontend_box.text_frame
    frontend_frame.word_wrap = True

    frontend_text = """Frontend
━━━━━━━━━━━━━━
• Angular 17.3
• TypeScript 5.4
• Angular Material
• RxJS 7.8
• Angular Router
• Reactive Forms

Features:
✓ Component-based architecture
✓ Type-safe development
✓ Material Design UI
✓ Responsive layout
✓ Client-side routing
✓ Form validation"""

    frontend_frame.text = frontend_text
    for paragraph in frontend_frame.paragraphs:
        paragraph.font.size = Pt(11)
        if paragraph.text.startswith("Frontend"):
            paragraph.font.size = Pt(18)
            paragraph.font.bold = True
            paragraph.font.color.rgb = RGBColor(33, 150, 243)

    # Backend Column
    backend_box = slide.shapes.add_textbox(Inches(3.6), start_y, col_width, col_height)
    backend_frame = backend_box.text_frame
    backend_frame.word_wrap = True

    backend_text = """Backend
━━━━━━━━━━━━━━
• Spring Boot 3.2.4
• Java 17
• Spring Security
• Spring Data JPA
• JWT (JJWT 0.12.5)
• Maven

Security:
✓ JWT authentication
✓ BCrypt password hashing
✓ Rate limiting (Bucket4j)
✓ XSS protection (Jsoup)
✓ CORS configuration
✓ SQL injection prevention"""

    backend_frame.text = backend_text
    for paragraph in backend_frame.paragraphs:
        paragraph.font.size = Pt(11)
        if paragraph.text.startswith("Backend"):
            paragraph.font.size = Pt(18)
            paragraph.font.bold = True
            paragraph.font.color.rgb = RGBColor(76, 175, 80)

    # Database Column
    database_box = slide.shapes.add_textbox(Inches(6.7), start_y, col_width, col_height)
    database_frame = database_box.text_frame
    database_frame.word_wrap = True

    database_text = """Database & Security
━━━━━━━━━━━━━━
• PostgreSQL
• JPA/Hibernate ORM
• Parameterized queries
• Transaction management

Architecture:
✓ RESTful API design
✓ Layered architecture
✓ DTO pattern
✓ Service layer
✓ Repository pattern
✓ Exception handling

Development:
✓ Localhost:4200 (frontend)
✓ Localhost:8080 (backend)"""

    database_frame.text = database_text
    for paragraph in database_frame.paragraphs:
        paragraph.font.size = Pt(11)
        if paragraph.text.startswith("Database"):
            paragraph.font.size = Pt(18)
            paragraph.font.bold = True
            paragraph.font.color.rgb = RGBColor(255, 152, 0)

    # Footer note
    footer_box = slide.shapes.add_textbox(Inches(0.5), Inches(6.2), Inches(9), Inches(0.5))
    footer_frame = footer_box.text_frame
    footer_frame.text = "🛡️ Security-First Development | Full-Stack Integration | Production-Ready"
    footer_para = footer_frame.paragraphs[0]
    footer_para.font.size = Pt(12)
    footer_para.font.italic = True
    footer_para.alignment = PP_ALIGN.CENTER
    footer_para.font.color.rgb = RGBColor(96, 96, 96)

def add_screenshot_slide(prs, screenshot_info):
    """Add a slide with screenshot and tech stack info"""
    slide = prs.slides.add_slide(prs.slide_layouts[0])  # Use default layout

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.2), Inches(9), Inches(0.5))
    title_frame = title_box.text_frame
    title_frame.text = screenshot_info["title"]
    title_para = title_frame.paragraphs[0]
    title_para.font.size = Pt(28)
    title_para.font.bold = True
    title_para.font.color.rgb = RGBColor(63, 81, 181)

    # Tech stack label
    tech_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.7), Inches(9), Inches(0.3))
    tech_frame = tech_box.text_frame
    tech_frame.text = f"Technology: {screenshot_info['tech']}"
    tech_para = tech_frame.paragraphs[0]
    tech_para.font.size = Pt(14)
    tech_para.font.italic = True
    tech_para.font.color.rgb = RGBColor(76, 175, 80)

    # Add screenshot image
    if os.path.exists(screenshot_info["path"]):
        left = Inches(0.5)
        top = Inches(1.1)
        height = Inches(3.8)
        slide.shapes.add_picture(screenshot_info["path"], left, top, height=height)

    # Features box
    features_box = slide.shapes.add_textbox(Inches(0.5), Inches(5.1), Inches(9), Inches(1.8))
    features_frame = features_box.text_frame
    features_frame.word_wrap = True

    features_text = "Key Features:\n" + "\n".join([f"  • {feature}" for feature in screenshot_info["features"]])
    features_frame.text = features_text

    # Style features text
    for i, paragraph in enumerate(features_frame.paragraphs):
        if i == 0:  # Header
            paragraph.font.size = Pt(16)
            paragraph.font.bold = True
            paragraph.font.color.rgb = RGBColor(63, 81, 181)
        else:  # Feature bullets
            paragraph.font.size = Pt(12)
            paragraph.font.color.rgb = RGBColor(66, 66, 66)
            paragraph.space_before = Pt(4)

def main():
    print("Loading presentation...")
    prs = Presentation(PRESENTATION_PATH)

    print(f"Original presentation has {len(prs.slides)} slides")

    # Add tech stack overview slide
    print("Adding tech stack overview slide...")
    add_tech_stack_slide(prs)

    # Add screenshot slides
    for screenshot in SCREENSHOTS:
        if os.path.exists(screenshot["path"]):
            print(f"Adding slide: {screenshot['title']}")
            add_screenshot_slide(prs, screenshot)
        else:
            print(f"Warning: Screenshot not found: {screenshot['path']}")

    # Save presentation
    print(f"\nSaving updated presentation to: {OUTPUT_PATH}")
    prs.save(OUTPUT_PATH)
    print(f"✓ Successfully added {len(SCREENSHOTS) + 1} new slides")
    print(f"✓ Final presentation has {len(prs.slides)} slides")
    print(f"\nPresentation saved as: E-Commerce-Presentation-Updated.pptx")

if __name__ == "__main__":
    main()
