import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="bg-white font-sans antialiased">
      <div className="container mx-auto">
        <div className={"p-3"}>
          <Outlet />
        </div>
      </div>
      <div className="container mx-auto">
        <div className={"mb-4 mt-4 border-t-2 text-center"}>
          Blog Example, SPA Edition (React Router, TanStack Query, Suspense)
        </div>
      </div>
    </div>
  );
}
