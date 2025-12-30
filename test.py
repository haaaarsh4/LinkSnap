import unittest
import asyncio
import app

VALID_URL="https://github.com/haaaarsh4"
INVALID_URL="haaaarsh4"

class TestURLShortner(unittest.TestCase):
    def test_validate_url_format_invalid_url(self):
        result = asyncio.run(app.validate_long_url_format(longurl=INVALID_URL))
        self.assertFalse(result)
    def test_validate_url_format_valid_url(self):
        result = asyncio.run(app.validate_long_url_format(longurl=VALID_URL))
        self.assertTrue(result)
    def test_validate_url_invalid_url(self):
        result = asyncio.run(app.validate_url(longurl=INVALID_URL))
        self.assertFalse(result)
    def test_validate_url_valid_url(self):
        result = asyncio.run(app.validate_url(longurl=VALID_URL))
        self.assertTrue(result)

if __name__ == "__main__":
    unittest.main()

