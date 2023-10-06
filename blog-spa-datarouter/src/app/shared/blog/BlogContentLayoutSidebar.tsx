import { getTags } from "@/app/shared/api/backend-queries";
import TagCloud from "@/app/shared/blog/TagCloud";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function BlogContentLayoutSidebar() {
  const { data: tags } = useSuspenseQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  return <TagCloud tags={tags} />;
}
