Part 6 – Generic Questions 

1. Difference between a process and a thread
A process is an independent running program and it has its own memory and resources.
A thread is a smaller execution unit inside a process, and threads are sharing the same process memory.
So process is more isolated and safe, but thread is faster for creating and switching.
Because threads share memory, proper synchronization is very important.

2. Difference between TCP and UDP
TCP is connection-oriented protocol and it is reliable, ordered, and has retransmission if data is lost.
UDP is connectionless protocol, faster and with lower overhead, but it does not guarantee delivery or order.
If correctness is important (for example web and database), TCP is preferred.
If low latency is important (for example streaming, gaming, DNS), UDP is preferred.

3. What problem docker-compose is solving
docker-compose is helping to define and run multi-container applications in one file.
It solves orchestration issues in development/local setup, like service networking, startup dependency, environment variables, and shared volumes.
Also it gives simple commands like docker-compose up and docker-compose down to start/stop all services together.

4. Difference between logs, metrics, and traces
Logs are event records, and they show what happened at a specific time.
Metrics are numeric values over time, and they show how much/how often (for example CPU, memory, error rate).
Traces are showing full request path across services, including where time was spent from start to end.
All 3 together are needed for good observability: logs for detailed events, metrics for trends and alerts, traces for performance bottlenecks and root cause.

5. What is idempotency and why it is important
Idempotency means if we repeat same operation many times, final result remains same as one time execution.
This is very important for retry and reliability, especially when there is network failure, duplicate message, or job re-run.
Without idempotency, duplicate or wrong data can happen.
In this project, idempotency is handled by unique email constraint and conflict-safe insert, so duplicate users are not inserted.

6. Deploying a change to production - steps

7. Validate the change locally and in CI (tests, lint, build, security checks).

8. Do code review and approval through PR process.

9. Build immutable artifact/image and tag with proper version.

10. Deploy to staging first and run smoke/integration tests.

11. Prepare rollback plan and backups, especially for database migration.

12. Monitor logs, metrics, traces, and business KPIs carefully.

13. If any issue appears, rollback quickly; if stable, complete rollout and document final outcome.

