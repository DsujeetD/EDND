import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

base_dir = r"C:\Users\SUJEET DAS\.gemini\antigravity\scratch\ednd-corporate-website"
assets_dir = os.path.join(base_dir, "assets", "images")
out_dir = os.path.join(assets_dir, "linkedin")
os.makedirs(out_dir, exist_ok=True)

# Fonts
font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
font_reg = r"C:\Windows\Fonts\segoeui.ttf"
font_black = r"C:\Windows\Fonts\ariblk.ttf" if os.path.exists(r"C:\Windows\Fonts\ariblk.ttf") else font_bold

# Colors
C_NAVY_DARK = (3, 7, 18)
C_NAVY_LIGHT = (8, 20, 48)
C_CYAN = (0, 210, 255)
C_GREEN = (0, 230, 118)
C_WHITE = (255, 255, 255)
C_SLATE = (203, 213, 225)
C_MUTED = (148, 163, 184)
C_GOLD = (245, 158, 11)

# Helper: Draw smooth rounded rectangle
def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = bbox
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill, outline=outline, width=width)

# =========================================================================
# BANNER 1: LinkedIn Company Page Banner (2256 x 382 px - HD 2x for Retina)
# Standard display: 1128 x 191 px
# Safe zone: Avoid bottom-left (where the square avatar covers ~360px x 180px)
# =========================================================================
def build_company_banner():
    W, H = 2256, 382
    banner = Image.new("RGBA", (W, H), C_NAVY_DARK + (255,))
    
    # 1. Base Gradient
    draw = ImageDraw.Draw(banner)
    for y in range(H):
        factor = y / H
        r = int(C_NAVY_DARK[0] + (C_NAVY_LIGHT[0] - C_NAVY_DARK[0]) * factor)
        g = int(C_NAVY_DARK[1] + (C_NAVY_LIGHT[1] - C_NAVY_DARK[1]) * factor)
        b = int(C_NAVY_DARK[2] + (C_NAVY_LIGHT[2] - C_NAVY_DARK[2]) * factor)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
        
    # 2. Right Side Photo Panels (Angled Slices)
    # Load 4 photos
    photos_files = [
        "hero-conference.jpg",
        "real-mercedes-showcase.jpg",
        "real-exhibition-hall.jpg",
        "real-ultraviolette-launch.jpg",
    ]
    
    # We will composite 4 angled photo ribbons on the right from x=1250 to x=2256
    slice_w = 260
    start_x = 1220
    angle_offset = 65  # skew angle
    
    photo_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(photo_layer)
    
    for i, pf in enumerate(photos_files):
        p_path = os.path.join(assets_dir, pf)
        if not os.path.exists(p_path):
            continue
        im = Image.open(p_path).convert("RGB")
        im_ratio = im.width / im.height
        target_h = H + 40
        target_w = int(target_h * im_ratio)
        im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Center crop to ribbon width + extra
        crop_x = max(0, (im.width - (slice_w + angle_offset)) // 2)
        im_cropped = im.crop((crop_x, 0, crop_x + slice_w + angle_offset + 30, target_h))
        
        x_left = start_x + (i * slice_w)
        x_right = x_left + slice_w + 10
        
        # Single slice canvas of size (W, H)
        slice_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        slice_canvas.paste(im_cropped, (x_left, 0))
        
        # Create angled mask
        mask = Image.new("L", (W, H), 0)
        mdraw = ImageDraw.Draw(mask)
        
        poly = [
            (x_left + angle_offset, 0),
            (x_right + angle_offset, 0),
            (x_right, H),
            (x_left, H)
        ]
        mdraw.polygon(poly, fill=255)
        
        # Paste cropped photo through mask
        photo_layer.paste(slice_canvas, (0, 0), mask=mask)
        
        # Draw glowing angled border
        border_color = (0, 210, 255, 180) if i % 2 == 0 else (0, 230, 118, 180)
        pdraw.line([(x_left + angle_offset, 0), (x_left, H)], fill=border_color, width=3)
    
    # Subtle dark gradient overlay on left edge of photos to blend smoothly
    blend_mask = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(blend_mask)
    for x in range(start_x - 120, start_x + 120):
        factor = max(0.0, min(1.0, (x - (start_x - 120)) / 240.0))
        alpha = int((1.0 - factor) * 255)
        bdraw.line([(x, 0), (x, H)], fill=C_NAVY_DARK + (alpha,))
    
    banner.alpha_composite(photo_layer)
    banner.alpha_composite(blend_mask)
    
    # 3. Wave curves at bottom and top-left in cyan and green
    wave_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wdraw = ImageDraw.Draw(wave_layer)
    # Bottom swoosh curve
    for x in range(W):
        # Sine wave curve
        yw = int(H - 12 - 14 * math.sin((x / W) * math.pi * 2.2))
        wdraw.line([(x, yw), (x, yw + 3)], fill=C_CYAN + (160,))
        wdraw.line([(x, yw + 3), (x, yw + 6)], fill=C_GREEN + (160,))
    banner.alpha_composite(wave_layer)
    
    # 4. Typography & Branding (Left & Center area)
    draw = ImageDraw.Draw(banner)
    
    # Load fonts
    f_tagline = ImageFont.truetype(font_bold, 24)
    f_title = ImageFont.truetype(font_bold, 54)
    f_sub = ImageFont.truetype(font_bold, 28)
    f_badge = ImageFont.truetype(font_bold, 22)
    
    # Left Logo Badge
    logo_path = os.path.join(assets_dir, "ednd-logo-original.png")
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert("RGBA")
        # Resize logo nicely
        l_h = 76
        l_w = int(logo_im.width * (l_h / logo_im.height))
        logo_im = logo_im.resize((l_w, l_h), Image.Resampling.LANCZOS)
        
        # Luxury white pill container for logo
        badge_pad_x = 22
        badge_pad_y = 10
        bx0 = 80
        by0 = 42
        bx1 = bx0 + l_w + (badge_pad_x * 2)
        by1 = by0 + l_h + (badge_pad_y * 2)
        
        # Pill glow shadow
        draw_rounded_rect(draw, (bx0 - 3, by0 - 3, bx1 + 3, by1 + 3), radius=16, fill=(0, 210, 255, 30))
        draw_rounded_rect(draw, (bx0, by0, bx1, by1), radius=14, fill=(255, 255, 255, 250), outline=(255, 255, 255, 200), width=2)
        banner.alpha_composite(logo_im, (bx0 + badge_pad_x, by0 + badge_pad_y))
        
        # Next to logo: LEARN • EARN • GROW badge
        tx0 = bx1 + 25
        ty0 = by0 + 16
        t_text = "LEARN  •  EARN  •  GROW"
        t_w = int(draw.textlength(t_text, font=f_tagline))
        draw_rounded_rect(draw, (tx0, ty0, tx0 + t_w + 36, ty0 + 44), radius=22, fill=(0, 210, 255, 25), outline=(0, 210, 255, 120), width=2)
        draw.text((tx0 + 18, ty0 + 8), t_text, font=f_tagline, fill=C_CYAN)
        
    # Main Headline
    title_y = 158
    draw.text((82, title_y), "Corporate Events & Brand Experiences", font=f_title, fill=C_WHITE)
    
    # Subhead / Pillars
    sub_y = title_y + 68
    pillars_text = "Conferences  |  Exhibitions  |  Activations  |  Event Production"
    draw.text((84, sub_y), pillars_text, font=f_sub, fill=C_GREEN)
    
    # Bottom Row Badges
    pills_y = sub_y + 54
    pills = [
        ("📍 Mumbai | Pan-India Execution", C_CYAN),
        ("💬 WhatsApp: +91 9967750370", C_GREEN),
        ("✉️ ednd.org@gmail.com", C_WHITE)
    ]
    cur_x = 84
    for ptext, pcol in pills:
        pw = int(draw.textlength(ptext, font=f_badge))
        draw_rounded_rect(draw, (cur_x, pills_y, cur_x + pw + 28, pills_y + 36), radius=10, fill=(12, 24, 51, 180), outline=(255, 255, 255, 40), width=1)
        draw.text((cur_x + 14, pills_y + 6), ptext, font=f_badge, fill=pcol)
        cur_x += pw + 44
        
    # Save HD 2256x382
    hd_path = os.path.join(out_dir, "EDND_LinkedIn_Company_Banner_2256x382_HD.png")
    banner.convert("RGB").save(hd_path, quality=98)
    print("Saved:", hd_path)
    
    # Resize to exact standard 1128x191
    std_banner = banner.resize((1128, 191), Image.Resampling.LANCZOS)
    std_path = os.path.join(out_dir, "EDND_LinkedIn_Company_Banner_1128x191.png")
    std_banner.convert("RGB").save(std_path, quality=98)
    print("Saved:", std_path)


# =========================================================================
# BANNER 2: LinkedIn Personal / Founder Profile Banner (1584 x 396 px)
# Standard aspect ratio 4:1
# =========================================================================
def build_profile_banner():
    W, H = 1584, 396
    banner = Image.new("RGBA", (W, H), C_NAVY_DARK + (255,))
    
    draw = ImageDraw.Draw(banner)
    for y in range(H):
        factor = y / H
        r = int(C_NAVY_DARK[0] + (C_NAVY_LIGHT[0] - C_NAVY_DARK[0]) * factor)
        g = int(C_NAVY_DARK[1] + (C_NAVY_LIGHT[1] - C_NAVY_DARK[1]) * factor)
        b = int(C_NAVY_DARK[2] + (C_NAVY_LIGHT[2] - C_NAVY_DARK[2]) * factor)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
        
    # Right Side Photo Panels
    photos_files = [
        "hero-conference.jpg",
        "real-mercedes-showcase.jpg",
        "real-exhibition-hall.jpg",
        "real-ultraviolette-launch.jpg",
    ]
    slice_w = 175
    start_x = 880
    angle_offset = 55
    
    photo_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(photo_layer)
    
    for i, pf in enumerate(photos_files):
        p_path = os.path.join(assets_dir, pf)
        if not os.path.exists(p_path):
            continue
        im = Image.open(p_path).convert("RGB")
        target_h = H + 30
        target_w = int(target_h * (im.width / im.height))
        im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        crop_x = max(0, (im.width - (slice_w + angle_offset)) // 2)
        im_cropped = im.crop((crop_x, 0, crop_x + slice_w + angle_offset + 20, target_h))
        
        x_left = start_x + (i * slice_w)
        x_right = x_left + slice_w + 8
        
        slice_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        slice_canvas.paste(im_cropped, (x_left, 0))
        
        mask = Image.new("L", (W, H), 0)
        mdraw = ImageDraw.Draw(mask)
        
        poly = [
            (x_left + angle_offset, 0),
            (x_right + angle_offset, 0),
            (x_right, H),
            (x_left, H)
        ]
        mdraw.polygon(poly, fill=255)
        photo_layer.paste(slice_canvas, (0, 0), mask=mask)
        
        border_color = (0, 210, 255, 180) if i % 2 == 0 else (0, 230, 118, 180)
        pdraw.line([(x_left + angle_offset, 0), (x_left, H)], fill=border_color, width=3)
        
    # Blend gradient
    blend_mask = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(blend_mask)
    for x in range(start_x - 90, start_x + 90):
        factor = max(0.0, min(1.0, (x - (start_x - 90)) / 180.0))
        alpha = int((1.0 - factor) * 255)
        bdraw.line([(x, 0), (x, H)], fill=C_NAVY_DARK + (alpha,))
        
    banner.alpha_composite(photo_layer)
    banner.alpha_composite(blend_mask)
    
    # Waves
    wave_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wdraw = ImageDraw.Draw(wave_layer)
    for x in range(W):
        yw = int(H - 10 - 12 * math.sin((x / W) * math.pi * 2.2))
        wdraw.line([(x, yw), (x, yw + 2)], fill=C_CYAN + (160,))
        wdraw.line([(x, yw + 2), (x, yw + 5)], fill=C_GREEN + (160,))
    banner.alpha_composite(wave_layer)
    
    # Typography
    draw = ImageDraw.Draw(banner)
    f_tagline = ImageFont.truetype(font_bold, 18)
    f_title = ImageFont.truetype(font_bold, 42)
    f_sub = ImageFont.truetype(font_bold, 22)
    f_badge = ImageFont.truetype(font_bold, 17)
    
    # Logo Badge
    logo_path = os.path.join(assets_dir, "ednd-logo-original.png")
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert("RGBA")
        l_h = 62
        l_w = int(logo_im.width * (l_h / logo_im.height))
        logo_im = logo_im.resize((l_w, l_h), Image.Resampling.LANCZOS)
        
        bx0 = 60
        by0 = 36
        bx1 = bx0 + l_w + 36
        by1 = by0 + l_h + 16
        draw_rounded_rect(draw, (bx0 - 2, by0 - 2, bx1 + 2, by1 + 2), radius=14, fill=(0, 210, 255, 30))
        draw_rounded_rect(draw, (bx0, by0, bx1, by1), radius=12, fill=(255, 255, 255, 250), outline=(255, 255, 255, 200), width=2)
        banner.alpha_composite(logo_im, (bx0 + 18, by0 + 8))
        
        # Tagline
        tx0 = bx1 + 20
        ty0 = by0 + 15
        t_text = "LEARN  •  EARN  •  GROW"
        t_w = int(draw.textlength(t_text, font=f_tagline))
        draw_rounded_rect(draw, (tx0, ty0, tx0 + t_w + 28, ty0 + 36), radius=18, fill=(0, 210, 255, 25), outline=(0, 210, 255, 120), width=1)
        draw.text((tx0 + 14, ty0 + 7), t_text, font=f_tagline, fill=C_CYAN)
        
    # Main Headline
    draw.text((62, 142), "Corporate Events & Brand Experiences", font=f_title, fill=C_WHITE)
    draw.text((64, 200), "Conferences  |  Exhibitions  |  Activations  |  Event Production", font=f_sub, fill=C_GREEN)
    
    # Badges
    pills_y = 252
    pills = [
        ("📍 Mumbai | Pan-India Execution", C_CYAN),
        ("💬 WhatsApp: +91 9967750370", C_GREEN),
        ("✉️ ednd.org@gmail.com", C_WHITE)
    ]
    cur_x = 64
    for ptext, pcol in pills:
        pw = int(draw.textlength(ptext, font=f_badge))
        draw_rounded_rect(draw, (cur_x, pills_y, cur_x + pw + 22, pills_y + 32), radius=8, fill=(12, 24, 51, 180), outline=(255, 255, 255, 40), width=1)
        draw.text((cur_x + 11, pills_y + 6), ptext, font=f_badge, fill=pcol)
        cur_x += pw + 32
        
    # Save 1584x396
    prof_path = os.path.join(out_dir, "EDND_LinkedIn_Profile_Banner_1584x396.png")
    banner.convert("RGB").save(prof_path, quality=98)
    print("Saved:", prof_path)


# =========================================================================
# BANNER 3: Optimized Aspect Ratio Fit of the User's Uploaded Banner
# =========================================================================
def build_adapted_original_banner():
    orig_path = os.path.join(assets_dir, "ednd-official-banner.jpg")
    if not os.path.exists(orig_path):
        return
    im = Image.open(orig_path).convert("RGB")
    
    # For Company Page: Fit into 1128 x 191 by center expanding navy
    W_co, H_co = 1128, 191
    co_canvas = Image.new("RGB", (W_co, H_co), (3, 7, 18))
    # Scale image to match height
    scale_factor = H_co / im.height
    new_w = int(im.width * scale_factor)
    im_scaled = im.resize((new_w, H_co), Image.Resampling.LANCZOS)
    
    # Paste centered or right-aligned
    offset_x = (W_co - new_w) // 2
    co_canvas.paste(im_scaled, (offset_x, 0))
    out_co = os.path.join(out_dir, "EDND_LinkedIn_Company_Banner_OriginalFit_1128x191.png")
    co_canvas.save(out_co, quality=98)
    print("Saved:", out_co)
    
    # For Profile Banner: Fit into 1584 x 396
    W_pr, H_pr = 1584, 396
    pr_canvas = Image.new("RGB", (W_pr, H_pr), (3, 7, 18))
    scale_pr = H_pr / im.height
    new_w_pr = int(im.width * scale_pr)
    im_pr_scaled = im.resize((new_w_pr, H_pr), Image.Resampling.LANCZOS)
    offset_x_pr = (W_pr - new_w_pr) // 2
    pr_canvas.paste(im_pr_scaled, (offset_x_pr, 0))
    out_pr = os.path.join(out_dir, "EDND_LinkedIn_Profile_Banner_OriginalFit_1584x396.png")
    pr_canvas.save(out_pr, quality=98)
    print("Saved:", out_pr)


if __name__ == "__main__":
    build_company_banner()
    build_profile_banner()
    build_adapted_original_banner()
    print("ALL LINKEDIN BANNERS GENERATED SUCCESSFULLY!")
