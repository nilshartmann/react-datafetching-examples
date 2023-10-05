import { getTags } from "@/app/shared/api/backend-queries";
import TagCloud from "@/app/shared/blog/TagCloud";

export default async function BlogContentLayoutSidebar() {
  const tags = await getTags();

  return <TagCloud tags={tags} />;
}
