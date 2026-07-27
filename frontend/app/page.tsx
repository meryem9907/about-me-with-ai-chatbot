import Header from "@/components/header";
import TabBar from "@/components/tab-bar";
import LightDarkBtn from "@/components/light-dark-btn";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-[var(--retro-bg)] min-h-dvh">
      <Header />
       <TabBar />
       <Footer />
      <LightDarkBtn />
    </div>
  );
}
