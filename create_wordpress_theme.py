import os
import shutil
import zipfile
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
THEME_DIR = "/tmp/connekt-homes-wordpress-theme"
OUTPUT_DIR = os.path.join(BASE_DIR, "public")
ZIP_NAME = "connekt-homes-wordpress-theme.zip"

if os.path.exists(THEME_DIR):
    shutil.rmtree(THEME_DIR)

os.makedirs(os.path.join(THEME_DIR, "assets", "images"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "assets", "css"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "assets", "js"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "assets", "data"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "template-parts"), exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Copy images
src_images = os.path.join(BASE_DIR, "src", "assets", "images")
copied_images = {}
for img in os.listdir(src_images):
    if img.endswith(('.jpg', '.png', '.jpeg')):
        full_src = os.path.join(src_images, img)
        clean_name = img.split('_179')[0] + '.jpg'
        full_dest = os.path.join(THEME_DIR, "assets", "images", clean_name)
        shutil.copy2(full_src, full_dest)
        copied_images[clean_name] = clean_name
        # Also copy as screenshot.png
        if 'hero_apartment' in img:
            shutil.copy2(full_src, os.path.join(THEME_DIR, "screenshot.png"))

# 2. style.css
style_css = """/*
Theme Name: Connekt Homes
Theme URI: https://instagram.com/connekt_homes/
Author: Connekt Hospitality LLP
Author URI: https://instagram.com/connekt_homes/
Description: Premium serviced apartments theme for short-term stays in Bandra & Pali Village, Mumbai. Editorial quiet luxury aesthetic, live booking engine UI, custom post types, and responsive mobile architecture.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: Proprietary
Text Domain: connekt-homes
Tags: boutique, hotel, serviced-apartments, travel, booking, responsive, luxury, hospitality
*/

:root {
  --color-ivory: #FAF6F0;
  --color-sand: #EFE6DA;
  --color-navy: #14213D;
  --color-ink: #2B2F3A;
  --color-pink: #D93A6B;
  --color-pink-tint: #F8E1E8;
  --color-teal: #2A8CB5;
  --color-sage: #9DB5A0;
  --color-brass: #B89B72;
  --color-white: #FFFFFF;

  --font-serif: 'Newsreader', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-ivory);
  color: var(--color-ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Paper Grain Texture */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.soft-arch {
  border-radius: 180px 180px 10px 10px;
}

.soft-arch-sm {
  border-radius: 90px 90px 8px 8px;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
"""
with open(os.path.join(THEME_DIR, "style.css"), "w") as f:
    f.write(style_css)

# 3. functions.php
functions_php = """<?php
/**
 * Connekt Homes Theme Functions & Definitions
 *
 * @package Connekt_Homes
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function connekt_homes_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );
    add_theme_support( 'responsive-embeds' );

    register_nav_menus( array(
        'primary' => __( 'Primary Header Menu', 'connekt-homes' ),
        'footer'  => __( 'Footer Menu', 'connekt-homes' ),
    ) );
}
add_action( 'after_setup_theme', 'connekt_homes_setup' );

function connekt_homes_scripts() {
    // Google Fonts
    wp_enqueue_style( 'connekt-fonts', 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap', array(), null );
    
    // Main Theme Stylesheet
    wp_enqueue_style( 'connekt-main-style', get_stylesheet_uri(), array(), '1.0.0' );
    wp_enqueue_style( 'connekt-theme-custom', get_template_directory_uri() . '/assets/css/theme.css', array(), '1.0.0' );

    // Main Theme JavaScript
    wp_enqueue_script( 'connekt-main-js', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'connekt_homes_scripts' );

// Register Custom Post Type for Stays / Serviced Apartments
function connekt_register_stays_cpt() {
    $labels = array(
        'name'                  => _x( 'Serviced Stays', 'Post type general name', 'connekt-homes' ),
        'singular_name'         => _x( 'Serviced Stay', 'Post type singular name', 'connekt-homes' ),
        'menu_name'             => _x( 'Stays', 'Admin Menu text', 'connekt-homes' ),
        'add_new'               => __( 'Add New Stay', 'connekt-homes' ),
        'add_new_item'          => __( 'Add New Serviced Stay', 'connekt-homes' ),
        'edit_item'             => __( 'Edit Stay', 'connekt-homes' ),
        'all_items'             => __( 'All Stays', 'connekt-homes' ),
    );
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'menu_icon'          => 'dashicons-building',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'rewrite'            => array( 'slug' => 'stay' ),
        'show_in_rest'       => true,
    );
    register_post_type( 'stay', $args );
}
add_action( 'init', 'connekt_register_stays_cpt' );
"""
with open(os.path.join(THEME_DIR, "functions.php"), "w") as f:
    f.write(functions_php)

# 4. header.php
header_php = """<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D93A6B'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z'/></svg>" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Announcement Bar -->
<div class="announcement-bar">
    <div class="announcement-content">
        <span class="announcement-tag">Limited offer: 15% off on your next stay</span>
        <span class="dot-separator">·</span>
        <span class="promo-pill">CONNEKT15</span>
        <span class="terms-note">[Confirm terms]</span>
    </div>
</div>

<!-- Sticky Main Navigation Bar -->
<header id="site-header" class="site-header">
    <div class="container header-inner">
        <!-- Brand Wordmark with Pink Location Pin -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand-logo" aria-label="Connekt Homes">
            <svg width="180" height="38" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.28em" fill="#14213D">CONNEKT</text>
                <text x="122" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.22em" fill="#14213D">H</text>
                <g transform="translate(138.5, 4.5) scale(0.68)">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#D93A6B"/>
                    <circle cx="12" cy="9" r="3.2" fill="#FAF6F0"/>
                </g>
                <text x="154" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.22em" fill="#14213D">MES</text>
                <text x="2" y="36" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" letter-spacing="0.32em" fill="#6B7280">PREMIUM SERVICED APARTMENTS</text>
            </svg>
        </a>

        <!-- Desktop Navigation -->
        <nav class="main-nav">
            <a href="<?php echo esc_url( home_url( '/stays' ) ); ?>">Stays</a>
            <a href="<?php echo esc_url( home_url( '/experiences' ) ); ?>">Experiences</a>
            <a href="<?php echo esc_url( home_url( '/corporate' ) ); ?>">Corporate</a>
            <a href="<?php echo esc_url( home_url( '/list' ) ); ?>">List Your Property</a>
            <a href="<?php echo esc_url( home_url( '/about' ) ); ?>">About</a>
            <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact</a>
        </nav>

        <!-- Right Action Buttons -->
        <div class="header-actions">
            <a href="<?php echo esc_url( home_url( '/stays' ) ); ?>" class="btn-primary">
                <span>Book a stay</span>
                <span class="arrow">&rarr;</span>
            </a>
            <button id="mobile-menu-toggle" class="mobile-menu-btn" aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>
</header>
"""
with open(os.path.join(THEME_DIR, "header.php"), "w") as f:
    f.write(header_php)

# 5. footer.php
footer_php = """<?php
/**
 * Connekt Homes Footer Template
 *
 * @package Connekt_Homes
 */
?>
<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <!-- Brand Column -->
            <div class="footer-col brand-col">
                <div class="footer-logo">
                    <svg width="180" height="38" viewBox="0 0 190 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.28em" fill="#FAF6F0">CONNEKT</text>
                        <text x="122" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.22em" fill="#FAF6F0">H</text>
                        <g transform="translate(138.5, 4.5) scale(0.68)">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#D93A6B"/>
                            <circle cx="12" cy="9" r="3.2" fill="#14213D"/>
                        </g>
                        <text x="154" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="17.5" font-weight="700" letter-spacing="0.22em" fill="#FAF6F0">MES</text>
                        <text x="2" y="36" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" letter-spacing="0.32em" fill="#D1D5DB">PREMIUM SERVICED APARTMENTS</text>
                    </svg>
                </div>
                <p class="footer-tagline">“Homes with a soul. Short-term stays for the global traveller.”</p>
                <p class="footer-desc">Curated serviced residences in Mumbai’s most beloved neighborhoods. Hotel-grade care with the warmth and privacy of your own home.</p>
                <div class="footer-social">
                    <a href="https://www.instagram.com/connekt_homes/" target="_blank" rel="noopener noreferrer" class="social-badge">
                        <span>@connekt_homes</span>
                        <span>↗</span>
                    </a>
                </div>
            </div>

            <!-- Explore Links -->
            <div class="footer-col">
                <h4 class="footer-heading">Explore</h4>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url( home_url( '/stays' ) ); ?>">All Serviced Stays</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/experiences' ) ); ?>">Neighbourhood Guide</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/corporate' ) ); ?>">Corporate & Long Stays</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/list' ) ); ?>">List Your Property</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">Our Story & Values</a></li>
                </ul>
            </div>

            <!-- Company Links -->
            <div class="footer-col">
                <h4 class="footer-heading">Company</h4>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url( home_url( '/careers' ) ); ?>">We’re Hiring <span class="badge-hot">HOT</span></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact & Concierge</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/policies' ) ); ?>">House Rules & Policies</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/policies' ) ); ?>">Cancellation Terms</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/policies' ) ); ?>">Privacy & Data</a></li>
                </ul>
            </div>

            <!-- Concierge Desk -->
            <div class="footer-col">
                <h4 class="footer-heading">Concierge Desk</h4>
                <div class="contact-details">
                    <p>📍 Pali Hill & Bandra West, Mumbai 400050 [EDIT]</p>
                    <p>📞 <a href="https://wa.me/919800000000">+91 98XXX XXXXX [EDIT]</a></p>
                    <p>✉️ <a href="mailto:stays@connekthomes.com">stays@connekthomes.com [EDIT]</a></p>
                    <p class="hours-text">Desk hours: 8:00 AM – 10:00 PM IST</p>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo date( 'Y' ); ?> Connekt Homes Hospitality LLP. All rights reserved. [EDIT: GST Registration Number]</p>
            <p class="footer-trust">Verified Serviced Residences · Crafted in Bandra</p>
        </div>
    </div>
</footer>

<!-- Floating WhatsApp Action -->
<aside class="floating-whatsapp" aria-label="WhatsApp Concierge">
    <a href="https://wa.me/919800000000?text=Hello%20Connekt%20Concierge!%20I%20am%20inquiring%20about%20booking%20a%20serviced%20stay." target="_blank" rel="noopener noreferrer" class="whatsapp-btn" aria-label="WhatsApp Concierge">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.07L2 22L7.07 20.64C8.52 21.5 10.2 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.63 16.5C16.42 17.08 15.35 17.61 14.88 17.69C14.41 17.76 13.8 17.79 11.75 16.94C9.17 15.86 7.5 13.25 7.37 13.08C7.25 12.92 6.33 11.7 6.33 10.43C6.33 9.17 6.98 8.55 7.21 8.31C7.44 8.07 7.71 8.02 7.92 8.02C8.13 8.02 8.34 8.02 8.52 8.03C8.71 8.04 8.96 7.97 9.19 8.52C9.42 9.07 9.99 10.45 10.05 10.59C10.12 10.73 10.16 10.9 10.06 11.08C9.97 11.27 9.9 11.36 9.75 11.53C9.6 11.7 9.47 11.83 9.32 12.01C9.16 12.18 9 12.37 9.18 12.68C9.37 12.99 10.02 14.05 10.98 14.91C12.22 16.02 13.23 16.37 13.56 16.51C13.89 16.65 14.07 16.62 14.25 16.41C14.43 16.2 15.02 15.51 15.23 15.21C15.44 14.91 15.65 14.96 15.93 15.07C16.21 15.17 17.69 15.9 18 16.05C18.31 16.2 18.52 16.28 18.59 16.4C18.67 16.52 18.67 17.11 18.46 17.69L16.63 16.5Z"/></svg>
    </a>
</aside>

<?php wp_footer(); ?>
</body>
</html>
"""
with open(os.path.join(THEME_DIR, "footer.php"), "w") as f:
    f.write(footer_php)

# 6. front-page.php (The full home page matching the 14 sections)
front_page_php = """<?php
/**
 * Template Name: Connekt Homes Front Page
 *
 * @package Connekt_Homes
 */

get_header();
?>

<main id="primary" class="site-main">
    <!-- 1. HERO SECTION -->
    <section class="hero-section">
        <div class="container hero-container">
            <div class="hero-grid">
                <div class="hero-copy">
                    <div class="location-badge">
                        <span class="badge-dot"></span>
                        <span>Bandra West & Pali Hill · Mumbai</span>
                    </div>
                    <h1 class="hero-title">
                        Homes with a soul,<br>
                        <em>wherever you land.</em>
                    </h1>
                    <p class="hero-subtext">
                        Short-term serviced residences for the global traveller. Full kitchens, sunlit living areas, daily housekeeping, and quiet concierge support in Mumbai’s cultural heart.
                    </p>
                    <div class="hero-buttons">
                        <a href="<?php echo esc_url( home_url( '/stays' ) ); ?>" class="btn-primary">
                            <span>Explore Stays</span>
                            <span class="arrow">&rarr;</span>
                        </a>
                        <a href="<?php echo esc_url( home_url( '/experiences' ) ); ?>" class="btn-secondary">
                            Neighbourhood Guide
                        </a>
                    </div>
                </div>

                <div class="hero-visual">
                    <div class="arched-frame soft-arch">
                        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Sunlit serviced apartment living room in Bandra Mumbai">
                        <div class="frame-overlay">
                            <div>
                                <span class="feat-tag">Featured Residence</span>
                                <span class="feat-name">The Arched Haven</span>
                            </div>
                            <span class="feat-loc">Pali Hill</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Elevated Search Card -->
            <div class="search-card-wrapper">
                <form action="<?php echo esc_url( home_url( '/stays' ) ); ?>" method="GET" class="search-card">
                    <div class="search-col">
                        <label>Where</label>
                        <select name="area">
                            <option value="all">All of Bandra West</option>
                            <option value="pali-hill">Pali Hill</option>
                            <option value="pali-village">Pali Village</option>
                            <option value="carter-road">Carter Road</option>
                            <option value="ranwar">Ranwar Village</option>
                        </select>
                    </div>
                    <div class="search-col">
                        <label>Check-in</label>
                        <input type="date" name="checkin" value="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
                    </div>
                    <div class="search-col">
                        <label>Check-out</label>
                        <input type="date" name="checkout" value="<?php echo date('Y-m-d', strtotime('+4 days')); ?>">
                    </div>
                    <div class="search-col">
                        <label>Guests</label>
                        <select name="guests">
                            <option value="1">1 Guest</option>
                            <option value="2" selected>2 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="6">6 Guests</option>
                        </select>
                    </div>
                    <div class="search-action">
                        <button type="submit" class="btn-primary search-btn">Search stays</button>
                    </div>
                </form>
                <div class="trust-chips">
                    <span>· Fully furnished</span>
                    <span>· Daily housekeeping</span>
                    <span>· Keyless self check-in</span>
                    <span>· 24/7 concierge support</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. BRAND STATEMENT & EDITORIAL STATS -->
    <section class="section brand-statement-section">
        <div class="container text-center">
            <span class="section-kicker">The Connekt Ethos</span>
            <blockquote class="editorial-quote">
                “We founded Connekt Homes on a simple truth: global travellers do not want sterile hotel boxes. They crave <em>lived-in warmth</em>, authentic neighbourhood rhythms, and the unpretentious sanctuary of an actual home—delivered with flawless hospitality.”
            </blockquote>
            <p class="editorial-sub">Boutique Serviced Living · Curated in Mumbai</p>
            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-num">4.96 <span class="star">★</span></div>
                    <div class="stat-label">Average Guest Rating [EDIT]</div>
                </div>
                <div class="stat-item">
                    <div class="stat-num">100%</div>
                    <div class="stat-label">Verified Residences [EDIT]</div>
                </div>
                <div class="stat-item">
                    <div class="stat-num">24 / 7</div>
                    <div class="stat-label">On-Ground Concierge Care [EDIT]</div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. FEATURED STAYS -->
    <?php get_template_part( 'template-parts/stay-card' ); ?>

    <!-- 4. WHY CONNEKT: FOUR PILLARS -->
    <section class="section why-connekt-section">
        <div class="container">
            <div class="section-header text-center">
                <span class="section-kicker">The Connekt Promise</span>
                <h2 class="section-title">Why travellers choose <em>Connekt</em></h2>
            </div>
            <div class="pillars-grid">
                <div class="pillar-card">
                    <span class="pillar-num">01</span>
                    <h3>Homes, Not Rooms</h3>
                    <p>Separate living rooms, dedicated dining spaces, and complete kitchens so you can cook, entertain, and spread out in comfort.</p>
                </div>
                <div class="pillar-card">
                    <span class="pillar-num">02</span>
                    <h3>Hotel-Grade Care</h3>
                    <p>Spotless daily housekeeping, natural botanical toiletries, crisp 400-thread count cotton sheets, and responsive concierge support.</p>
                </div>
                <div class="pillar-card">
                    <span class="pillar-num">03</span>
                    <h3>Live Like a Local</h3>
                    <p>Immerse yourself in authentic Bandra life. Stroll down leafy lanes to morning bakeries, local fruit stalls, and seaside cafes.</p>
                </div>
                <div class="pillar-card">
                    <span class="pillar-num">04</span>
                    <h3>Stay As Long As You Like</h3>
                    <p>From weekend creative retreats to multi-month corporate relocations with flexible month-to-month terms and GST tax invoicing.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. A DAY AT CONNEKT PINNED STORY -->
    <?php get_template_part( 'template-parts/content-day-at-connekt' ); ?>

    <!-- 6. AMENITIES GRID -->
    <?php get_template_part( 'template-parts/content-amenities' ); ?>

    <!-- 7. NEIGHBOURHOOD / MAP -->
    <?php get_template_part( 'template-parts/content-map' ); ?>

    <!-- 8. GUEST STORIES (NAVY BAND) -->
    <?php get_template_part( 'template-parts/content-stories' ); ?>

    <!-- 9. OFFER BANNER -->
    <?php get_template_part( 'template-parts/content-offer' ); ?>

    <!-- 10. INSTAGRAM GRID -->
    <section class="section instagram-section">
        <div class="container">
            <div class="section-header flex-between">
                <div>
                    <span class="section-kicker">Visual Chronicle</span>
                    <h2 class="section-title">Follow our journey <em>@connekt_homes</em></h2>
                </div>
                <a href="https://www.instagram.com/connekt_homes/" target="_blank" rel="noopener noreferrer" class="btn-secondary">
                    Follow on Instagram ↗
                </a>
            </div>
            <div class="insta-grid">
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Connekt Homes Interior"></div>
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_bedroom_suite.jpg' ); ?>" alt="Connekt Homes Bedroom"></div>
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bandra_pali_hill_street.jpg' ); ?>" alt="Pali Hill Street"></div>
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_kitchen_dining.jpg' ); ?>" alt="Kitchen Island"></div>
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_living_room.jpg' ); ?>" alt="Library Salon"></div>
                <div class="insta-tile"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Bandra Living Room"></div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
"""
with open(os.path.join(THEME_DIR, "front-page.php"), "w") as f:
    f.write(front_page_php)

# 7. template-parts
# 7.1 stay-card.php
stay_card_php = """<?php
/**
 * Template part for displaying featured stays
 */
?>
<section class="section featured-stays-section">
    <div class="container">
        <div class="section-header flex-between">
            <div>
                <span class="section-kicker">Handpicked Collections</span>
                <h2 class="section-title">Featured <em>residences</em></h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/stays' ) ); ?>" class="btn-secondary">
                View All Stays &rarr;
            </a>
        </div>

        <div class="stays-grid">
            <!-- Stay 1 -->
            <article class="stay-card">
                <div class="card-img-wrap">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="The Arched Haven at Pali Hill">
                    <span class="card-badge">Superhost Curated</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-area">Pali Hill · 2 BHK</span>
                        <span class="card-rating">★ 4.97 (48)</span>
                    </div>
                    <h3 class="card-title">The Arched Haven at Pali Hill</h3>
                    <p class="card-specs">Up to 4 guests · 2 beds · 1,130 sq ft</p>
                    <div class="card-footer">
                        <div class="card-price"><strong>₹9,800</strong> / night</div>
                        <a href="<?php echo esc_url( home_url( '/stay/pali-haven-residence' ) ); ?>" class="card-link">Explore &rarr;</a>
                    </div>
                </div>
            </article>

            <!-- Stay 2 -->
            <article class="stay-card">
                <div class="card-img-wrap">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_living_room.jpg' ); ?>" alt="The Curator's Flat at Pali Village">
                    <span class="card-badge">1 BHK</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-area">Pali Village · 1 BHK</span>
                        <span class="card-rating">★ 4.95 (62)</span>
                    </div>
                    <h3 class="card-title">The Curator's Flat at Pali Village</h3>
                    <p class="card-specs">Up to 2 guests · 1 bed · 730 sq ft</p>
                    <div class="card-footer">
                        <div class="card-price"><strong>₹7,200</strong> / night</div>
                        <a href="<?php echo esc_url( home_url( '/stay/pali-village-curators-flat' ) ); ?>" class="card-link">Explore &rarr;</a>
                    </div>
                </div>
            </article>

            <!-- Stay 3 -->
            <article class="stay-card">
                <div class="card-img-wrap">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_bedroom_suite.jpg' ); ?>" alt="Ranwar Village Atelier Suite">
                    <span class="card-badge">Studio</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-area">Ranwar Village · Studio</span>
                        <span class="card-rating">★ 4.92 (39)</span>
                    </div>
                    <h3 class="card-title">Ranwar Village Atelier Suite</h3>
                    <p class="card-specs">Up to 2 guests · 1 bed · 515 sq ft</p>
                    <div class="card-footer">
                        <div class="card-price"><strong>₹5,500</strong> / night</div>
                        <a href="<?php echo esc_url( home_url( '/stay/ranwar-heritage-atelier' ) ); ?>" class="card-link">Explore &rarr;</a>
                    </div>
                </div>
            </article>

            <!-- Stay 4 -->
            <article class="stay-card">
                <div class="card-img-wrap">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_kitchen_dining.jpg' ); ?>" alt="The Coastal Penthouse at Carter Road">
                    <span class="card-badge">3 BHK Penthouse</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-area">Carter Road · Penthouse</span>
                        <span class="card-rating">★ 4.99 (34)</span>
                    </div>
                    <h3 class="card-title">The Coastal Penthouse at Carter Road</h3>
                    <p class="card-specs">Up to 6 guests · 3 beds · 1,990 sq ft</p>
                    <div class="card-footer">
                        <div class="card-price"><strong>₹16,800</strong> / night</div>
                        <a href="<?php echo esc_url( home_url( '/stay/carter-road-coastal-penthouse' ) ); ?>" class="card-link">Explore &rarr;</a>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "stay-card.php"), "w") as f:
    f.write(stay_card_php)

# 7.2 content-day-at-connekt.php
day_at_connekt_php = """<?php
/**
 * A Day at Connekt Pinned Story Template Part
 */
?>
<section class="section day-at-connekt-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-kicker">The Living Rhythm</span>
            <h2 class="section-title">A day at <em>Connekt</em></h2>
            <p class="section-sub">Experience how our serviced residences transform through the day—from calm sunlit mornings to twilight ease.</p>
        </div>

        <div class="day-story-card">
            <div class="story-visual">
                <img id="day-story-img" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Day at Connekt">
            </div>
            <div class="story-info">
                <div class="time-tabs">
                    <button class="time-tab active" data-time="morning" data-img="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" data-title="Morning Awakening" data-desc="Soft golden morning sunlight pours through the tall arched casement windows. Pour-over specialty coffee from Subko Roasters brews in the kitchen as Pali Hill bird calls echo outside.">08:00 AM</button>
                    <button class="time-tab" data-time="afternoon" data-img="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_living_room.jpg' ); ?>" data-title="Uninterrupted Flow" data-desc="A dedicated oak workstation, acoustic sound-insulation, and seamless 300 Mbps fiber connectivity. Quiet daily housekeeping has already swept through while you took a client call.">02:30 PM</button>
                    <button class="time-tab" data-time="evening" data-img="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_bedroom_suite.jpg' ); ?>" data-title="Twilight Sanctuary" data-desc="Warm brass sconces dim to an amber glow. Crisp Belgian linen sheets, gentle ocean breezes from Carter Road, and complete serenity away from the metropolis.">08:00 PM</button>
                </div>
                <h3 id="day-story-title">Morning Awakening</h3>
                <p id="day-story-desc">Soft golden morning sunlight pours through the tall arched casement windows. Pour-over specialty coffee from Subko Roasters brews in the kitchen as Pali Hill bird calls echo outside.</p>
                <div class="story-meta">
                    <div><span>Natural Illumination:</span> <strong>Diffused East Sun</strong></div>
                    <div><span>Sound Environment:</span> <strong>Quiet Village Birdsong</strong></div>
                    <div><span>Concierge:</span> <strong style="color: #9DB5A0;">On-Call & Discreet</strong></div>
                </div>
            </div>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "content-day-at-connekt.php"), "w") as f:
    f.write(day_at_connekt_php)

