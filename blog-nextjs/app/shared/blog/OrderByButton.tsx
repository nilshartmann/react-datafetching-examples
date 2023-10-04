"use client";

import useBlogSearchParams from "@/app/shared/blog/useBlogSearchParams";
import Button from "@/app/shared/components/Button";
import { OrderBy } from "@/app/shared/api/types";

type OrderByButtonProps = {
  orderBy: OrderBy;
};

export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const { currentOrderBy, updateOrderBy } = useBlogSearchParams();

  const label = orderBy;

  return (
    <Button
      size={"sm"}
      disabled={currentOrderBy === orderBy}
      onClick={() => updateOrderBy(orderBy)}
    >
      Order by date {label}
    </Button>
  );
}
