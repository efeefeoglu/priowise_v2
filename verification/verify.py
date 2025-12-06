from playwright.sync_api import sync_playwright

def verify_chat(page):
    # Mock the /api/assessment response
    page.route("**/api/assessment", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='{"currentQuestionIndex": 1, "answers": {"q1": "My Company"}}'
    ))

    # Mock the /api/chat response (in case it's called)
    page.route("**/api/chat", lambda route: route.fulfill(
        status=200,
        body="Chat response mocked"
    ))

    # Navigate to the page
    # Since we can't easily mock the Clerk provider auth state from here without complex setup,
    # we might hit a redirect or unauthorized error if the page protects itself.
    # However, the component calls `useUser` hook.
    # If the ClerkProvider is not configured, it throws an error.

    # We will try to navigate and see if we can at least see the loading state or the error.
    try:
        page.goto("http://localhost:3000/dashboard/assessment")
        page.wait_for_timeout(3000) # Wait for React to hydrate and potentially error out
        page.screenshot(path="verification/verification.png")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_chat(page)
        finally:
            browser.close()