# 7.3 content-amenities.php
amenities_php = """<?php
/**
 * Amenities Grid Template Part
 */
?>
<section class="section amenities-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-kicker">Standard In Every Residence</span>
            <h2 class="section-title">Hotel comforts, <em>home warmth</em></h2>
            <p class="section-sub">Every Connekt home comes thoroughly equipped with everything modern travellers require to work, cook, rest, and entertain effortlessly.</p>
        </div>

        <div class="amenities-grid">
            <div class="amenity-card">
                <div class="amenity-icon">📶</div>
                <h3>300 Mbps Fiber WiFi</h3>
                <p>Dedicated dual-band fiber with backup power failover for seamless remote work.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">🍳</div>
                <h3>Full Gourmet Kitchen</h3>
                <p>Induction hob, microwave, refrigerator, artisanal ceramics & cookware.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">❄️</div>
                <h3>Whisper-Quiet AC</h3>
                <p>Inverter climate control in all bedrooms and living spaces.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">💻</div>
                <h3>Ergonomic Workspace</h3>
                <p>Solid oak desk, ergonomic seating, and warm task lighting.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">✨</div>
                <h3>Daily Housekeeping</h3>
                <p>Unobtrusive fresh linen service, sanitisation, and trash clearing.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">🔑</div>
                <h3>Keyless Smart Check-in</h3>
                <p>Encrypted digital pin lock for effortless late or early arrivals.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">📺</div>
                <h3>4K Smart TV & Audio</h3>
                <p>Ultra HD streaming setup with Netflix, Prime, and soundbar.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">🕒</div>
                <h3>24/7 Concierge Support</h3>
                <p>Local Mumbai hospitality team on WhatsApp for any request.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">🛡️</div>
                <h3>Gated Security</h3>
                <p>Round-the-clock building personnel and CCTV in common corridors.</p>
            </div>
            <div class="amenity-card">
                <div class="amenity-icon">☕</div>
                <h3>Local Provisioning</h3>
                <p>Complimentary artisanal tea, specialty coffee, and mineral water.</p>
            </div>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "content-amenities.php"), "w") as f:
    f.write(amenities_php)

# 7.4 content-map.php
map_php = """<?php
/**
 * Neighbourhood Map Template Part
 */
