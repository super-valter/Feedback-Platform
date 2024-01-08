import { wait } from './timeout'; // Replace with the correct path to your wait file

describe('wait function', () => {
  it('should resolve after a specified time', async () => {
    const startTime = Date.now();
    const waitTime = 1000; // 1 second

    await wait(waitTime);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    // Allow a small variance in timing (e.g., 50 milliseconds) due to setTimeout precision
    const allowedVariance = 50;

    expect(elapsedTime).toBeGreaterThanOrEqual(waitTime - allowedVariance);
    expect(elapsedTime).toBeLessThanOrEqual(waitTime + allowedVariance);
  });
});
