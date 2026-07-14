import MenuBar from "@/components/tab-bar";

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MenuBar />
      {children}
    </div>
  );
}