?>
<section class="section map-section">
    <div class="container">
        <div class="section-header flex-between">
            <div>
                <span class="section-kicker">Bandra West Enclave</span>
                <h2 class="section-title">A neighbourhood to <em>wander</em></h2>
                <p class="section-sub">Tree-canopied lanes, heritage Portuguese villages, artisanal coffee roasters, and the Arabian Sea promenade—all within walking reach.</p>
            </div>
        </div>

        <div class="map-layout">
            <div class="map-visual-box">
                <div class="map-header">
                    <span>🧭 Bandra West Serviced Stays</span>
                    <span>19.0600° N, 72.8300° E</span>
                </div>
                <div class="map-graphic">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bandra_pali_hill_street.jpg' ); ?>" alt="Bandra Pali Hill Neighborhood">
                    <div class="map-pin-overlay">
                        <div class="pin" style="top: 35%; left: 45%;">📍 Pali Hill (₹9,800)</div>
                        <div class="pin" style="top: 55%; left: 52%;">📍 Pali Village (₹7,200)</div>
                        <div class="pin" style="top: 65%; left: 30%;">📍 Carter Road (₹16,800)</div>
                    </div>
                </div>
            </div>
            <div class="map-guide-box">
                <span class="section-kicker">Local Proximity</span>
                <h3>Pali Hill & Village</h3>
                <p>Bandra's green sanctuary celebrated for bougainvillea-framed villas and quiet cafes.</p>
                <div class="proximity-list">
                    <div class="prox-item">
                        <span>Subko Coffee Roasters</span>
                        <span class="walk-badge">4 min walk</span>
                    </div>
                    <div class="prox-item">
                        <span>Pali Bhavan Dining</span>
                        <span class="walk-badge">7 min walk</span>
                    </div>
                    <div class="prox-item">
                        <span>Carter Road Promenade</span>
                        <span class="walk-badge">12 min walk</span>
                    </div>
                    <div class="prox-item">
                        <span>Veronica's Deli & Bakery</span>
                        <span class="walk-badge">5 min walk</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "content-map.php"), "w") as f:
    f.write(map_php)

