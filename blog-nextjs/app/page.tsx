import AppLink from "@/app/shared/components/AppLink";
import H1 from "@/app/shared/components/Heading";

export default function LandingPage() {
  return (
    <main>
      <header
        className={
          "border-b-grey-1 text-grey-3 flex items-end justify-between border-b-4 pb-4"
        }
      >
        <h1 className={"text-grey-3 m-0 mx-auto p-0 text-3xl font-bold"}>
          Simple Blog
        </h1>
      </header>
      <div className="px-4 pb-16 pt-32 text-center">
        <div className="mx-auto mb-4 max-w-4xl text-6xl font-bold">
          Full stack, Full blog
        </div>
        <H1 className="mx-auto max-w-4xl font-bold">
          Professional blogging{" "}
          <span className="text-primary relative whitespace-nowrap">
            <span className="relative">made easy</span>
          </span>
          .
        </H1>
        <p className="text-tblue-600 mx-auto mt-6 max-w-2xl text-lg tracking-tight">
          There are a lot of blog and publishing apps. But only this one is also
          used to learn fullstack development with Next.js.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <AppLink variant="button" href={"/blog"} size={"lg"}>
            Let's get started
          </AppLink>
        </div>
      </div>
    </main>
  );
}
