import { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, Clock3, FileText, GraduationCap, Landmark, Menu, ShieldCheck, Users } from 'lucide-react';
import AdmissionsPage from './AdmissionsPage';

const ROLE_PATHS = {
  STUDENT: '/student/dashboard',
  STAFF: '/staff/dashboard',
  ADMIN: '/admin/dashboard'
};

function PublicLayout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 text-textdark">
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-white/10 text-lg font-bold text-gold">TR</div>
            <div>
              <p className="text-lg font-bold">The Real Sam University</p>
              <p className="text-xs text-slate-300">Knowledge. Integrity. Leadership.</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className="text-sm hover:text-gold">Home</NavLink>
            <NavLink to="/about" className="text-sm hover:text-gold">About</NavLink>
            <NavLink to="/programmes" className="text-sm hover:text-gold">Programmes</NavLink>
            <NavLink to="/admissions" className="text-sm hover:text-gold">Admissions</NavLink>
            <NavLink to="/news" className="text-sm hover:text-gold">News</NavLink>
            <NavLink to="/contact" className="text-sm hover:text-gold">Contact</NavLink>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <span className="rounded-full border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold">{user.role}</span>
                <button
                  onClick={onLogout}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm"
                  type="button"
                >
                  Logout
                </button>
                <NavLink to={ROLE_PATHS[user.role]} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy">
                  Dashboard
                </NavLink>
              </>
            ) : (
              <>
                <button className="rounded-full border border-white/20 px-4 py-2 text-sm" type="button">Portal</button>
                <NavLink to="/login" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy">Apply Now</NavLink>
              </>
            )}
          </div>

          <button className="md:hidden" aria-label="Open menu" type="button">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-navy px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-white/10 font-bold text-gold">TR</div>
              <div>
                <p className="font-bold">The Real Sam University</p>
                <p className="text-xs text-slate-300">Academic Excellence</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">Innovative learning, secure workflows, and student-centered support across every stage of the academic journey.</p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Admissions</li>
              <li>Faculties</li>
              <li>Academic Calendar</li>
              <li>Student Portal</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Campuses</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Main Campus</li>
              <li>Technology Park</li>
              <li>Innovation Centre</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>hello@trsu.demo</li>
              <li>+234 800 000 0000</li>
              <li>Plot 44, Academic Avenue</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-navy via-blue-900 to-royal px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">Future-ready learning</p>
            <h1 className="max-w-xl text-4xl font-black leading-tight md:text-6xl">A smarter campus experience for every student.</h1>
            <p className="mt-5 max-w-lg text-lg text-slate-200">The Real Sam University integrates academic excellence, transparent operations, and digitally secure student services across the whole campus journey.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NavLink to="/login" className="rounded-full bg-gold px-6 py-3 font-semibold text-navy">Portal Login</NavLink>
              <NavLink to="/admissions" className="rounded-full border border-white/30 px-6 py-3 font-semibold">Admissions</NavLink>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 shadow-soft backdrop-blur-sm">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-5 text-navy">
                <p className="text-sm uppercase text-slate-500">Student enrollment</p>
                <p className="mt-2 text-3xl font-black">18,420</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-300">Faculties</p>
                  <p className="mt-2 text-2xl font-bold text-gold">5</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-slate-300">Programmes</p>
                  <p className="mt-2 text-2xl font-bold text-gold">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Why choose us</p>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">An academic ecosystem built for growth</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: <Landmark className="h-6 w-6" />, title: 'Mission-driven', text: 'Focused on meaningful education and innovation.' },
            { icon: <GraduationCap className="h-6 w-6" />, title: 'Student success', text: 'Supportive systems and academic advising.' },
            { icon: <ShieldCheck className="h-6 w-6" />, title: 'Trusted systems', text: 'Secure operations and role-based governance.' },
            { icon: <Users className="h-6 w-6" />, title: 'Community', text: 'Connected students, staff, and alumni.' }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-royal">{item.icon}</div>
              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Faculties</p>
              <h2 className="mt-4 text-3xl font-black">Academic excellence across disciplines</h2>
            </div>
            <button className="hidden rounded-full border border-navy px-4 py-2 text-sm font-semibold md:inline-flex" type="button">Explore all programmes</button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {['Computing', 'Management Sciences', 'Engineering', 'Arts', 'Social Sciences', 'Health Sciences'].map((faculty) => (
              <div key={faculty} className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="mb-4 inline-flex rounded-full bg-gold/10 p-2 text-gold"><BookOpen className="h-5 w-5" /></div>
                <h3 className="text-xl font-bold">{faculty}</h3>
                <p className="mt-2 text-sm text-slate-600">Practical learning, vibrant research, and career-focused training.</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-royal" type="button">Learn more <ArrowRight className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LoginPage({ onLogin, user }) {
  const [email, setEmail] = useState('student@trsu.demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success || !payload.data?.token) {
        throw new Error(payload.message || 'Login failed.');
      }

      const userData = payload.data.user;
      onLogin({
        ...userData,
        token: payload.data.token
      });

      navigate(ROLE_PATHS[userData.role] || '/student/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to={ROLE_PATHS[user.role] || '/student/dashboard'} replace />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-soft md:grid-cols-2">
        <div className="bg-navy p-10 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Secure portal</p>
          <h1 className="mt-4 text-4xl font-black">Welcome back</h1>
          <p className="mt-4 text-slate-200">Access registrations, results, payments, staff reviews, and admin controls with secure role-based access.</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            <li>• Student: student@trsu.demo / demo123</li>
            <li>• Staff: staff@trsu.demo / staff123</li>
            <li>• Admin: admin@trsu.demo / admin123</li>
          </ul>
        </div>

        <div className="p-10">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-royal"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-royal"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <button className="w-full rounded-xl bg-royal px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Continue to portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function StudentDashboardPage({ user }) {
  const cards = [
    { label: 'Current GPA', value: '3.84' },
    { label: 'Outstanding fees', value: 'NGN 52,500' },
    { label: 'Courses registered', value: '8' }
  ];

  const notifications = [
    { type: 'Admission', title: 'Application under review', detail: 'Your admission record is currently being checked by the Registry.', icon: <Clock3 className="h-5 w-5" /> },
    { type: 'Finance', title: 'Tuition balance due', detail: 'Your outstanding tuition balance is NGN 52,500.', icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { type: 'Documents', title: 'Transcript verified', detail: 'Academic transcript was validated successfully.', icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Student portal</p>
          <h1 className="mt-3 text-3xl font-black">Welcome, {user?.fullName || 'Student'}</h1>
        </div>
        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">Active</div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-4 text-3xl font-black text-navy">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Academic status</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• Result slip for EEE 201 published.</li>
            <li>• Registration for 2nd semester pending HOD approval.</li>
            <li>• Payment receipt for tuition balance uploaded.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Upcoming actions</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• Complete results verification.</li>
            <li>• Pay faculty levy before 30 October.</li>
            <li>• Attend registration counselling session.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold">Notifications</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-3 inline-flex rounded-xl bg-blue-50 p-2 text-royal">{item.icon}</div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
              <h3 className="mt-2 font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaffDashboardPage({ user }) {
  const cards = [
    { label: 'Courses assigned', value: '6' },
    { label: 'Results pending', value: '24' },
    { label: 'Students advised', value: '152' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Staff portal</p>
          <h1 className="mt-3 text-3xl font-black">Welcome, {user?.fullName || 'Lecturer'}</h1>
        </div>
        <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">Lecturer access</div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-4 text-3xl font-black text-navy">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Teaching overview</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• CSC 201 lectures delivered this week: 4.</li>
            <li>• Student attendance compliance: 92%.</li>
            <li>• Two assignments due for grading this week.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Approval queue</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• 12 continuous assessment records awaiting review.</li>
            <li>• 3 seminar lists require HOD sign-off.</li>
            <li>• 5 student requests need callback.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardPage({ user }) {
  const cards = [
    { label: 'Students', value: '4,820' },
    { label: 'Registrations', value: '134' },
    { label: 'Payments', value: '2,406' },
    { label: 'Admissions', value: '75' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">Admin portal</p>
          <h1 className="mt-3 text-3xl font-black">Welcome, {user?.fullName || 'Administrator'}</h1>
        </div>
        <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">Executive view</div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-4 text-3xl font-black text-royal">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Operational alerts</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• 12 registrations awaiting HOD review.</li>
            <li>• 5 payment anomalies require verification.</li>
            <li>• 2 faculty applications pending approval.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold">Strategic decisions</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• Budget review for 2026 academic year.</li>
            <li>• Faculty staffing plan to be approved.</li>
            <li>• Student retention target review scheduled.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('trsu-user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('trsu-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('trsu-user');
    }
  }, [user]);

  const handleLogout = () => setUser(null);

  return (
    <PublicLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/programmes" element={<HomePage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/news" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/login" element={<LoginPage user={user} onLogin={setUser} />} />
        <Route path="/student/dashboard" element={user?.role === 'STUDENT' ? <StudentDashboardPage user={user} /> : <Navigate to="/login" replace />} />
        <Route path="/staff/dashboard" element={user?.role === 'STAFF' ? <StaffDashboardPage user={user} /> : <Navigate to="/login" replace />} />
        <Route path="/admin/dashboard" element={user?.role === 'ADMIN' ? <AdminDashboardPage user={user} /> : <Navigate to="/login" replace />} />
      </Routes>
    </PublicLayout>
  );
}

export default App;
