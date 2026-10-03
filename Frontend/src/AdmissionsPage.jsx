import { ArrowRight } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Admissions</p>
          <h1 className="mt-4 text-4xl font-black text-navy">Apply for your next chapter</h1>
          <p className="mt-4 text-slate-600">Begin your admission journey with a digital application process, secure document upload, and real-time review status.</p>

          <ul className="mt-8 space-y-4 text-sm text-slate-700">
            <li>• Application tracking and review status</li>
            <li>• Upload academic and identity documents</li>
            <li>• Secure admission workflow with staff review</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-100 p-6">
          <h2 className="text-xl font-bold text-navy">Application overview</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-white p-3">
              <span>Programme</span>
              <span className="font-semibold">Computer Science</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white p-3">
              <span>Campus</span>
              <span className="font-semibold">Main Campus</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white p-3">
              <span>Status</span>
              <span className="font-semibold text-amber-600">Pending review</span>
            </div>
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-royal px-5 py-3 font-semibold text-white" type="button">
            Start application <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
