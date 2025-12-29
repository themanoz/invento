import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="size-4" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Invento</span>
          </div>

          <Link
            href="/signup"
            className="bg-black hover:bg-neutral-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200"
          >
            Start Selling
          </Link>
        </div>
      </nav>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl -z-10 opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8">
            <span className="flex h-2 w-2 rounded-full bg-black"></span>
            <span className="text-xs font-semibold text-neutral-700 tracking-wide uppercase">
              SaaS Inventory App
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-neutral-800">
            #1 Inventory App
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your inventory, connect with buyers, and grow your business
            with Invento. Join hundreds of successful sellers already growing
            their revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-neutral-700 text-white rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              Start Selling
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-semibold text-lg transition-all flex items-center justify-center">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
