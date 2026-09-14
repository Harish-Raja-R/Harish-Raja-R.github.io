---
title: "NEUROCOLLAB"
subtitle: "Graph Machine Learning for Academic Collaboration"
slug: "neurocollab"
client: "Academic Graph ML Research"
category: "AI/ML"
services: "Graph Neural Networks, Link Prediction, XAI (SHAP)"
technologies: ["Python", "NetworkX", "XGBoost", "LightGBM", "MLP", "SHAP", "Docker"]
metrics: ["97.1% Accuracy", "99.8% AUC-ROC", "97.1% F1-Score"]
year: "2025"
featuredImage: "./images/neurocollab/1.jpg"
imageTwo: "./images/neurocollab/2.jpg"
imageThree: "./images/neurocollab/3.jpg"
imageFour: "./images/neurocollab/4.jpg"
liveSite: "https://github.com/Harish-Raja-R/NeuroCollab"
githubUrl: "https://github.com/Harish-Raja-R/NeuroCollab"
description: "High-performance Graph Machine Learning framework modeling academic co-authorship networks, predicting prospective cross-disciplinary research collaborations, and providing transparent topological explainability using SHAP."
isFeatured: true
isDraft: false
---

NeuroCollab investigates large-scale academic collaboration dynamics by framing researcher partnerships as a dynamic topological link prediction problem over complex scholarly graphs. By modeling institutional citations, departmental affiliations, and historical publication frequencies as high-dimensional graph embeddings, NeuroCollab identifies latent synergistic partnerships that traditional keyword searches routinely overlook.

### Architecture & Mathematical Formulation

The system models the academic universe as an undirected attributed graph $G = (V, E)$, where vertices $V$ represent individual researchers and edges $E$ denote verified co-authorships. Topological feature extraction computes high-order neighborhood metrics:

- **Jaccard Similarity & Adamic-Adar Index**: Capturing shared co-author cliques and localized triadic closure tendencies.
- **Resource Allocation & Preferential Attachment**: Quantifying institutional gravity and citation momentum.
- **Node2Vec & Graph Laplacian Embeddings**: Encoding dense vector representations capturing structural equivalence across disconnected disciplines.

Candidate edge features are concatenated and fed into an optimized ensemble classifier leveraging LightGBM and XGBoost gradient-boosted decision trees alongside a multi-layer perceptron (MLP).

### Benchmark Evaluation & Performance

Rigorous cross-validation on dense scholarly corpora established industry-leading predictive fidelity:
- **Accuracy**: 97.1%
- **AUC-ROC**: 99.8%
- **F1-Score**: 97.1%

To bridge the gap between predictive power and academic governance, the system integrates TreeSHAP explainability algorithms. Research administrators can directly inspect the exact mathematical contribution of topological distance, centrality variance, and citation trajectories driving every collaboration recommendation.
