import useBlogSearchParams from "./useBlogSearchParams";
import Button from "../components/Button";
import { OrderBy } from "../api/types";
import { useTransition } from "react";
import LoadingIndicator from "../components/LoadingIndicator";

type OrderByButtonProps = {
  orderBy: OrderBy;
};

export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { currentOrderBy, updateOrderBy } = useBlogSearchParams();

  const label = orderBy;

  function handleClick() {
    startTransition(() => {
      updateOrderBy(orderBy);
    });
  }

  return (
    <Button
      size={"sm"}
      disabled={currentOrderBy === orderBy}
      onClick={handleClick}
    >
      {isPending && <LoadingIndicator secondary />}
      {isPending || <>Order by date {label}</>}
    </Button>
  );
}
