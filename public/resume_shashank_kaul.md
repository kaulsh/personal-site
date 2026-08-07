# Shashank Kaul

Chennai, India · [GitHub ↗](https://www.github.com/kaulsh) · [LinkedIn ↗](https://www.linkedin.com/in/kaulshashank) · [kaulshashank96@gmail.com](mailto:kaulshashank96@gmail.com) · [+91 8754607141](tel:+918754607141)

## SUMMARY

A customer-obsessed software engineer with 8 years of experience building reliable AI products and distributed systems. Deep experience in text and voice agent systems, context engineering, evaluation frameworks, along with reliable backend systems that stitch together business requirements and engineering judgment. Expert in TypeScript and scalable database architecture (SQL/NoSQL), with a proven track record of taking products from zero-to-one and leading highly focused engineering teams.

## SKILLS

- Languages: TypeScript, Python, React/JS
- Frameworks: Express, Nest.js, Next.js, Vite, Flask and FastAPI
- Databases: PostgreSQL, MongoDB and MySQL
- AI Engineering: LLMs, LangChain & LangGraph, Context Engineering (with pgvector, Voyage AI, OCR/LLM Sherpa, Mem0), Evals (with promptfoo and Langfuse), Voice Agents (with LiveKit), Fine-tuning (with HuggingFace Transformers)
- Other Systems: RabbitMQ, AWS (ECR, EC2, EKS, KMS, SQS, SES, Lambda, SageMaker AI), Grafana & Prometheus, Docker, Git, CI/CD (GitHub Actions and CircleCI)

## WORK EXPERIENCE

### Co-founder, Engineering

*Aug 2023 — May 2026* · [Score AI](https://www.usescore.ai) (Chennai, Remote)

AI agents for quality assurance in customer support teams, enabling more in-depth insights to find coachable moments.

- Owned the product and technical roadmap, shipping an AI agent from zero to production that automated quality assurance in customer experience teams at major consumer brands like Hopscotch, Mad Paws and The Souled Store
- Integrated with help desk, call center as a service, ticketing and CRM platforms to automate compliance audits and verify escalations for
100k+ customer interactions, reducing manual QA overhead from 8+ hours/week to under 1 hour/week
- Engineered a multi-source context pipeline for PDFs, Google Docs/Slides, and Logistics Tracking APIs to ground our custom AI agent in high-quality context, reaching ~90% alignment with human QA audits.
- Built a real-time voice agent for coaching using an STT→LLM→TTS pipeline (Deepgram, Gemini, ElevenLabs) that simulates customer phone calls, cutting onboarding ramp time and enabling async coaching without requiring supervisor availability.

Stack: TypeScript, Express.js, PostgreSQL, RabbitMQ, LangGraph, Langfuse, LiveKit, AWS, GCP

### Senior Backend Engineer; Contracts, Invoicing & Payroll Processing

*Aug 2022 — Jul 2023* · [Panther](https://wellfound.com/company/panther-global) (US, Remote)

Global payments and compliance company, helping companies run payroll in over 150 countries.

- Built payroll processing systems using double-entry ledger architecture, finite state machine based life-cycle management, and idempotent consumers, ensuring exactly-once processing and zero discrepancies across 150+ countries
- Extended the payroll system to process pay-ins from clients using Stripe, and automated fund disbursement to over 1,000 contractors
- Designed our RabbitMQ-based job batching system and implemented bulk exports of contracts and invoices using AWS S3 multipart uploads for saving hundreds of PDFs as zip archives
- Integrated third-party AI-based fraud detection into the payments stack, proactively tagging and mitigating wire fraud and reducing fraudulent transaction exposure
- Shipped features and bug fixes in invoice cycle scheduling and employment contract generation.

Stack: TypeScript, Nest.js (Microservices), GraphQL, MySQL, RabbitMQ, AWS, Kubernetes on EKS

### Senior Software Engineer; Platform & Infrastructure

*Jan 2021 — Jul 2022* · [Klenty](https://www.klenty.com) (Chennai, On-site)

Sales engagement platform automating and scaling multichannel outreach for small and large companies.

- Mentored a 6-person squad of devs and automation testers focused on scalability where we drove technical decisions that directly improved product performance and stability while scaling from 500 to 5000 customers
- Redesigned MongoDB collection document structures and indexes, cutting critical query latency from 30+ seconds to under 1 second on 1B-document collections (~1 TB), unblocking high-volume customers facing timeouts
- Designed in-house database clustering to partition customer data by volume and geography, improving stability by distributing 2 TB across two regional databases
- Spearheaded our AngularJS to React migration, setting the basis for our component library and routing that the rest of the team used to transition screens to React.

Stack: JavaScript, TypeScript, React, Express.js, MongoDB, RabbitMQ, AWS, Heroku

### Founding Software Engineer
*Jan 2018 — Dec 2020* · [Klenty](https://www.klenty.com) (Chennai, On-site)

- Core maintainer of our graph-based outreach campaign scheduler, using a 2D canvas library (Konva) on the front end and a custom-built graph node execution worker on the back end, that allowed customers to build complex conditional outreach sequences
- Built self-serve billing from scratch (using Stripe) handling both base and custom enterprise plans, enabling the sales team to close deals without engineering involvement for plan configuration
- Built and owned our email reply tracking service scanning 10,000+ email inboxes every 15 minutes; enabling our customers to set up complex business workflows in their email campaigns with relation to replies, auto-replies and bounces.

Stack: JavaScript, AngularJS, Express.js, MongoDB, RabbitMQ, Heroku

## PROJECTS

### Vesta (https://github.com/kaulsh/vesta)
A Random Forest machine learning model to predict menstrual cycles within a 2-day confidence interval.

### Minecraft Proxy (https://github.com/kaulsh/minecraft-tcp-proxy)
A TCP-layer proxy that parses Minecraft Protocol packets, enabling smart routing and custom authentication between client and server.

### Ark For MongoDB (https://github.com/makeark/ark)
GUI with a full script editor (mongosh) and intellisense for enhanced database management. Supports inline document editing.

## EDUCATION

### Bachelor's of Technology in Computer Science
*SRM University, Chennai, India · Jul 2014 — Jun 2018*
