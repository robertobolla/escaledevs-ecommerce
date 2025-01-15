import Hero from "./_components/Hero";
import ProductSection from "./_components/ProductSection";

export const metadata = {
  title: "Templates for Developers - EscaleDevs",
  description:
    "Clearly describes the products you offer and emphasizes the technologies: React, Next.js, and WordPress plugins.",
  icons: {
    icon: "/favicon.png", // Cambia la ruta si el favicon tiene otro formato o nombre
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductSection />
    </div>
  );
}
