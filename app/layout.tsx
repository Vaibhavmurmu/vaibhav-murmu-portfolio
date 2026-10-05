export const metadata = {
  title: "Vaibhav Murmu | Founder & CFO, RunAsh AI",
  description: "Vaibhav Murmu portfolio — founder, CFO, builder, and operator at RunAsh AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
