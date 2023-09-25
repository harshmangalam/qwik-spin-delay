import { Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Props {
  loading: boolean;
  delay?: number;
  minDuration?: number;
}

type Status = "IDLE" | "DELAY" | "DISPLAY" | "EXPIRE";

export const SpinDelay = component$((props: Props) => {
  const { loading, delay = 500, minDuration = 200 } = props;
  const status = useSignal<Status>("IDLE");
  const timeout = useSignal<number | undefined>();

  useVisibleTask$(({ track }) => {
    track(() => loading);
    track(() => minDuration);
    track(() => delay);
    track(() => status.value);
    if (loading && status.value === "IDLE") {
      clearTimeout(timeout.value);

      timeout.value = setTimeout(() => {
        if (!loading) {
          status.value = "IDLE";
          return;
        }

        timeout.value = setTimeout(() => {
          status.value = "EXPIRE";
        }, minDuration);

        status.value = "DISPLAY";
      }, delay);

      status.value = "DELAY";
    }

    if (!loading && status.value !== "DISPLAY") {
      clearTimeout(timeout.value);
      status.value = "IDLE";
    }
  });

  useVisibleTask$(({ cleanup }) => {
    cleanup(() => {
      clearTimeout(timeout.value);
    });
  });
  return (
    <>{(status.value === "DISPLAY" || status.value === "EXPIRE") && <Slot />}</>
  );
});