# 7.5 content-stories.php
stories_php = """<?php
/**
 * Guest Stories Navy Band Template Part
 */
?>
<section class="section guest-stories-section">
    <div class="container">
        <div class="section-header">
            <span class="section-kicker" style="color: #B89B72;">Guest Experiences</span>
            <h2 class="section-title" style="color: #FAF6F0;">Stories from the <em style="color: #F8E1E8;">global traveller</em></h2>
        </div>

        <div class="stories-box">
            <div class="story-author">
                <div class="author-avatar">SR</div>
                <div class="author-info">
                    <h4>Siddharth & Rhea Rao</h4>
                    <p class="role">Creative Directors & Filmmakers [EDIT]</p>
                    <p class="stayed">The Arched Haven at Pali Hill · 60 nights</p>
                </div>
            </div>
            <div class="story-quote">
                <blockquote>
                    “We had a two-month production schedule across Mehboob Studios and Bandra locations. Connekt gave us a home where we could hold script readings in natural sunlight and unwind with quiet tea on the balcony after 14-hour days.”
                </blockquote>
                <p class="compliance-note">
                    [Notice: Testimonial details are representative placeholders. Use real guest names and photos only with their written permission]
                </p>
            </div>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "content-stories.php"), "w") as f:
    f.write(stories_php)

# 7.6 content-offer.php
offer_php = """<?php
/**
 * Offer Banner Template Part
 */
