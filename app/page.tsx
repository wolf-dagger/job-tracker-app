import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex-1">
          {/* Hero section */}
          <section className="container mx-auto p-4 py-32">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-black mb-6 text-6xl font-bold">
                A better way to track your job applications...
              </h1>
              <p className="text-muted-foreground mb-10 text-xl">
                Capture, Organize and manage your job applications in one place.
              </p>
              <div className="flex flex-col items-center gap-4">
                {/* <button>Start for free</button> */}
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Start for free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Free forever. No payment needed...
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
