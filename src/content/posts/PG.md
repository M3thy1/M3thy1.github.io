---
title: 策略梯度定理
published: 2026-11-26
description: '策略梯度定理是怎么来的'
image: ''
tags: [LLM, RL, Math, Algorithm, Post Train]
category: 'LLM Algorithm'
draft: false 
lang: ''
---

### 策略与策略梯度定理

随机策略是给定状态下动作的条件分布 $\pi_\theta(a\mid s)$，在 LLM 生成 token 时，状态就是已生成的 token 序列，动作是下一个 token，此时语言模型就是策略。

马尔可夫决策过程（MDP）是强化学习最常用的数学建模框架，用来描述“智能体在环境中不断观察状态、采取动作、获得奖励并转移到新状态”的决策问题

MDP 是五元组 $(S,A,P,r,\gamma)$：状态集、动作集、状态转移概率 $P(s'\mid s,a)$、奖励 $r(s,a)$、折扣 $\gamma\in[0,1]$。

一条长度 $T$ 的轨迹是：

$$
\tau=(s_0,a_0,s_1,a_1,\dots,s_{T-1},a_{T-1})
$$

给定策略 $\pi_\theta$ 与初始分布 $\rho(s_0)$，轨迹分布是：

$$
p_\theta(\tau)=\rho(s_0)\prod_{t=0}^{T-1}\pi_\theta(a_t\mid s_t)\,P(s_{t+1}\mid s_t,a_t)
$$
对于每条轨迹，有回报 $R(\tau)=\sum_t\gamma^tr(s_t,a_t)$​ ，RL 的目标通常是最大化期望折扣回报：
$$
J(\theta)=\mathbb E_{\tau\sim p_\theta}\Big[\sum_{t=0}^{T-1}\gamma^{t}r(s_t,a_t)\Big]
$$
则有 $J(\theta)=\int R(\tau)p_\theta(\mathrm{d}\tau)$，梯度为：
$$
\nabla_\theta J(\theta)=\int \nabla_\theta p_\theta(\tau)R(\tau)\mathrm{d}\tau
$$
而根据对数求导法有 $\nabla_\theta p_\theta(\tau)=p_\theta(\tau)\cdot\nabla_\theta \log p_\theta(\tau)$ 展开有：
$$
\nabla_\theta p_\theta(\tau)=p_\theta(\tau)\cdot\nabla_\theta\Big[\log\rho(s_0)+\sum_t\log\pi_\theta(a_t\mid s_t)+\sum_t\log P(s_{t+1}\mid s_t,a_t)\Big]
$$
可以发现最后一项包含 $\nabla_\theta P$，该项和训练环境有关，是不可微的。对数梯度里虽然环境项被消去，但左边的环境因子还在。

$p_\theta(\tau)$ 是 $T$ 重乘积，轨迹空间大小是 $\lvert S\rvert^T\lvert A\rvert^T$，无法遍历所有轨迹，因此也难以积分。

每步动作 $(s_t,a_t)$ 没有标准答案 $a_t^\star$，不然就直接 MLE 了。

消掉无关项后：
$$
\nabla_\theta J(\theta)=\int R(\tau)p_\theta(\tau) \sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\mathrm{d}\tau
$$
发现出现了概率的期望形式，于是转为期望：
$$
\nabla_\theta J(\theta)=\mathbb{E}_{\tau\sim p_\theta} \Big[R(\tau)\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\Big]
$$
对于里面的回报项，直觉认为第 $t$ 步的动作不该为 $t$ 之前的奖励负责。记历史 $h_t=(s_0,a_0,\dots,s_{t-1},a_{t-1},s_t)$， $t'<t$，由全期望公式：
$$
\mathbb E\big[\nabla_\theta\log\pi_\theta(a_t\mid s_t)r_{t'}\big]=\mathbb E\Big[r_{t'}\,\mathbb E\big[\nabla_\theta\log\pi_\theta(a_t\mid s_t)\mid h_t\big]\Big]
$$
而对于内层对 $a_t\sim\pi(\cdot\mid s_t)$ 展开：
$$
\mathbb E\big[\nabla_\theta\log\pi_\theta(a_t\mid s_t)\mid h_t\big]=\sum_a\pi_\theta(a_t\mid s_t)\nabla_\theta\log\pi_\theta(a_t\mid s_t)=\sum_a\nabla_\theta\pi_\theta(a_t\mid s_t)\\
=\nabla_\theta\sum_a\pi_\theta(a_t\mid s_t)=\nabla_\theta1=0
$$
这部分期望为 0：
$$
\mathbb E_{\tau\sim p_\theta}\big[\nabla_\theta\log\pi_\theta(a_t\mid s_t)\cdot r(s_{t'},a_{t'})\big]=0
$$
因此只需要计算未来回报：
$$
G_t=\sum_{k=0}^{T-1-t}\gamma^{k}r(s_{t+k},a_{t+k})
$$
这就是因果性方差缩减

