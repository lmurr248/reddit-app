// src/api/cache.js
const cache = {};
const cacheDuration = 60000; // Cache duration in milliseconds (e.g., 1 minute)

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithCache = async (url) => {
  if (cache[url]) {
    const { timestamp, data } = cache[url];
    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }
  }

  let response;
  for (let retries = 0; retries < 3; retries++) {
    response = await fetch(url);
    if (response.status === 429) {
      await wait(1000); // Wait for 1 second before retrying
      continue;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    break;
  }

  const data = await response.json();
  cache[url] = { timestamp: Date.now(), data };
  return data;
};
