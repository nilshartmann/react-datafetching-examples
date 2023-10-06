import Card from "../components/Card";
import { H2 } from "../components/Heading";
import { useFetchComments } from "./use-fetch-comments.tsx";

type CommentListProps = {
  postId: string;
};
export default function CommentList({ postId }: CommentListProps) {
  const { data: comments } = useFetchComments(postId);

  if (!comments?.length) {
    return <p>No comments for this post.</p>;
  }

  return (
    <Card>
      <H2 style={"primary"}>Comments</H2>
      <div className={"space-y-4"}>
        {comments.map((c) => (
          <div key={c.id}>
            <span className={"font-bold"}>{c.username}:</span> {c.comment}
          </div>
        ))}
      </div>
    </Card>
  );
}
