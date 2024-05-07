import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LogInForm/LogInForm';

export default function AuthPage({ setUser }) {
  return (
    <main className="flex justify-center items-center min-h-screen bg-neutral">
      <div className="w-full max-w-4xl flex flex-wrap justify-center md:justify-between p-4 space-x-0 md:space-x-10">
        <h1 className="w-full text-center text-2xl font-bold mb-6">AuthPage</h1>
        <SignUpForm setUser={setUser} />
        <LogInForm setUser={setUser} />
      </div>
    </main>
  );
}
