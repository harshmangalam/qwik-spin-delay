# Qwik Spin Delay ⚡️

Smart spinner component for Qwik, to manage the duration of loading states.

---

# Installation

```shell
npm install qwik-spin-delay
```

```shell
pnpm add qwik-spin-delay
```

```shell
yarn add qwik-spin-delay
```

```shell
bun install qwik-spin-delay
```

# Examples

```jsx
import { SpinDelay } from "qwik-spin-delay";
import { $, component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const loading = useSignal(false);
  const text = useSignal("");

  const handleInput = $(() => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  return (
    <div>
      <input type="text" bind:value={text} onInput$={handleInput} />
      <SpinDelay loading={loading.value} minDuration={200} delay={500}>
        Fetching...
      </SpinDelay>
    </div>
  );
});
```
