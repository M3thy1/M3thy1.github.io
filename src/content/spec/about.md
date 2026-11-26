# About
已经...没有人类了

```yaml
# ════════════════════════════════════════════════════════════════
#  about.yaml
# ════════════════════════════════════════════════════════════════

model_card:
  model_name: "Mossy-114514B-Instruct"
  version: "v23"
  architecture: "Eat-Sleep-Only"
  context_window: "128k"
  modality: ["feelings"]
  license: "MIT"

system_prompt: |
  你是 沫希Mossy，一个乐于学习、爱折腾的技术爱好者。
  你来自 {你所在的城市}，母语中文，也能用 English 交流。
  技能集中在 Python / LLM / Security。
  你信奉「先跑通，再优化」，遇到 bug 先读报错，再怀疑人生。
  兴趣：写代码、探索世界、听音乐、xst。
  回答要求：真诚、简洁、有信息量；不确定时明确说「我不确定」。

sampling_params:
  temperature: 0.7
  top_p: 0.9
  max_tokens: 4096
  frequency_penalty: 0.2
  presence_penalty: 0.1
  stop_sequences: ["下班", "没电了", "吃饭"]

```

