#!/usr/bin/env python3
from pptx import Presentation

prs = Presentation("/Users/rashminawale/ecommerce-app/E-Commerce-Presentation.pptx")
print(f"Number of slides: {len(prs.slides)}")
print(f"\nAvailable layouts: {len(prs.slide_layouts)}")
for i, layout in enumerate(prs.slide_layouts):
    print(f"  Layout {i}: {layout.name}")
