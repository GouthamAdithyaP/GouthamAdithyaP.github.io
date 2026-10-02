/**
 * Single source of truth for the portfolio.
 * Every fact here comes from Goutham's resume. Edit this file to update the site.
 */

export const profile = {
  name: 'Goutham Adithya P',
  firstName: 'Goutham',
  initials: 'GA',
  title: 'Java Backend & Full-Stack Developer',
  currentRole: 'Java Full Stack Developer',
  company: 'I-Exceed Technology',
  companyFull: 'I-Exceed Technology Private Limited',
  location: 'Bengaluru, India',
  email: 'gouthamadithya8@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gouthamadithyap/',
  linkedinLabel: 'linkedin.com/in/gouthamadithyap',
  github: 'https://github.com/GouthamAdithyaP',
  githubUser: 'GouthamAdithyaP',
  githubLabel: 'github.com/GouthamAdithyaP',
  /** Square photo in public/. If it is missing, initials are shown instead. */
  photo: 'profile.webp',
  experience: '2+ years',
  since: 'October 2024',
  intro:
    'I build secure, fault-tolerant banking software with Java 17, Spring Boot 3 and Microservices. For three Indian banks I have shipped 200+ REST APIs and 100+ external integrations, from core banking and government eKYC to tax payment gateways.',
  heroTech: ['Java 17', 'Spring Boot 3', 'Microservices', 'REST APIs', 'JPA / Hibernate', 'SQL', 'Resilience4j', 'JavaScript'],
  roles: ['Java Backend Developer', 'Java Full-Stack Developer', 'Spring Boot & Microservices', 'REST API & Integration Engineer'],
} as const;

export const resume = {
  title: 'Java Full-Stack Developer',
  blurb: 'Backend depth with Java 17, Spring Boot, microservices, REST APIs and SQL, plus the HTML, CSS and JavaScript screens on top. Covers all three bank engagements, key achievements and education.',
  emphasis: ['Java & Spring Boot', 'Microservices & REST APIs', 'SQL & JPA/Hibernate', 'HTML, CSS & JavaScript', 'CI/CD & Testing'],
  pdf: 'resume/Goutham_Adithya_P_Java_Full_Stack_Developer.pdf',
  fileName: 'Goutham_Adithya_P_Resume.pdf',
} as const;

export const snapshot = [
  { label: 'Experience', value: '2+ years', sub: 'Production banking & FinTech' },
  { label: 'Core stack', value: 'Java · Spring Boot', sub: 'Microservices, REST, JPA, SQL' },
  { label: 'Domain', value: '3 banks', sub: 'Bandhan · UCO · Odisha Gramya' },
  { label: 'Also ships', value: 'Frontend', sub: 'HTML, CSS, JavaScript (ES6+)' },
] as const;

export const metrics = [
  { value: 200, suffix: '+', label: 'REST APIs', detail: 'Developed and supported in production' },
  { value: 100, suffix: '+', label: 'External integrations', detail: 'CBS, eKYC/CKYC, payments, SMS/OTP, auth' },
  { value: 25, suffix: '+', label: 'Critical modules', detail: 'Owned from requirements to production' },
  { value: 48, suffix: '+', label: 'Medium modules', detail: 'Delivered through SIT, UAT and release' },
  { value: 3, suffix: '', label: 'Bank clients', detail: 'Bandhan, UCO and Odisha Gramya Bank' },
] as const;

export const recognition = [
  {
    icon: 'award',
    title: 'Client & management appreciation',
    text: 'Recognized for ownership, timely delivery, communication and handling critical production scenarios on Bandhan Bank AOS.',
  },
  {
    icon: 'users',
    title: 'Primary point of contact',
    text: 'Owned requirements, team coordination, deadlines, releases and direct client communication for the bank.',
  },
  {
    icon: 'rocket',
    title: 'Backend modernization',
    text: 'Contributed to a Spring Boot version migration and the move from monolithic apps toward microservices.',
  },
  {
    icon: 'grad',
    title: '8.8 / 10 CGPA',
    text: 'B.E. in Computer Science & Engineering, Don Bosco Institute of Technology, Bengaluru.',
  },
] as const;

