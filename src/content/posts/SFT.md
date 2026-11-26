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

### 训练目标

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
而每一对数据，答案都是逐token、自回归生成的，有链式法则：
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

### 特点

SFT 天然就是 **teacher forcing** 的，即所有训练用的 $y_{<t}$ 均来自给定的数据集，而不是模型自己生成的。这意味着，模型在训练和推理时的条件分布是不一样的：训练用 $y_{<t}\sim p_{\text{data}}$，推理用 $\hat y_{<t}\sim p_\theta$。这就是 **exposure bias** ，当模型生成的前缀和训练数据相差大的时候，输出偏差也会变大。

每步前缀分布的距离可以用 KL 散度表示（认为SFT数据是one-hot的，熵为0）：
$$
\delta_t=D_{\mathrm{KL}}\big(p_{\text{data}}(\cdot\mid x,y_{<t})\Vert p_\theta(\cdot\mid x,y_{<t})\big)=\mathbb{E}_{x\sim p_{\mathrm{data}}(\cdot\mid x,y_{<t})}\Big[\sum_{t=1}^T\log\frac{p_{\mathrm{data}}(y_t\mid x,y_{<t})}{p_\theta(y_t\mid x,y_{<t})}\Big]
$$
对于序列级 KL ，代入链式法则展开：
$$
D_{\mathrm{KL}}\big(p_{\text{data}}(y\mid x)\,\Vert\,p_\theta(y\mid x)\big)=\mathbb{E}_{x\sim p_{\mathrm{data}}}\Big[\sum_{t=1}^T\log\frac{p_{\mathrm{data}}(y_t\mid x,y_{<t})}{p_\theta(y_t\mid x,y_{<t})}\Big]\\=\sum_{t=1}^T\mathbb{E}_{x\sim p_{\mathrm{data}}}\Big[\log\frac{p_{\mathrm{data}}(y_t\mid x,y_{<t})}{p_\theta(y_t\mid x,y_{<t})}\Big]
$$
根据全期望公式的塔性质（分组求平均再对组求平均，等于直接求平均）：
$$
\mathbb E_{y\sim p_{\text{data}}}[\,\cdot\,]=\mathbb E_{y_{<t}\sim p_{\text{data}}}\Big[\mathbb E_{y_t\sim p_{\text{data}}(\cdot\mid x,y_{<t})}\big[\,\cdot\,\big]\Big]=\mathbb E_{y_{<t}\sim p_{\text{data}}}\big[\delta_t\big]
$$
于是有：
$$
D_{\mathrm{KL}}\big(p_{\text{data}}(y\mid x)\,\Vert\,p_\theta(y\mid x)\big)=\sum_{t=1}^T\mathbb E_{y_{<t}\sim p_{\text{data}}}\big[\delta_t\big]
$$
这说明了长序列的偏差是线性累积的。SFT后的模型越生成越飘、会说不会停就是因为模型只见过训练前缀，生成一个略偏的 token，就进入了训练分布的低密度区，每步 $\delta_t$ 会越来越大。

### 为什么还要RL
