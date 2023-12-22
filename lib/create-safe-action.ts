import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<Input, Output> = {
  fieldErrors?: FieldErrors<Input>;
  error?: string | null;
  data?: Output;
};

export const createSafeAction = <Input, Output>(
  schema: z.Schema<Input>,
  handler: (validateData: Input) => Promise<ActionState<Input, Output>>
) => {
  return async (data: Input): Promise<ActionState<Input, Output>> => {
    const validateResult = schema.safeParse(data);
    if (!validateResult.success) {
      return {
        fieldErrors: validateResult.error.flatten()
          .fieldErrors as FieldErrors<Input>,
      };
    }

    return handler(validateResult.data);
  };
};
