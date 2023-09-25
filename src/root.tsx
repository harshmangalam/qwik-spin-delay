import { $, component$, useSignal } from "@builder.io/qwik";
import { SpinDelay } from "./components/spin-delay";

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
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <input type="text" bind:value={text} onInput$={handleInput} />
        <SpinDelay loading={loading.value} minDuration={200} delay={500}>
          Fetching...
        </SpinDelay>
      </body>
    </>
  );
});
