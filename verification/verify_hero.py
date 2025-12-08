from playwright.sync_api import sync_playwright

def verify_hero():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with viewport large enough to trigger desktop view (lg breakpoint is usually 1024px)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            # Navigate to the local server
            page.goto("http://localhost:3000")

            # Wait for the hero section to load
            page.wait_for_selector('h1:has-text("Master Your Product Strategy.")')

            # Take a screenshot of the Hero section
            # We can select the Hero container. It has 'bg-white pt-24 ...'
            # Or just take a full page screenshot.
            page.screenshot(path="verification/hero_screenshot.png", full_page=True)
            print("Screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_hero()
