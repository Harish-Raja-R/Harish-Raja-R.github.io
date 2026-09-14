---
title: "SEMIRESTORE-AI"
subtitle: "Semiconductor Wafer Image Super-Resolution"
slug: "semirestore-ai"
client: "Semiconductor Metrology AI"
category: "AI/ML"
services: "Deep Learning, Image Super-Resolution, CUDA Optimization"
technologies: ["PyTorch", "NAFNet-SR", "CUDA", "NumPy", "TensorBoard"]
metrics: ["38.5 dB PSNR", "0.965 SSIM", "Sub-Micron Wafer Restoration"]
year: "2025"
featuredImage: "./images/semirestore-ai/1.jpg"
imageTwo: "./images/semirestore-ai/2.jpg"
imageThree: "./images/semirestore-ai/3.jpg"
imageFour: "./images/semirestore-ai/4.jpg"
liveSite: "https://github.com/Harish-Raja-R/SemiRestore-AI"
githubUrl: "https://github.com/Harish-Raja-R/SemiRestore-AI"
description: "Non-Linear Activation-Free neural network (NAFNet-SR) engineering for sub-micron silicon wafer microscopy super-resolution, enhancing high-noise defect scanning in advanced semiconductor fabrication."
isFeatured: true
isDraft: false
---

In modern sub-5nm semiconductor manufacturing, optical and scanning electron microscopy (SEM) inspection tools operate at the physical diffraction limit. Capturing nanoscale die defects at high scan speeds generates low-exposure images plagued by Gaussian sensor noise, optical blur, and structural artifacts. SemiRestore-AI leverages deep image restoration to reconstruct high-fidelity silicon wafer topography from degraded metrology scans.

### Non-Linear Activation-Free Architecture

Conventional super-resolution architectures depend heavily on computationally expensive non-linear activations (e.g., GELU, ReLU) that introduce latency bottlenecks during inline wafer inspection. SemiRestore-AI implements NAFNet-SR (Nonlinear Activation Free Network for Super-Resolution):

- **Simplified Channel Attention**: Multiplies adjacent channel halves without traditional non-linear activation layers, radically reducing FLOPS while preserving delicate circuit edge boundaries.
- **Skip-Connected Residual Encoders**: Propagates low-frequency layout features directly to reconstruction layers, preventing semantic hallucination of false metal traces.
- **Sub-Pixel Convolutional Upscaling**: Restores fine gate lines and via contacts at 4x magnification with high structural continuity.

### High-Throughput CUDA Pipeline

Trained across thousands of synthetic and benchmark wafer microscopy patches, SemiRestore-AI achieves remarkable fidelity:
- **Peak Signal-to-Noise Ratio (PSNR)**: 38.5 dB
- **Structural Similarity Index Measure (SSIM)**: 0.965
- **Inference Latency**: Real-time batch processing via custom PyTorch CUDA kernels optimized for multi-die scanning pipelines.

TensorBoard telemetry tracks structural loss, gradient convergence, and edge preservation during multi-stage training cycles, providing semiconductor process engineers with deterministic inspection quality.
