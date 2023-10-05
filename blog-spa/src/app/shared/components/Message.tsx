import clsx from "clsx";

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};
export default function Message({ msg, type = "error" }: MessageProps) {
  const className = clsx(
    type === "error" ? `text-primary font-bold` : `text-green`,
  );

  return <p className={className}>{msg}</p>;
}
