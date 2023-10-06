import Card from "../components/Card";
import { dateTimeString } from "../components/date-formatter";
import { H1 } from "../components/Heading.tsx";

type PostProps = {
  post: {
    date?: string;
    title: string;
    bodyHtml: string;
  };
};
export default function Post({ post }: PostProps) {
  return (
    <Card renderAs={"article"}>
      {!!post.date && <p>{dateTimeString(post.date)}</p>}
      <H1 style={"primary"} className={" mb-4 "}>
        {post.title}
      </H1>
      <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
    </Card>
  );
}
