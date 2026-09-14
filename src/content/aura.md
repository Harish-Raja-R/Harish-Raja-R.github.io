---
title: "A.U.R.A."
subtitle: "Multimodal Fake News & Deepfake Detector"
slug: "aura"
client: "AI Forensics & Information Integrity"
category: "AI/ML"
services: "Multimodal Fusion, Deepfake Forensics, NLP Transformers"
technologies: ["PyTorch", "BERT", "ResNet-18", "Hugging Face Transformers", "Flask"]
metrics: ["Dual-Stream Architecture", "Cross-Attention Fusion", "Forensic Confidence Score"]
year: "2025"
featuredImage: "./images/aura/1.jpg"
imageTwo: "./images/aura/2.jpg"
imageThree: "./images/aura/3.jpg"
imageFour: "./images/aura/4.jpg"
liveSite: "https://github.com/Harish-Raja-R/AURA-Deepfake-Detection"
githubUrl: "https://github.com/Harish-Raja-R/AURA-Deepfake-Detection"
description: "Dual-stream multimodal neural architecture combining BERT transformer-based text forensics with deep convolutional ResNet-18 visual artifact detectors to expose synthetic media and coordinated disinformation campaigns."
isFeatured: true
isDraft: false
---

Modern digital disinformation rarely relies on text or manipulated video in isolation. High-impact deceptive campaigns coordinate emotionally charged headlines with deepfake synthetic videos and manipulated imagery. A.U.R.A. (Automated Unified Reliability Analyzer) is an end-to-end multimodal deep learning pipeline engineered to detect both visual forgery artifacts and text-image semantic incongruities.

### Dual-Stream Multimodal Forensics

A.U.R.A. treats content verification as a joint linguistic-visual inference problem:

1. **Visual Stream (ResNet-18 Deepfake Forensics)**: Analyzes video frames and imagery at the frequency and spatial domain. Extracts facial blend boundaries, temporal jitter, pupil reflection asymmetries, and warping residuals characteristic of GAN and diffusion-based image generators.
2. **Textual Stream (BERT NLP Transformer)**: Processes transcripts, article headlines, and claims. Employs 12-layer bidirectional attention to identify clickbait sensationalism, syntactic manipulation patterns, and hyperbolic misinformation motifs.
3. **Cross-Attention Fusion Layer**: Rather than naive late-fusion concatenation, A.U.R.A. projects visual embeddings ($D_v = 512$) and linguistic tokens ($D_l = 768$) into a shared cross-attention subspace where text queries the visual evidence to identify contextual contradictions.

### Inference & Deployment Architecture

- **Confidence Telemetry**: Produces an interpretable forensic audit score breaking down visual forgery confidence, textual sentiment manipulation, and cross-modal discrepancy index.
- **REST Engine**: Wrapped in a high-concurrency Flask API server with GPU acceleration, enabling instant verification of suspect media links and uploaded clips in under 1.8 seconds.