?>
<section class="section offer-section">
    <div class="container">
        <div class="offer-card">
            <div class="offer-left">
                <div class="scallop-badge">
                    <span>SAVE</span>
                    <strong>15%</strong>
                    <span>OFF</span>
                </div>
                <div>
                    <span class="offer-kicker">Limited Launch Invitation · [Confirm Terms]</span>
                    <h3 class="offer-title">Experience Connekt Homes this season</h3>
                    <p class="offer-desc">Enjoy 15% savings across all Pali Hill and Bandra serviced residences when booking directly online.</p>
                </div>
            </div>
            <div class="offer-right">
                <div class="code-box">
                    <span>PROMO CODE</span>
                    <code>CONNEKT15</code>
                </div>
                <a href="<?php echo esc_url( home_url( '/stays' ) ); ?>" class="btn-primary">Claim & Book &rarr;</a>
            </div>
        </div>
    </div>
</section>
"""
with open(os.path.join(THEME_DIR, "template-parts", "content-offer.php"), "w") as f:
    f.write(offer_php)

# 8. All other page templates
# 8.1 page-stays.php
page_stays_php = """<?php
/**
 * Template Name: Stays Catalog
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Short-Term Serviced Stays</span>
        <h1 class="page-title">Available Homes in Bandra West</h1>
        <p class="page-desc">Explore handpicked 1 BHK, 2 BHK, and penthouses with hotel care and full kitchens.</p>
    </div>

    <?php get_template_part( 'template-parts/stay-card' ); ?>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-stays.php"), "w") as f:
    f.write(page_stays_php)

# 8.2 single-stay.php
single_stay_php = """<?php
/**
 * Single Stay Template
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="stay-detail-container container">
    <div class="stay-header">
        <span class="section-kicker">Pali Hill · 2 BHK</span>
        <h1 class="stay-title"><?php the_title(); ?></h1>
        <p class="stay-meta">★ 4.97 (48 reviews) · Up to 4 guests · 2 bedrooms · 2 bathrooms · 1,130 sq ft</p>
    </div>

    <div class="stay-gallery-grid">
        <div class="gallery-main">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Main Photo">
        </div>
        <div class="gallery-thumbs">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_bedroom_suite.jpg' ); ?>" alt="Bedroom">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_kitchen_dining.jpg' ); ?>" alt="Kitchen">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_living_room.jpg' ); ?>" alt="Living Room">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bandra_pali_hill_street.jpg' ); ?>" alt="Street">
        </div>
    </div>

    <div class="stay-content-layout">
        <div class="stay-main-info">
            <div class="concierge-box">
                <strong>On-Ground Concierge Note</strong>
                <p>Our on-ground Pali Hill host is available 8 AM to 10 PM. Fresh local sourdough and pour-over coffee beans await in the pantry on arrival.</p>
            </div>

            <h2>About this home</h2>
            <p>Tucked away along the serene bougainvillea-framed streets of Pali Hill, this expansive two-bedroom apartment offers a sanctuary of calm amidst Mumbai’s creative pulse. Featuring tall arched floor-to-ceiling glass doors, natural travertine accents, custom fluted oak cabinetry, and an open layout bathed in gentle morning light.</p>

            <h2>Where you'll sleep</h2>
            <div class="sleeping-grid">
                <div class="sleeping-card">
                    <h4>Primary Suite</h4>
                    <p>King bed · 100% Belgian flax linen, ergonomic mattress, ensuite walk-in rain shower</p>
                </div>
                <div class="sleeping-card">
                    <h4>Guest Suite</h4>
                    <p>Queen bed · Custom oak frame, blackout drapes, quiet courtyard garden views</p>
                </div>
            </div>

            <h2>House rules & Cancellation</h2>
            <ul class="rules-list">
                <li>Check-in: 3:00 PM onwards / Check-out: 11:00 AM</li>
                <li>Strictly non-smoking interior</li>
                <li>Government ID required for all guests prior to keycode dispatch [EDIT]</li>
                <li>Flexible cancellation: Full refund up to 48 hours prior to check-in</li>
            </ul>
        </div>

        <div class="stay-booking-sidebar">
            <div class="booking-card">
                <div class="booking-rate"><strong>₹9,800</strong> <span>/ night</span></div>
                <form action="<?php echo esc_url( home_url( '/checkout' ) ); ?>" method="GET" class="booking-form">
                    <div class="form-group">
                        <label>Check-in / Check-out</label>
                        <input type="text" value="3 nights (Flexible dates)" readonly>
                    </div>
                    <div class="form-group">
                        <label>Guests</label>
                        <input type="text" value="2 Guests" readonly>
                    </div>
                    <div class="price-breakdown">
                        <div><span>₹9,800 × 3 nights</span> <span>₹29,400</span></div>
                        <div><span>Housekeeping fee</span> <span>₹1,500</span></div>
                        <div><span>GST (18%)</span> <span>₹5,562</span></div>
                        <div class="total-row"><span>Total</span> <strong>₹36,462</strong></div>
                    </div>
                    <button type="submit" class="btn-primary full-width">Reserve Residence</button>
                    <p class="booking-note">You won't be charged yet · Free cancellation</p>
                </form>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "single-stay.php"), "w") as f:
    f.write(single_stay_php)

# 8.3 page-checkout.php
page_checkout_php = """<?php
/**
 * Template Name: Checkout Flow
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="checkout-header text-center">
        <span class="section-kicker">Guaranteed Reservation</span>
        <h1 class="page-title">Complete Your Booking</h1>
        <p class="page-desc">3-step encrypted checkout. Valid government ID required at check-in [EDIT].</p>
    </div>

    <div class="checkout-layout">
        <div class="checkout-form-box">
            <h3>01. Guest Details</h3>
            <div class="form-row">
                <div class="form-col"><label>Full Name *</label><input type="text" placeholder="e.g. Swastik Sharma"></div>
                <div class="form-col"><label>Email Address *</label><input type="email" placeholder="swastik@example.com"></div>
            </div>
            <div class="form-row">
                <div class="form-col"><label>Phone / WhatsApp *</label><input type="tel" placeholder="+91 98XXX XXXXX"></div>
                <div class="form-col"><label>Country</label><input type="text" value="India"></div>
            </div>

            <h3 style="margin-top: 30px;">02. Concierge Additions</h3>
            <label class="checkbox-item"><input type="checkbox"> Early Check-in from 11 AM (+₹1,200)</label>
            <label class="checkbox-item"><input type="checkbox"> Airport Chauffeur Transfer (+₹1,800)</label>
            <label class="checkbox-item"><input type="checkbox"> Artisanal Welcome Pantry Hamper (+₹1,500)</label>

            <h3 style="margin-top: 30px;">03. Payment Simulation</h3>
            <label class="radio-item"><input type="radio" name="pay" checked> Instant UPI (Google Pay, PhonePe, Paytm)</label>
            <label class="radio-item"><input type="radio" name="pay"> Credit / Debit Card (Zero international markup)</label>
            <label class="radio-item"><input type="radio" name="pay"> Pay 30% Now, Balance at Check-in</label>

            <a href="<?php echo esc_url( home_url( '/confirmed' ) ); ?>" class="btn-primary" style="margin-top: 30px; display: block; text-align: center;">
                Confirm Reservation &rarr;
            </a>
        </div>

        <div class="checkout-summary-box">
            <h3>Stay Summary</h3>
            <p><strong>The Arched Haven at Pali Hill</strong></p>
            <p>Pali Hill, Bandra West, Mumbai</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid rgba(20,33,61,0.1);">
            <div class="price-breakdown">
                <div><span>Accommodation (3 nights)</span> <span>₹29,400</span></div>
                <div><span>Housekeeping</span> <span>₹1,500</span></div>
                <div><span>GST (18%)</span> <span>₹5,562</span></div>
                <div class="total-row"><span>Total</span> <strong>₹36,462</strong></div>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-checkout.php"), "w") as f:
    f.write(page_checkout_php)

# 8.4 page-confirmed.php
page_confirmed_php = """<?php
/**
 * Template Name: Booking Confirmation
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container text-center">
    <div class="confirmed-card">
        <div class="check-icon">✓</div>
        <span class="section-kicker">Reservation Confirmed</span>
        <h1 class="page-title">We look forward to hosting you</h1>
        <p class="page-desc">Booking Reference: <strong>CNK-829143</strong>. Digital keycode instructions have been dispatched.</p>
        <div class="confirmed-actions">
            <a href="https://wa.me/919800000000" class="btn-secondary">Share on WhatsApp</a>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary">Return to Homepage</a>
        </div>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-confirmed.php"), "w") as f:
    f.write(page_confirmed_php)

# 8.5 page-experiences.php
page_experiences_php = """<?php
/**
 * Template Name: Experiences & Guide
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Local Curation</span>
        <h1 class="page-title">The Connekt Neighbourhood Guide</h1>
        <p class="page-desc">Our insider journal of where to drink the finest espresso, discover hidden heritage squares, and take sunset strolls along the Arabian Sea.</p>
    </div>

    <div class="guide-grid">
        <div class="guide-card">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/bandra_pali_hill_street.jpg' ); ?>" alt="Subko Coffee">
            <h3>Subko Coffee Roasters & Bakehouse</h3>
            <p>Single-origin roast coffee from tribal estates across the Western Ghats paired with twice-baked podi croissants in a 19th-century cottage.</p>
            <span class="guide-badge">4 min walk from Pali Hill Stays</span>
        </div>
        <div class="guide-card">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apartment_living_room.jpg' ); ?>" alt="Veronica's">
            <h3>Veronica’s Sandwich Shop</h3>
            <p>Housed in the restored St. Jude Bakery, serving legendary house-cured pastrami and natural wines amidst vibrant wall frescoes.</p>
            <span class="guide-badge">2 min walk from Ranwar Atelier</span>
        </div>
        <div class="guide-card">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Carter Road">
            <h3>Carter Road Seafront Promenade</h3>
            <p>A 1.6 km pedestrian walkway facing the open Arabian Sea. Watch local dogs run at twilight and catch cool maritime breezes.</p>
            <span class="guide-badge">1 min walk from Carter Penthouse</span>
        </div>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-experiences.php"), "w") as f:
    f.write(page_experiences_php)

# 8.6 page-corporate.php
page_corporate_php = """<?php
/**
 * Template Name: Corporate & Long Stays
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Executive Living</span>
        <h1 class="page-title">Corporate & Extended Stays in Bandra</h1>
        <p class="page-desc">Eliminate hotel fatigue for visiting founders, consultants, and relocated executive teams. Fully serviced residential apartments designed for deep focus and restorative downtime.</p>
    </div>

    <div class="pillars-grid" style="margin-bottom: 50px;">
        <div class="pillar-card">
            <h3>300 Mbps Fiber WiFi</h3>
            <p>Unthrottled mesh network, ergonomic workstations, and silent inverter generator failover.</p>
        </div>
        <div class="pillar-card">
            <h3>Corporate GST Invoicing</h3>
            <p>Consolidated corporate monthly billing with compliant GST tax input credits.</p>
        </div>
        <div class="pillar-card">
            <h3>Preferential Monthly Pricing</h3>
            <p>Substantial tiered tariff discounts for 14+ night bookings, flexible rolling extensions.</p>
        </div>
    </div>

    <div class="contact-form-box">
        <h2>Request an Executive Proposal</h2>
        <form>
            <div class="form-row">
                <div class="form-col"><label>Company Name *</label><input type="text"></div>
                <div class="form-col"><label>Contact Person *</label><input type="text"></div>
            </div>
            <div class="form-row">
                <div class="form-col"><label>Work Email *</label><input type="email"></div>
                <div class="form-col"><label>Phone / WhatsApp *</label><input type="tel"></div>
            </div>
            <button type="button" class="btn-primary" style="margin-top: 15px;">Submit Corporate Inquiry</button>
        </form>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-corporate.php"), "w") as f:
    f.write(page_corporate_php)

# 8.7 page-list-property.php
page_list_php = """<?php
/**
 * Template Name: List Your Property
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">For Property Owners</span>
        <h1 class="page-title">Let your home earn with Connekt</h1>
        <p class="page-desc">We partner with discerning apartment owners in Bandra, Pali Hill, and South Mumbai. Enjoy 2-3x traditional residential rental yields with zero day-to-day tenant hassles.</p>
    </div>

    <div class="pillars-grid" style="margin-bottom: 50px;">
        <div class="pillar-card">
            <span class="pillar-num">01</span>
            <h3>Curation & Styling Audit</h3>
            <p>Our interior team assists with styling, linen procurement, and architectural photography.</p>
        </div>
        <div class="pillar-card">
            <span class="pillar-num">02</span>
            <h3>Vetted Premium Guests</h3>
            <p>We list your home across Connekt’s private guest network and international corporate accounts.</p>
        </div>
        <div class="pillar-card">
            <span class="pillar-num">03</span>
            <h3>Hands-Off Net Yields</h3>
            <p>Daily housekeeping, maintenance, and direct monthly bank payouts on the 5th.</p>
        </div>
    </div>

    <div class="contact-form-box">
        <h2>List Your Property for Evaluation</h2>
        <form>
            <div class="form-row">
                <div class="form-col"><label>Owner Name *</label><input type="text"></div>
                <div class="form-col"><label>Phone Number *</label><input type="tel"></div>
            </div>
            <div class="form-row">
                <div class="form-col"><label>Email *</label><input type="email"></div>
                <div class="form-col"><label>Neighborhood in Mumbai</label><input type="text" placeholder="e.g. Pali Hill"></div>
            </div>
            <button type="button" class="btn-primary" style="margin-top: 15px;">Request Property Walkthrough</button>
        </form>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-list-property.php"), "w") as f:
    f.write(page_list_php)

# 8.8 page-about.php, page-careers.php, page-contact.php, page-policies.php, 404.php, index.php
page_about_php = """<?php
/**
 * Template Name: About Connekt Homes
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Our Story</span>
        <h1 class="page-title">Homes with a soul, crafted for the global traveller.</h1>
        <p class="page-desc">Connekt Homes was founded to bridge the gap between impersonal hotel rooms and unpredictable vacation rentals. Where you stay should feel like your own sanctuary.</p>
    </div>
    <div class="about-hero-img soft-arch" style="margin-bottom: 50px; overflow: hidden; height: 420px;">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero_apartment_mumbai.jpg' ); ?>" alt="Connekt Living Room" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-about.php"), "w") as f:
    f.write(page_about_php)

page_careers_php = """<?php
/**
 * Template Name: Careers
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Join Connekt Homes</span>
        <h1 class="page-title">We’re hiring: grow with us</h1>
        <p class="page-desc">Help us redefine boutique hospitality in Mumbai.</p>
    </div>

    <div class="career-card" style="background: white; border: 1px solid rgba(20,33,61,0.1); border-radius: 20px; padding: 40px; margin-bottom: 40px;">
        <span class="badge-hot" style="display: inline-block; margin-bottom: 10px;">Priority Opening</span>
        <h2>Venue Manager – Serviced Residences</h2>
        <p><strong>Location:</strong> Pali Hill & Bandra West, Mumbai · Full-Time [EDIT]</p>
        <p style="margin-top: 15px;">Oversee daily turnover operations and cleanliness audits across Bandra properties. Coordinate digital check-ins, guest arrival hampers, and rapid WhatsApp inquiries.</p>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-careers.php"), "w") as f:
    f.write(page_careers_php)

page_contact_php = """<?php
/**
 * Template Name: Contact
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Get in Touch</span>
        <h1 class="page-title">We are here to welcome you</h1>
        <p class="page-desc">Whether inquiring about an upcoming reservation, long-term corporate arrangement, or listing your Bandra home, our hospitality team is at your service.</p>
    </div>
    <div class="contact-form-box">
        <h2>Send a Message</h2>
        <form>
            <div class="form-row">
                <div class="form-col"><label>Your Name *</label><input type="text"></div>
                <div class="form-col"><label>Email *</label><input type="email"></div>
            </div>
            <div class="form-group" style="margin-top: 15px;">
                <label>Message *</label>
                <textarea rows="4" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(20,33,61,0.15);"></textarea>
            </div>
            <button type="button" class="btn-primary" style="margin-top: 15px;">Send Concierge Message</button>
        </form>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-contact.php"), "w") as f:
    f.write(page_contact_php)

page_policies_php = """<?php
/**
 * Template Name: Policies
 *
 * @package Connekt_Homes
 */
