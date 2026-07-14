import Header from "@/components/header";
import TabBar from "@/components/tab-bar";
import LightDarkBtn from "@/components/light-dark-btn";
import Credits from "@/components/credits";

export default function Home() {
  return (
    <div className="bg-retro-bg min-h-dvh">
      <Header />
       <TabBar />

      <LightDarkBtn />
    </div>
  );
}
