[GitHub ↗](https://www.github.com/kaulsh) · [LinkedIn ↗](https://www.linkedin.com/in/kaulshashank) · [kaulshashank96@gmail.com](mailto:kaulshashank96@gmail.com) · [+91 8754607141](tel:+918754607141)

# Shashank Kaul

## Software Engineer

A customer-obsessed software engineer with 8 years of experience building reliable AI products and distributed systems. Deep experience in text and voice agent systems, context engineering, evaluation frameworks, along with reliable backend systems that stitch together business requirements and engineering judgement. Expert in TypeScript and scalable database architecture (SQL/NoSQL), with a proven track record of taking products from zero-to-one and leading highly focused engineering teams.

## SKILLS
- Languages & Runtimes: TypeScript (with Node.js, Bun & Browser/Vite) and Python

- Databases: PostgreSQL, MongoDB and MySQL

- AI Engineering: LLMs, Agent Loops, RAG (with pgvector, Voyage AI, OCR/LLM Sherpa, memory using knowledge graphs), Evals (with promptfoo and Langfuse), Voice Agents (with LiveKit), Fine-tuning (with huggingface transformers)

- Other Systems: RabbitMQ, AWS (ECR, EC2, EKS, KMS, SQS, SES, Lambda, SageMaker AI), Grafana & Prometheus

## PROFESSIONAL EXPERIENCE

### Co-founder, Engineering 
*Aug 2023 — May 2026*

#### Score AI (Chennai, Remote)
AI agents for quality assurance in customer support teams, enabling deeper insights to find impactful coach-able moments.

- Designed and launched a production AI agent that automates quality assurance in customer experience teams at major consumer brands like Hopscotch, Madpaws and The Souled Store successfully reaching $15k ARR.
- Automated compliance audits and verified escalations for 100k+ customer interactions, completely eliminating manual QA overhead.
- Engineered a multi-source agentic RAG pipeline (PDFs, Google Docs/Slides, Logistics Tracking APIs) to ground LLM outputs in customer-specific context, directly reducing hallucinations in QA scoring.
- Built a real-time voice agent for coaching using a STT→LLM→TTS pipeline (Deepgram, Gemini, ElevenLabs) that simulates customer calls, enabling reps to practice live conversations with AI-generated personas.
- Fine-tuned Facebook AI's RoBERTa model with synthetic data generated and classified using Gemini Flash Lite for sentiment analysis in customer support interactions. Model was trained on Vertex AI and deployed on AWS SageMaker AI (Serverless Inference Endpoint).

### Senior Backend Engineer, Contracts, Invoicing & Payroll Processing 
*Aug 2022 — Jul 2023*

#### Panther (US, Remote)
Global payments and compliance company, helping companies run payroll in over 150 countries.

- Collaborated on our payroll processing systems which used double-entry ledger architecture, a finite state machine for payment lifecycle states, and idempotent consumers to guarantee exactly-once processing; ensuring financial accuracy transactions in a regulated fin-tech environment.
- Extended the existing payroll system to process pay-ins from clients using Stripe, and forwarding the funds to contractors based on their added payment methods.
- Designed our RabbitMQ-based job batching system queues and exchanges allowing us to implement features such as bulk exports of contracts and invoices; utilizing AWS S3 multi-part uploads of hundreds of PDFs as zip files.
- Integrated third-party AI-based fraud detection into the payments stack, proactively flagging and mitigating wire fraud and reducing fraudulent transaction exposure.
- Shipped features and bug fixes in invoicing cycle scheduling, and employment contract generation.

### Founding Full Stack Engineer → Senior Full Stack Engineer, Scaling & Infrastructure 
*Jul 2018 — Jul 2022*

#### Klenty (Chennai, On-site)
Sales engagement platform automating and scaling multichannel outreach for small and large companies.

- Mentored a 6-person squad focused on scalability where we drove technical decisions that directly improved product performance and stability with rewrites and greenfield projects.
- Redesigned MongoDB collections and indexes, reducing business critical query performance from 30+ seconds to < 1 second for working sets of over 10 million documents on collections with ~1B documents taking ~1 TB of storage.
- Designed and implemented an in-house clustering system that allowed us to partition customer data across databases based on volume and geographical location, directly improving system stability.
- Managed end-to-end DevOps with my team, implementing CI/CD pipelines and internal tooling for our stack on AWS and Heroku.
- Built self-serve billing from scratch using Stripe & Chargebee; handling both custom and base plans gracefully.

## OPEN SOURCE PROJECTS

### Vesta (https://github.com/kaulsh/vesta)
A Random Forest ML model to predict menstrual cycles within a 2-day confidence interval.

### Minecraft Proxy (https://github.com/kaulsh/minecraft-tcp-proxy)
A TCP-layer proxy that parses Minecraft Protocol packets, enabling smart routing and custom authentication between client and server.

### Ark For MongoDB (https://github.com/makeark/ark)
GUI with a full script editor (mongosh) and intellisense for enhanced database management. Supports inline document editing.

## EDUCATION

Bachelor's of Technology in Computer Science *SRM University, Chennai, India Jul 2014 — Jun 2018*
