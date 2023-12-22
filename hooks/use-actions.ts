import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<Input, Output> = (
  data: Input
) => Promise<ActionState<Input, Output>>;

interface UserActionOptions<Output> {
  onSuccess?: (data: Output) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <Input, Output>(
  action: Action<Input, Output>,
  options: UserActionOptions<Output> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<Input> | undefined
  >(undefined);

  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Output | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: Input) => {
      setIsLoading(true);

      try {
        const res = await action(input);

        if (!res) {
          return;
        }

        setFieldErrors(res.fieldErrors);

        if (res.error) {
          setError(res.error);
          options.onError?.(res.error);
        }

        if (res.data) {
          setData(res.data);
          options.onSuccess?.(res.data);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
