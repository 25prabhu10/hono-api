// Handles requests to /favicon.ico by serving an SVG with the specified emoji.
function serveEmojiFavicon(emoji) {
    return async (c, next) => {
        if (c.req.path === "/favicon.ico") {
            // Serve an SVG with the specified emoji
            // You can change the emoji by passing an image URL
            // Update the Content-Type header to correct MIME type
            c.header("Content-Type", "image/svg+xml");
            return c.body(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="-0.1em" font-size="90">${emoji}</text></svg>`);
        }
        return next();
    };
}
export default serveEmojiFavicon;
