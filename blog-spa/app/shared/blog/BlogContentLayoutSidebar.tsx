import { getTags } from "../api/backend-queries";
import TagCloud from "./TagCloud";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function BlogContentLayoutSidebar() {
  const { data: tags } = useSuspenseQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  return <TagCloud tags={tags} />;
}
