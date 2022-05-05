import { Stack, StackProps } from "@mui/material";

export const CenterStack: typeof Stack = ({
  children,
  ...rest
}: StackProps) => (
  <Stack justifyContent="center" alignItems="center" {...rest}>
    {children}
  </Stack>
);
