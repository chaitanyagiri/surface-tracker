import InstallStep from "~/components/InstallStep";
import TestStep from "~/components/TestStep";

export default function HomePage() {
  return (
    <div className="flex flex-col mt-7 w-full max-md:mt-10 max-md:max-w-full">
        <header className="flex flex-col w-full text-3xl font-semibold leading-none text-zinc-900 max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <h1>Getting started</h1>
            <div className="flex mt-5 w-full bg-slate-200 min-h-[1px] max-md:max-w-full" />
          </div>
        </header>
        <div className="flex flex-col mt-9 w-full max-md:max-w-full">
          <InstallStep
            title="Install Surface Tag on your site"
            description="Enable tracking and analytics."
            disabled={false}
          />
          <TestStep
            title="Test Surface Tag Events"
            description="Test if the Surface Tag is properly emitting events."
            disabled={false}
          />
        </div>
      </div>
  );
}