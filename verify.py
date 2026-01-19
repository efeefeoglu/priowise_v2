
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Give the server a moment to start up and render the page
        await asyncio.sleep(5)
        await page.goto("http://localhost:3000", wait_until="networkidle")
        # Use a more specific locator to target the correct features section
        features_section = page.locator("section:has-text('Strategic Alignment Made Easy')")
        await features_section.screenshot(path="features_screenshot.png")
        await browser.close()

asyncio.run(main())
