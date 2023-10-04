"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderBy } from "@/app/shared/api/types";

export default function useBlogSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentOrderBy = (searchParams?.get("order_by") || "desc") as OrderBy;

  const updateOrderBy = (newOrderBy: OrderBy) => {
    const params = new URLSearchParams({ order_by: newOrderBy });
    router.push(`?${params.toString()}`);
  };

  return { currentOrderBy, updateOrderBy } as const;
}
