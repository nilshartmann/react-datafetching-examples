import express, { Express, Request, Response } from "express";
import { createPostsData } from "./post-data";
import { createCommentsData } from "./comments-data";

let posts = createPostsData();
let comments = createCommentsData();

type SortableByDate = {
  date: string;
};

const orderByDateNewestFirst = (p1: SortableByDate, p2: SortableByDate) =>
  Date.parse(p2.date) - Date.parse(p1.date);
const orderByDateOldestFirst = (p1: SortableByDate, p2: SortableByDate) =>
  Date.parse(p1.date) - Date.parse(p2.date);

const port = process.env.PORT || 7002;

const app: Express = express();

app.set("etag", false);
app.use(express.json());

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,PATCH,DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, res, next) => {
  if (
    req.query.slow !== undefined &&
    req.query.slow !== "false" &&
    req.query.slow !== "0"
  ) {
    const timeout = Number(req.query.slow) || 1200;
    console.log(`    😴 Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

app.get("/posts/:postId", (req: Request, res: Response) => {
  const postId = req.params["postId"];

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
      meta: res.locals.meta,
    });
  }

  return res.status(200).json(post);
});

app.get("/posts/:postId/comments", (req: Request, res: Response) => {
  const postId = req.params["postId"];

  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
    });
  }

  const commentsForPost = comments.filter((c) => c.postId === postId);
  return res.json({ comments: commentsForPost });
});

function findNewestCommentForPost(postId: string) {
  for (let index = comments.length - 1; index >= 0; index--) {
    const comment = comments[index];
    if (comment.postId === postId) {
      return comment.comment;
    }
  }
  return null;
}

app.get("/posts", (req, res) => {
  let result;
  if (req.query.short !== undefined) {
    result = posts.map((p) => ({
      id: p.id,
      date: p.date,
      title: p.title,
      newestComment: findNewestCommentForPost(p.id),
    }));
  } else {
    result = posts.map((p) => p);
  }

  if (req.query.orderBy === "newestFirst") {
    result.sort(orderByDateNewestFirst);
  } else if (req.query.orderBy === "oldestFirst") {
    result.sort(orderByDateOldestFirst);
  } else if (req.query.orderBy === "date") {
    if (req.query.direction === "desc") {
      result.sort(orderByDateNewestFirst);
    } else {
      result.sort(orderByDateOldestFirst);
    }
  }

  res.status(200).json(result);
});

app.post("/posts/:postId/comments", (req, res) => {
  const postId = req.params["postId"];

  if (!posts.find((p) => p.id === postId)) {
    return res.status(404).json({
      error: `Post with id '${postId}' not found`,
    });
  }

  const comment = req.body.comment;
  if (!comment) {
    return res.status(400).json({ error: "comment must be defined" });
  }

  const newComment = {
    comment,
    postId,
    id: `P${comments.length + 1}`,
  };

  comments = [...comments, newComment];

  res.status(201).json(newComment);
});

app.post("/posts", (req, res) => {
  const post = req.body;
  if (!post) {
    return res.status(400).json({ error: "Post must be defined" });
  }

  if (!post.title) {
    return res
      .status(400)
      .json({ error: "post.title must be defined and not empty" });
  }

  if (!post.body) {
    return res
      .status(400)
      .json({ error: "post.body must be defined and not empty" });
  }

  const newPost = {
    user_id: "",
    title: post.title,
    body: post.body,
    date: new Date().toISOString(),
    id: `P${posts.length + 1}`,
    tags: "",
  };

  posts = [...posts, newPost];

  res.status(201).json(newPost);
});

app.listen(port, () => {
  console.log(`
    📞    Blog API Server listening on port ${port}
    👉    Try http://localhost:${port}/posts
    👉    Try http://localhost:${port}/posts/1
    👉    Try http://localhost:${port}/posts/3/comments
    👉    Try http://localhost:${port}/posts?short
    👉    Try "http POST http://localhost:7002/posts title=hallo body=welt"
    👉    Try "http POST http://localhost:7002/posts/1/comments comment=moin"
    😴    Simulate slowness: http://localhost:${port}/posts?slow`);
});
