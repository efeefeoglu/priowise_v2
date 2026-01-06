
import os
from playwright.sync_api import sync_playwright

def verify_roadmap(page):
    # 1. Navigate to the roadmap page
    page.goto("http://localhost:3000/dashboard/roadmap")

    # Wait for the page to load - check for the header
    page.wait_for_selector("h1:has-text('Feature Roadmap')")

    # 2. Click "Add Feature" button
    page.click("button:has-text('Add Feature')")

    # 3. Wait for modal
    page.wait_for_selector("text=Add New Feature")

    # 4. Fill the form
    page.fill("input[placeholder='e.g. Dark Mode']", "Test Feature")
    page.fill("textarea[placeholder='Describe the feature...']", "This is a test feature description.")

    # 5. Add a tag
    page.fill("input[placeholder='Type and press Enter to add tags']", "Frontend")
    page.press("input[placeholder='Type and press Enter to add tags']", "Enter")

    # 6. Take a screenshot of the modal filled out
    page.screenshot(path="verification/roadmap_modal.png")

    # 7. Submit the form
    page.click("button:has-text('Create Feature')")

    # 8. Wait for the new record to appear in the table (assuming backend mocking or success)
    # Since we don't have a real backend responding, we might just see the loading state or success if mocked.
    # However, for verification of UI, the modal screenshot is good.
    # Let's try to wait a bit and take another screenshot of the table.
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/roadmap_table.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # We need to bypass Clerk auth if possible, or simulate it.
        # Since bypassing is hard without setup, we might hit the sign-in page.
        # If we hit sign-in, we can't verify the internal page easily without credentials.
        # However, we can check if we are redirected.

        context = browser.new_context()
        # Mocking auth cookies might be needed if Clerk enforces it strictly.
        # For now, let's see what we get.

        page = context.new_page()
        try:
            verify_roadmap(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
