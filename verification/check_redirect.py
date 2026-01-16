import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to /admin...")
            page.goto("http://localhost:3000/admin")
            # Wait a bit for redirect
            page.wait_for_timeout(3000)
            print(f"Final URL: {page.url}")

            # Take a screenshot anyway
            page.screenshot(path="verification/redirect.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
