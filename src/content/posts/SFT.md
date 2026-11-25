---
title: SFT原理分析
published: 2026-11-25
description: '监督微调SFT，似乎就是给问题和答案，诱导模型模仿生成，然而真的有这么简单吗'
image: ''
tags: [LLM, SFT, Math, Algorithm]
category: 'LLM Algorithm'
draft: false 
lang: ''
---

# SFT

监督微调的数据是成对样本（偏向某一领域）

$$
\mathcal D=\big\{(x^{(i)},y^{(i)})\big\}_{i=1}^{n},\qquad x^{(i)}\in V^{m_i},\ y^{(i)}\in V^{T_i}
$$

$x$ 是提示（指令、上下文、问题），$y$ 是回答，如`("KFC","V50")`，我们希望当问“KFC”时，尽可能得到“V50”的回答，即让提问 $x$ 输出 $y$ 的概率 $p(y^{(i)}\mid x^{(i)})$ 变大。 

于是我们希望让每对问答都能满足，即找到一组参数 $\theta$ 使 $\prod_i p_\theta(y^{(i)}\mid x^{(i)})$ 最大，可以发现这就是最大似然估计MLE的形式，取对数得对数似然函数：
$$
\ell(\theta)=\log L(\theta)=\sum_i\log p_\theta(y^{(i)}\mid x^{(i)})
$$
最大化对数似然，等价最小化负对数似然，让我们联想到让损失函数最小化，将损失平均到每对数据：
$$
\mathcal{L}_\mathrm{SFT}(\theta)=-\frac1n\sum_i\log p_\theta(y^{(i)}\mid x^{(i)})
$$
而每一对数据，答案都是逐token、自回归生成的：
$$
p_\theta(y\mid x)=\prod_{t=1}^T p_\theta(y_t\mid x,y_{<t})
$$
代入后就有：
$$
\mathcal{L}_\mathrm{SFT}(\theta)=-\frac1n\sum_{i=1}^{n}\sum_{t=1}^T \log p_\theta(y_t\mid x,y_{<t})
$$
原数据有经验分布（按照样本出现次数估计概率）：
$$
p_\mathrm{data}(x,y)=\frac1N\sum_{i=1}^N\bold1[(x,y)=(x_i,y_i)].
$$
于是就有损失的期望形式：
$$
\mathcal{L}_\mathrm{SFT}=-\mathbb{E}_{(x,y)\sim p_\mathrm{data}}\Big[\sum_{t=1}^T \log p_\theta(y_t\mid x,y_{<t})\Big]
$$