export const about = {
  heading: 'Backend engineer who owns the whole feature',
  paragraphs: [
    'I work at I-Exceed Technology in Bengaluru, building banking software used by Bandhan Bank, UCO Bank and Odisha Gramya Bank. My focus is the backend: clean Spring Boot services, reliable third-party integrations and well-tuned SQL.',
    'I also build the HTML, CSS and JavaScript screens on top, so I can take a feature from the database to the UI. I stay with my work from requirement analysis through SIT, UAT, production release and post-production support.',
  ],
  principles: [
    { title: 'Design for failure', text: 'External systems go down. Circuit breakers, timeouts and controlled fallbacks keep customer flows predictable.' },
    { title: 'Clean, testable code', text: 'SOLID principles, centralized exception handling, validation and JUnit/Mockito tests that pass SonarQube gates.' },
    { title: 'Own it end to end', text: 'From the first requirement call to production support, including talking directly with the client.' },
  ],
  facts: [
    { k: 'Based in', v: 'Bengaluru, Karnataka' },
    { k: 'Current role', v: 'Java Full Stack Developer' },
    { k: 'Company', v: 'I-Exceed Technology' },
    { k: 'Since', v: 'October 2024' },
    { k: 'Domain', v: 'Banking & FinTech' },
    { k: 'Education', v: 'B.E. CSE, CGPA 8.8' },
  ],
} as const;