get_header();
?>
<div class="page-container container">
    <div class="page-header">
        <span class="section-kicker">Governance</span>
        <h1 class="page-title">Policies & Guest Standards</h1>
    </div>
    <div style="background: white; border-radius: 20px; padding: 40px; border: 1px solid rgba(20,33,61,0.1);">
        <h3>Cancellation & Refund Framework [EDIT]</h3>
        <p>Full refund (100%) up to 48 hours prior to check-in. Cancellations within 48 hours receive a 50% refund on unstayed nights.</p>
        <h3 style="margin-top: 25px;">House Rules & Quiet Hours [EDIT]</h3>
        <p>Quiet hours observed from 10:30 PM to 7:00 AM. Strictly non-smoking interiors. Verified government photo ID required.</p>
    </div>
</div>
<?php get_footer(); ?>
"""
with open(os.path.join(THEME_DIR, "page-policies.php"), "w") as f:
    f.write(page_policies_php)

# 404.php & index.php
index_php = """<?php
get_header();
?>
<div class="container page-container">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            the_content();
        endwhile;
    endif;
    ?>
</div>
<?php
get_footer();
"""
with open(os.path.join(THEME_DIR, "index.php"), "w") as f:
    f.write(index_php)

not_found_php = """<?php
get_header();
?>
<div class="container page-container text-center" style="padding: 100px 20px;">
    <span class="section-kicker">Page Not Found · 404</span>
    <h1 class="page-title">You have wandered off the map</h1>
    <p class="page-desc">Return to our Bandra home to explore available short-term stays.</p>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary" style="margin-top: 20px; display: inline-block;">Return Home</a>
