const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout">
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