export type SkillLevel = 'production' | 'familiar';
export type Skill = { name: string; level: SkillLevel; note: string; usedIn?: ProjectId[] };
export type SkillGroup = { id: string; label: string; icon: string; blurb: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    icon: 'server',
    blurb: 'Spring Boot services and REST APIs: where I spend most of my time.',
    skills: [
      { name: 'Java 17', level: 'production', note: 'Primary language for every backend service I ship.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'Spring Boot 3.3', level: 'production', note: 'Service framework across all three bank engagements.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'Spring MVC', level: 'production', note: 'REST controllers, request validation and response contracts.' },
      { name: 'REST APIs', level: 'production', note: '200+ APIs developed and supported in production.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'Microservices', level: 'production', note: 'Built and deployed microservices; helped migrate from monolith.', usedIn: ['uco', 'ogb'] },
      { name: '@Async & Scheduling', level: 'production', note: 'Asynchronous and scheduled processing with Spring.' },
      { name: '@ControllerAdvice', level: 'production', note: 'Centralized exception handling with custom exceptions.' },
      { name: 'Bean Validation', level: 'production', note: 'Input validation at the API boundary.' },
      { name: 'Spring Profiles', level: 'production', note: 'Environment-specific configuration across SIT, UAT and production.' },
    ],
  },
  {
    id: 'java',
    label: 'Core Java',
    icon: 'braces',
    blurb: 'The language fundamentals behind maintainable services.',
    skills: [
      { name: 'OOP', level: 'production', note: 'Object-oriented design in every service.' },
      { name: 'SOLID', level: 'production', note: 'Applied to keep banking services maintainable.' },
      { name: 'Collections', level: 'production', note: 'Everyday data handling in business logic.' },
      { name: 'Streams & Lambdas', level: 'production', note: 'Functional-style data processing.' },
      { name: 'Generics', level: 'production', note: 'Reusable, type-safe components.' },
      { name: 'Exception Handling', level: 'production', note: 'Custom exceptions with controlled failure responses.' },
      { name: '@Transactional', level: 'production', note: 'Transaction management for consistent banking data.' },
    ],
  },
  {
    id: 'integration',
    label: 'APIs & Resilience',
    icon: 'plug',
    blurb: '100+ external services integrated, built to survive downtime.',
    skills: [
      { name: 'External API Integration', level: 'production', note: 'Banking, government, payment, SMS/OTP, CBS and auth systems.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'Resilience4j', level: 'production', note: 'Circuit breakers, timeouts and fallbacks for external-service failures.' },
      { name: 'Circuit Breaker', level: 'production', note: 'Stops cascading failures when a dependency is down.' },
      { name: 'CBS Integration', level: 'production', note: 'Core Banking System de-dupe, fund transfer and account creation.', usedIn: ['aos', 'uco'] },
      { name: 'eKYC / CKYC', level: 'production', note: 'Government APIs to fetch and validate customer identity.', usedIn: ['aos'] },
      { name: 'Payment Gateway', level: 'production', note: 'Tax payment flow between portals, bank and CBS.', usedIn: ['uco'] },
      { name: 'Swagger / OpenAPI', level: 'production', note: 'API documentation and validation.' },
      { name: 'JSON', level: 'production', note: 'Request and response contracts.' },
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    icon: 'database',
    blurb: 'JPA/Hibernate on top, hand-tuned SQL underneath.',
    skills: [
      { name: 'Spring Data JPA', level: 'production', note: 'Repository layer for data access in backend services.' },
      { name: 'Hibernate', level: 'production', note: 'ORM mapping and transaction handling.', usedIn: ['aos'] },
      { name: 'MySQL', level: 'production', note: 'Production relational database.' },
      { name: 'PostgreSQL', level: 'production', note: 'Production relational database.' },
      { name: 'SQL Server', level: 'production', note: 'Production relational database.' },
      { name: 'Stored Procedures', level: 'production', note: 'Database-side business logic.' },
      { name: 'Indexing', level: 'production', note: 'Query performance tuning.' },
      { name: 'Joins & Subqueries', level: 'production', note: 'Complex reporting and validation queries.' },
      { name: 'Query Optimization', level: 'production', note: 'Faster, leaner database interactions.' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'shield',
    blurb: 'Banking-grade handling of identity and money.',
    skills: [
      { name: 'Authentication & Authorization', level: 'production', note: 'Securing access to banking services.' },
      { name: 'Hashing', level: 'production', note: 'Hash-based authentication with external tax portals.', usedIn: ['uco'] },
      { name: 'Encryption / Decryption', level: 'production', note: 'Public/private-key encryption for partner communication.', usedIn: ['uco'] },
      { name: 'Session & Device Security', level: 'production', note: 'Session timeout, password expiry and SIM binding.', usedIn: ['ogb'] },
      { name: 'Spring Security', level: 'familiar', note: 'Basic working knowledge.' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'monitor',
    blurb: 'Complete screens and client-side logic for customer flows.',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'production', note: 'Client-side logic for onboarding, payment and service screens.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'HTML5', level: 'production', note: 'Complete screen development.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'CSS3', level: 'production', note: 'Styling for customer-facing screens.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'Promises & async/await', level: 'production', note: 'Asynchronous API flows from the browser.', usedIn: ['aos', 'uco', 'ogb'] },
      { name: 'setTimeout / setInterval', level: 'production', note: 'Time-based UI behavior.', usedIn: ['ogb'] },
      { name: 'QUnit', level: 'production', note: 'JavaScript unit testing.' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Quality',
    icon: 'workflow',
    blurb: 'From commit to production, with quality gates on the way.',
    skills: [
      { name: 'Git / GitLab', level: 'production', note: 'Version control and collaboration.' },
      { name: 'Maven', level: 'production', note: 'Builds and dependency management.' },
      { name: 'Jenkins', level: 'production', note: 'CI/CD pipelines.' },
      { name: 'Docker', level: 'production', note: 'Packaging services into containers.' },
      { name: 'JBoss', level: 'production', note: 'Application server for Bandhan Bank AOS.', usedIn: ['aos'] },
      { name: 'Apache Tomcat', level: 'production', note: 'Runtime for Odisha Gramya Bank microservices.', usedIn: ['ogb'] },
      { name: 'JUnit', level: 'production', note: 'Unit tests for services.' },
      { name: 'Mockito', level: 'production', note: 'Mocking dependencies in tests.' },
      { name: 'SonarQube', level: 'production', note: 'Quality gates and coding standards.' },
      { name: 'JasperReports', level: 'production', note: 'Application and report generation.' },
      { name: 'SLF4J / Log4j', level: 'production', note: 'Structured logging for production troubleshooting.' },
      { name: 'Jira', level: 'production', note: 'Work tracking.' },
      { name: 'Kubernetes', level: 'familiar', note: 'Basic working knowledge.' },
      { name: 'Kafka', level: 'familiar', note: 'Basic working knowledge.' },
      { name: 'Redis', level: 'familiar', note: 'Basic working knowledge.' },
    ],
  },
];

export const experience = {
  role: 'Java Full Stack Developer',
  company: 'I-Exceed Technology Private Limited',
  location: 'Bengaluru, Karnataka',
  period: 'Oct 2024 – Present',
  summary:
    'Develop and maintain production banking applications with Java, Spring Boot, REST APIs, JPA/Hibernate, SQL and JavaScript, across monolithic and microservices architectures.',
  highlights: [
    'Developed and supported 200+ REST APIs and integrated 100+ external services across banking, government, authentication, payment, SMS/OTP and CBS systems.',
    'Delivered 25+ critical and 48+ medium modules, owning each from requirement analysis through SIT, UAT, production release and support.',
    'Built resilient API flows with Resilience4j circuit breakers, timeouts and controlled failure responses for external-service downtime.',
    'Optimized database interactions with JPA/Hibernate and SQL on MySQL, PostgreSQL and SQL Server using joins, stored procedures, indexing and transactions.',
    'Contributed to a Spring Boot version migration and the move from monolithic applications toward microservices.',
    'Built asynchronous and scheduled processing with @Async and Spring scheduling; troubleshot production issues across application, API, integration and database layers.',
    'Wrote JUnit and Mockito tests to SonarQube quality gates; built and shipped with Git/GitLab, Maven, Jenkins, Docker, JBoss and Tomcat.',
    'Created JasperReports for report generation and documented APIs with Swagger/OpenAPI.',
  ],
  engagements: ['aos', 'uco', 'ogb'] as ProjectId[],
  stack: ['Java 17', 'Spring Boot', 'Microservices', 'JPA/Hibernate', 'SQL', 'Resilience4j', 'JavaScript', 'Jenkins', 'Docker'],
};

export const education = {
  degree: 'B.E., Computer Science & Engineering',
  school: 'Don Bosco Institute of Technology, Bengaluru',
  period: '2020 – 2024',
  detail: 'Graduated with a CGPA of 8.8 / 10.',
};

export type ProjectId = 'aos' | 'uco' | 'ogb';
export type Layer = 'client' | 'service' | 'external' | 'data';
export type ArchNode = { id: string; label: string; layer: Layer; detail: string; tech: string[] };
export type FlowStep = { label: string; layer: Layer; detail: string };

export type Project = {
  id: ProjectId;
  client: string;
  name: string;
  short: string;
  tagline: string;
  domain: string;
  badge: string;
  accent: string;
  tech: string[];
  runtime: string;
  problem: string;
  solution: string;
  contribution: string[];
  architecture: { title: string; nodes: ArchNode[] };
  flow?: { title: string; steps: FlowStep[] };
  results: string[];
};

export const projects: Project[] = [
  {
    id: 'aos',
    client: 'Bandhan Bank',
    name: 'Account Opening System',
    short: 'AOS',
    tagline: 'Tablet-based customer onboarding with government eKYC, CBS de-duplication and a three-level approval workflow.',
    domain: 'Customer onboarding',
    badge: 'Led as primary point of contact',
    accent: '#7c83ff',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'JPA/Hibernate', 'SQL', 'JBoss', 'eKYC/CKYC', 'CBS', 'JavaScript', 'HTML/CSS'],
    runtime: 'JBoss',
    problem:
      'The bank needed a tablet-based way to onboard customers: verify identity against government records, avoid creating duplicate customers in the core banking system, and route each application through branch and central approval before the account is created.',
    solution:
      'A Spring Boot onboarding backend behind tablet screens. It pulls and validates identity data through eKYC/CKYC government APIs, captures documents as Base64, checks CBS for existing customers, lets staff save incomplete applications, and moves each application through Maker, Branch Checker and CPU Checker stages to CBS account creation.',
    contribution: [
      'Took end-to-end ownership as the primary point of contact: requirements, team coordination, development, deadlines, SIT, UAT, production releases and client communication.',
      'Built backend services for tablet onboarding and integrated eKYC/CKYC and other government APIs.',
      'Developed the onboarding screens and JavaScript with asynchronous API integration.',
      'Implemented Base64 document handling, CBS customer de-duplication and saved-bucket functionality.',
      'Built the Maker, Branch Checker, CPU Checker workflow leading to CBS account creation.',
      'Applied SOLID, centralized exception handling, logging, validation, transactions and external-API failure handling; deployed on JBoss and supported production.',
    ],
    architecture: {
      title: 'System view',
      nodes: [
        { id: 'ui', label: 'Tablet onboarding UI', layer: 'client', detail: 'Customer onboarding screens built with HTML, CSS and JavaScript, calling the backend asynchronously.', tech: ['HTML', 'CSS', 'JavaScript'] },
        { id: 'api', label: 'Onboarding services', layer: 'service', detail: 'Spring Boot REST APIs with validation, centralized exception handling, logging and transactions.', tech: ['Spring Boot', 'REST'] },
        { id: 'wf', label: 'Approval workflow', layer: 'service', detail: 'Maker, Branch Checker and CPU Checker stages before an account is created.', tech: ['Java', 'Workflow'] },
        { id: 'kyc', label: 'eKYC / CKYC', layer: 'external', detail: 'Government APIs used to retrieve and validate customer identity information.', tech: ['Government APIs'] },
        { id: 'cbs', label: 'Core Banking (CBS)', layer: 'external', detail: 'Customer de-duplication checks and final account creation.', tech: ['CBS'] },
        { id: 'db', label: 'Application database', layer: 'data', detail: 'Applications, documents and saved-bucket drafts persisted through JPA/Hibernate and SQL.', tech: ['JPA/Hibernate', 'SQL'] },
      ],
    },
    flow: {
      title: 'Application journey',
      steps: [
        { label: 'Capture on tablet', layer: 'client', detail: 'Staff start the application on the tablet screens.' },
        { label: 'eKYC / CKYC', layer: 'external', detail: 'Identity data fetched and validated from government APIs.' },
        { label: 'Documents', layer: 'service', detail: 'Documents captured and handled as Base64.' },
        { label: 'CBS de-dupe', layer: 'external', detail: 'Checks whether the customer already exists in core banking.' },
        { label: 'Saved bucket', layer: 'data', detail: 'Incomplete applications can be saved and resumed.' },
        { label: 'Maker', layer: 'service', detail: 'First-level entry and submission.' },
        { label: 'Branch Checker', layer: 'service', detail: 'Branch-level review and approval.' },
        { label: 'CPU Checker', layer: 'service', detail: 'Central processing unit approval.' },
        { label: 'Account created', layer: 'external', detail: 'The account is created in CBS.' },
      ],
    },
    results: [
      'Delivered through SIT, UAT and production releases with ongoing production support.',
      'Received client and management appreciation for ownership, timely delivery, communication and handling critical production scenarios.',
      'Trusted as the primary point of contact between the team and the bank.',
    ],
  },
  {
    id: 'uco',
    client: 'UCO Bank',
    name: 'Taxation & Payment Gateway',
    short: 'Taxation',
    tagline: 'Microservices that let customers pay GST, customs duty, TIN and other taxes straight from their UCO Bank account.',
    domain: 'Payments',
    badge: 'Secure payment flow',
    accent: '#2dd4bf',
    tech: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'CBS', 'Payment Gateway', 'Hashing', 'Encryption', 'JavaScript'],
    runtime: 'Spring Boot microservices',
    problem:
      'Customers paying GST, customs duty, TIN and other taxes needed to pay directly from their UCO Bank account. That needs a secure handoff between external tax portals, the bank’s account services and the core banking system, with every transaction status tracked.',
    solution:
      'Taxation microservices that receive the request from the tax portal, show the payable amount, let the customer choose an account, validate the balance, transfer funds through CBS, record the transaction status and redirect back to the portal. Partner communication is secured with hashing and public/private-key encryption.',
    contribution: [
      'Developed backend services for the taxation and payment gateway.',
      'Implemented the full flow across tax portals, customer account services, CBS and the database.',
      'Worked with hashing for authentication and public/private-key encryption and decryption.',
      'Built supporting frontend screens and JavaScript for customer-facing steps with async backend calls.',
      'Collaborated directly with client and business teams on requirements, technical discussions and issue resolution.',
    ],
    architecture: {
      title: 'System view',
      nodes: [
        { id: 'portal', label: 'Tax portal', layer: 'external', detail: 'External GST, customs and TIN portals that start and receive the payment.', tech: ['Partner API'] },
        { id: 'ui', label: 'Payment screens', layer: 'client', detail: 'Customer-facing screens for amount, account selection and confirmation.', tech: ['HTML', 'CSS', 'JavaScript'] },
        { id: 'svc', label: 'Taxation microservices', layer: 'service', detail: 'Spring Boot services that orchestrate the payment end to end.', tech: ['Spring Boot', 'Microservices'] },
        { id: 'sec', label: 'Security layer', layer: 'service', detail: 'Hash-based authentication and public/private-key encryption for partner communication.', tech: ['Hashing', 'Encryption'] },
        { id: 'acct', label: 'Account services', layer: 'external', detail: 'Customer account lookup and balance validation.', tech: ['Bank APIs'] },
        { id: 'cbs', label: 'Core Banking (CBS)', layer: 'external', detail: 'Fund transfer for the tax payment.', tech: ['CBS'] },
        { id: 'db', label: 'Transaction store', layer: 'data', detail: 'Transaction records and status updates.', tech: ['SQL'] },
      ],
    },
    flow: {
      title: 'Payment journey',
      steps: [
        { label: 'Tax portal', layer: 'external', detail: 'Customer starts a tax payment on the government portal.' },
        { label: 'Payable amount', layer: 'client', detail: 'The amount due is displayed to the customer.' },
        { label: 'Account select', layer: 'client', detail: 'Customer chooses which account to pay from.' },
        { label: 'Balance check', layer: 'service', detail: 'Balance validated before any money moves.' },
        { label: 'CBS transfer', layer: 'external', detail: 'Funds transferred through the core banking system.' },
        { label: 'Status update', layer: 'data', detail: 'Transaction status recorded in the database.' },
        { label: 'Redirect', layer: 'external', detail: 'Customer is sent back to the tax portal with the result.' },
      ],
    },
    results: [
      'Customers can pay GST, customs duty, TIN and other taxes from their UCO Bank account.',
      'One connected flow from tax portal to CBS and back, with tracked transaction status.',
      'Partner communication secured with hashing and public/private-key encryption.',
    ],
  },
  {
    id: 'ogb',
    client: 'Odisha Gramya Bank',
    name: 'Retail Banking & Service Requests',
    short: 'Retail',
    tagline: 'Backend microservices and screens for AEPS, Internet/Mobile Banking activation, deposit calculators and device security.',
    domain: 'Retail banking',
    badge: 'Microservices on Tomcat',
    accent: '#f59e0b',
    tech: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'Apache Tomcat', 'JavaScript', 'HTML/CSS'],
    runtime: 'Apache Tomcat',
    problem:
      'Retail customers needed service requests such as AEPS activation and Internet/Mobile Banking activation, deposit calculators for different account types, and stronger protection for sessions and registered devices.',
    solution:
      'A set of Spring Boot microservices for service requests and calculators, with security controls for session timeout, password expiry and SIM binding. They are integrated with the database and external systems, and served to customers through HTML, CSS and JavaScript screens.',
    contribution: [
      'Developed and maintained backend microservices for retail banking and service requests, including AEPS activation and deactivation.',
      'Implemented deposit calculators for multiple account types and Internet/Mobile Banking activation.',
      'Added session timeout, password expiry and SIM binding for registered-device security.',
      'Built complete screens and client-side scripts with Promises, async functions, setTimeout and setInterval.',
      'Handled validation, exception management, logging and API failure scenarios; deployed and supported services on Apache Tomcat.',
    ],
    architecture: {
      title: 'System view',
      nodes: [
        { id: 'ui', label: 'Retail banking screens', layer: 'client', detail: 'Complete screens with async calls and time-based UI behavior.', tech: ['HTML', 'CSS', 'JavaScript'] },
        { id: 'sr', label: 'Service request service', layer: 'service', detail: 'AEPS activation/deactivation and customer service workflows.', tech: ['Spring Boot'] },
        { id: 'calc', label: 'Deposit calculator', layer: 'service', detail: 'Calculations for multiple account types.', tech: ['Spring Boot'] },
        { id: 'act', label: 'IB / MB activation', layer: 'service', detail: 'Internet and Mobile Banking activation.', tech: ['Spring Boot'] },
        { id: 'sec', label: 'Security controls', layer: 'service', detail: 'Session timeout, password expiry and SIM binding for registered devices.', tech: ['Security'] },
        { id: 'ext', label: 'External systems', layer: 'external', detail: 'Bank systems the services integrate with.', tech: ['REST'] },
        { id: 'db', label: 'Database', layer: 'data', detail: 'Persistence for requests and customer data.', tech: ['SQL'] },
      ],
    },
    results: [
      'Shipped AEPS and Internet/Mobile Banking activation as service requests.',
      'Added device-level protection with SIM binding, plus session timeout and password expiry.',
      'Deployed and supported on Apache Tomcat through SIT, UAT and production.',
    ],
  },
];

export const layerMeta: Record<Layer, { label: string; color: string }> = {
  client: { label: 'Client / UI', color: 'var(--l-client)' },
  service: { label: 'My services', color: 'var(--l-service)' },
  external: { label: 'External systems', color: 'var(--l-external)' },
  data: { label: 'Data', color: 'var(--l-data)' },
};

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'impact', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
] as const;
