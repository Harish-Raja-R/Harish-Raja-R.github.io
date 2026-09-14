---
title: "SCAMCHECK"
subtitle: "Cybersecurity Threat Verification Platform"
slug: "scamcheck"
client: "Cybersecurity & Anti-Fraud Tech"
category: "Cybersecurity"
services: "Client-Side OCR, Heuristic Threat Analysis, Anti-Phishing"
technologies: ["React", "TypeScript", "Node.js", "Express", "Tesseract.js", "Tailwind CSS"]
metrics: ["On-Device OCR Parsing", "Domain Risk Engine", "Heuristic Pattern Matcher"]
year: "2024"
featuredImage: "./images/scamcheck/1.jpg"
imageTwo: "./images/scamcheck/2.jpg"
imageThree: "./images/scamcheck/3.jpg"
imageFour: "./images/scamcheck/4.jpg"
liveSite: "https://github.com/Harish-Raja-R/ScamCheck"
githubUrl: "https://github.com/Harish-Raja-R/ScamCheck"
description: "Instant cybersecurity verification engine allowing users to scan suspicious screenshots, SMS messages, and phishing URLs via on-device Tesseract OCR and automated domain heuristic analysis."
isFeatured: true
isDraft: false
---

Social engineering and targeted phishing attacks cause billions in losses annually. Non-technical users and enterprise employees often encounter deceptive SMS alerts ("smishing") or spoofed banking login screens that evade generic spam filters. ScamCheck provides an accessible, high-speed triage platform to verify suspect messages before credentials or funds are compromised.

### End-to-End Threat Verification Pipeline

ScamCheck operates a multi-stage verification pipeline designed for both speed and privacy:

1. **Client-Side Optical Character Recognition (Tesseract.js)**: Users upload screenshots of messages, invoices, or web pages. Tesseract.js parses typography locally in the browser or worker thread, extracting text, URLs, and phone numbers without transmitting sensitive image data over unencrypted channels.
2. **Heuristic Smishing & Phishing Analysis**: Extracted text undergoes syntactic tokenization to detect urgent psychological coercion triggers ("account suspended", "immediate action required", "cryptocurrency lottery").
3. **Domain Intelligence & URL Forensics**: Suspect links are resolved against real-time WHOIS registration databases, SSL certificate transparency logs, and blacklisted typosquatting patterns (e.g., Unicode homograph tricks, newly minted domains).
4. **Scam Risk Meter (0–100)**: Aggregates linguistic suspicion, domain reputation, and historical scam signatures into a clear visual risk gauge with actionable guidance ("Critical Threat: Do not click or provide OTP").