</div>
<?php
get_footer();
"""
with open(os.path.join(THEME_DIR, "404.php"), "w") as f:
    f.write(not_found_php)

# 9. assets/css/theme.css
theme_css = """/* Connekt Homes Theme Structural Stylesheet */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.announcement-bar {
  background-color: var(--color-navy);
  color: var(--color-ivory);
  padding: 8px 16px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(250, 246, 240, 0.1);
}

.announcement-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.promo-pill {
  background: rgba(217, 58, 107, 0.25);
  border: 1px solid rgba(217, 58, 107, 0.5);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(250, 246, 240, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(20, 33, 61, 0.08);
  padding: 16px 0;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 14px;
  font-weight: 500;
}

.main-nav a:hover {
  color: var(--color-pink);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-pink);
  color: white !important;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #c42f5d;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(20, 33, 61, 0.25);
  color: var(--color-navy) !important;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--color-sand);
}

.hero-section {
  padding: 40px 0 60px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-sand);
  color: var(--color-navy);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-pink);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(38px, 5.5vw, 68px);
  font-weight: 400;
  color: var(--color-navy);
  line-height: 1.1;
  margin-bottom: 20px;
}

.hero-title em {
  font-style: italic;
}

.hero-subtext {
  font-size: 16px;
  color: rgba(43, 47, 58, 0.8);
  max-width: 520px;
  margin-bottom: 28px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
}

.arched-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  box-shadow: 0 25px 60px rgba(20, 33, 61, 0.14);
}

.arched-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(20, 33, 61, 0.85), transparent);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.search-card-wrapper {
  margin-top: 40px;
}

.search-card {
  background: white;
  border-radius: 18px;
  padding: 12px;
  box-shadow: 0 20px 60px rgba(20, 33, 61, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
  align-items: center;
  border: 1px solid rgba(20, 33, 61, 0.08);
}

.search-col {
  padding: 10px 14px;
  background: #FAF6F0;
  border-radius: 12px;
}

.search-col label {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
  color: var(--color-brass);
}

.search-col select,
.search-col input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-navy);
  outline: none;
}

