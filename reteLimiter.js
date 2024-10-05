// rateLimiter.js

class RateLimiter {
    constructor(delayInMillis) {
        this.delayInMillis = delayInMillis;  // Time delay between requests (in milliseconds)
        this.lastRequestTime = Date.now();   // Initialize last request time
    }

    async waitIfNecessary() {
        const currentTime = Date.now();
        const timeSinceLastRequest = currentTime - this.lastRequestTime;

        if (timeSinceLastRequest < this.delayInMillis) {
            const waitTime = this.delayInMillis - timeSinceLastRequest;
            console.log(`Waiting for ${waitTime} milliseconds before sending the next request...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));  // Wait for the calculated time
        }

        this.lastRequestTime = Date.now();  // Update the time after sending the request
    }
}

module.exports = RateLimiter;
