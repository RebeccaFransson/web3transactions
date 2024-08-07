import { Box } from "../_components/box";
import { PrimaryButton } from "../_components/button";
import { H1 } from "../_components/text";

export default function Transactions() {
  return (
    <div className="">
      <H1 className="pb-1">Transactions</H1>
      <Box className="">
        hej <PrimaryButton href="/">Click me</PrimaryButton>
      </Box>
    </div>
  );
}