.trust-chips {
  margin-top: 14px;
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 12px;
  color: rgba(43, 47, 58, 0.7);
}

.section {
  padding: 80px 0;
  border-top: 1px solid rgba(20, 33, 61, 0.08);
}

.section-kicker {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 600;
  color: var(--color-brass);
  display: block;
  margin-bottom: 8px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 40px;
  font-weight: 400;
  color: var(--color-navy);
}

.section-title em {
  font-style: italic;
}

.editorial-quote {
  font-family: var(--font-serif);
  font-size: clamp(24px, 3.2vw, 36px);
  color: var(--color-navy);
  max-width: 900px;
  margin: 20px auto;
  line-height: 1.4;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 700px;
  margin: 40px auto 0;
  padding-top: 30px;
  border-top: 1px solid rgba(20, 33, 61, 0.1);
}

.stat-num {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 600;
  color: var(--color-navy);
}

.stat-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(43, 47, 58, 0.7);
}

.stays-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.stay-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(20, 33, 61, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.stay-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(20, 33, 61, 0.08);
}

.card-img-wrap {
  position: relative;
  aspect-ratio: 4/3;
}

.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(20, 33, 61, 0.8);
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
}

.card-content {
  padding: 18px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-brass);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.card-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.card-specs {
  font-size: 12px;
  color: rgba(43, 47, 58, 0.7);
  margin-bottom: 14px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(20, 33, 61, 0.08);
}

.card-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-pink);
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.pillar-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(20, 33, 61, 0.08);
}

.pillar-num {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: bold;
  color: var(--color-brass);
  display: block;
  margin-bottom: 12px;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.amenity-card {
  background: #FAF6F0;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(20, 33, 61, 0.06);
}

.amenity-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.guest-stories-section {
  background: var(--color-navy);
  color: white;
}

.stories-box {
  background: #1C2C4E;
  border-radius: 24px;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

.author-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #FAF6F0;
  color: var(--color-navy);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 14px;
}

.story-quote blockquote {
  font-family: var(--font-serif);
  font-size: 22px;
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 20px;
}

.compliance-note {
  font-size: 11px;
  opacity: 0.5;
}

.offer-card {
  background: white;
  border: 1px solid rgba(217, 58, 107, 0.25);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.offer-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.scallop-badge {
  width: 75px;
  height: 75px;
  background: var(--color-teal);
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.code-box {
  background: #FAF6F0;
  padding: 10px 18px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgba(20, 33, 61, 0.1);
}

.insta-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-top: 30px;
}

.insta-tile {
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
}

.insta-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.site-footer {
  background: var(--color-navy);
  color: var(--color-ivory);
  padding: 70px 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding-bottom: 50px;
  border-bottom: 1px solid rgba(250, 246, 240, 0.1);
}

.footer-heading {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-brass);
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
  font-size: 13px;
  opacity: 0.8;
}

.footer-bottom {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.6;
}

.floating-whatsapp {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 99;
}

.whatsapp-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35);
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .search-card {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .insta-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
"""
with open(os.path.join(THEME_DIR, "assets", "css", "theme.css"), "w") as f:
    f.write(theme_css)

# 10. assets/js/main.js
main_js = """/**
 * Connekt Homes Interactive JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // Time story switcher
    const timeTabs = document.querySelectorAll('.time-tab');
    const storyImg = document.getElementById('day-story-img');
    const storyTitle = document.getElementById('day-story-title');
    const storyDesc = document.getElementById('day-story-desc');

    if (timeTabs.length && storyImg) {
        timeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                timeTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                const newImg = this.getAttribute('data-img');
                const newTitle = this.getAttribute('data-title');
                const newDesc = this.getAttribute('data-desc');

                storyImg.style.opacity = '0.4';
                setTimeout(() => {
                    storyImg.src = newImg;
                    storyTitle.textContent = newTitle;
                    storyDesc.textContent = newDesc;
                    storyImg.style.opacity = '1';
                }, 150);
            });
        });
    }
});
"""
with open(os.path.join(THEME_DIR, "assets", "js", "main.js"), "w") as f:
    f.write(main_js)

# 11. README.md
readme_md = """# Connekt Homes – WordPress Theme

A premium, production-grade WordPress theme designed specifically for **Connekt Homes** (`@connekt_homes`), a luxury serviced apartment brand for short-term stays in Bandra & Pali Village, Mumbai.

## Theme Architecture & Contents
- `style.css`: Theme metadata header, color palette CSS variables, typography rules, soft arch border utilities, and responsive layout.
- `screenshot.png`: High-resolution theme preview for WordPress Admin.
- `functions.php`: Enqueues Google Fonts (Newsreader + Plus Jakarta Sans), registers primary/footer menus, and registers the custom post type for `stay` (Serviced Apartments).
- `header.php`: Announcement bar with CONNEKT15 promo code, exact SVG wordmark with pink location pin, navigation bar, and primary CTA.
- `footer.php`: Deep navy editorial footer, navigation columns, concierge desk details, WhatsApp floating button.
- `front-page.php`: Full homepage layout implementing all 14 brand sections:
  1. Hero with soft-arched window visual
  2. Editorial brand statement with 3 stats
  3. Featured residences cards
  4. Four Pillars ("Homes, not rooms", "Hotel-grade care", "Live like a local", "Stay as long as you like")
  5. A Day at Connekt pinned time switcher
  6. Standard amenities grid
  7. Neighbourhood proximity map
  8. Navy band guest stories
  9. Offer banner with copyable promo code
  10. Instagram 6-tile grid (@connekt_homes)
- `template-parts/`: Modular sub-templates for clean code maintenance.
- `page-stays.php`: Stays catalog and search results.
- `single-stay.php`: Stay detail template with photo gallery, room specs, and sticky booking card.
- `page-checkout.php`: 3-step checkout flow (Guest info, Extras, Payment options).
- `page-confirmed.php`: Confirmation page with booking ID and WhatsApp share.
- `page-experiences.php`: Local neighbourhood guide.
- `page-corporate.php`: Corporate & long stays with inquiry form.
- `page-list-property.php`: Owner onboarding page with yield calculator.
- `page-about.php`, `page-careers.php`, `page-contact.php`, `page-policies.php`, `404.php`.
- `assets/images/`: 5 high-resolution architectural interior and street photography assets.

## WordPress Installation Instructions
1. In your WordPress admin dashboard, go to **Appearance > Themes**.
2. Click **Add New Theme**, then **Upload Theme**.
3. Choose this `connekt-homes-wordpress-theme.zip` file and click **Install Now**.
4. Click **Activate**.
5. Set your homepage under **Settings > Reading > A static page** and select a page using the *Front Page* template.
"""
with open(os.path.join(THEME_DIR, "README.md"), "w") as f:
    f.write(readme_md)

# 12. Create the ZIP Archive
zip_path = os.path.join(OUTPUT_DIR, ZIP_NAME)
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(THEME_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            # archive name relative to the theme root folder 'connekt-homes/'
            rel_path = os.path.join("connekt-homes", os.path.relpath(full_path, THEME_DIR))
            zipf.write(full_path, rel_path)

print(f"Successfully generated complete WordPress theme zip at: {zip_path}")
print(f"Zip file size: {os.path.getsize(zip_path)} bytes")
