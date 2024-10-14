const CircuitBreaker = require("opossum");

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 5000,
};

const createCircuitBreaker = (service) => {
  const breaker = new CircuitBreaker(service, options);

  breaker.on("open", () => {
    console.error("Circuit breaker is now OPEN. Too many failures.");
  });

  breaker.on("close", () => {
    console.log(
      "Circuit breaker is now CLOSED. The service is back to normal."
    );
  });

  breaker.on("halfOpen", () => {
    console.log("Circuit breaker is now HALF-OPEN. Trialing the service.");
  });

  breaker.on("failure", (error) => {
    console.error("Failure detected by the circuit breaker: ", error.message);
  });

  return breaker;
};

module.exports = createCircuitBreaker;
