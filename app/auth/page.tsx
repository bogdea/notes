import AuthForm from "@/components/AuthForm";

const Auth = () => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-semibold">notes</h1>
        <p className="text-lg text-[var(--medium-gray)]">
          a place for your ideas.
        </p>
      </div>

      <AuthForm />
    </div>
  );
};

export default Auth;
