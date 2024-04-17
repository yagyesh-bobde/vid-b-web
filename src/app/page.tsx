import EarlyAdopters from "~/components/EarlyAdopters/EarlyAdopters";
import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import Hero from "~/components/Hero/Hero";
import KeyFeatures from "~/components/KeyFeatures/KeyFeatures";
import Steps from "~/components/Steps/Steps";
import Subscribe from "~/components/Subscribe/Subscribe";

export default function HomePage() {
  return (
    <main className="space-y-18">
      <Header />
      <Hero />
      <Steps />
      <KeyFeatures />
      <EarlyAdopters />
      <Subscribe />
      <Footer />
    </main>
  );
}
