import "~/styles/globals.css";
import { type Metadata } from "next";
import Sidebar from "~/components/Sidebar";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
    <head>
      <title>My App</title>
      <body>
        <div className="overflow-hidden pr-11 pb-2 bg-white max-md:pr-5">
        <div className="flex gap-5 max-md:flex-col">
          <Sidebar userName="Chris Hood" userEmail="hello@example.com" />
          <main className="flex flex-col ml-3 w-[75%] max-md:w-full">
            {children}
          </main>
        </div>
      </div>
      </body>
    </head>
    </html>
  );
}