import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Look Barber Club | Barbearia em Maceió",
  description: "Look Barber Club, barbearia em Maceió. Conheça nosso ambiente, nosso trabalho e agende seu horário.",
  keywords: ["barbearia em Maceió", "Look Barber Club", "barbearia em Jatiúca", "barbearia em Mangabeiras", "corte masculino", "barba"],
  openGraph: { title: "Look Barber Club | Barbearia em Maceió", description: "Conheça o ambiente e o trabalho da Look Barber Club e agende seu horário.", locale: "pt_BR", type: "website" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const localBusinessJsonLd = { "@context": "https://schema.org", "@type": "BarberShop", name: "Look Barber Club", email: "lookbarberclub@gmail.com", telephone: "+55 82 3025-6277", url: "https://sites.appbarber.com.br/lookbarberclub-y8at", sameAs: ["https://www.instagram.com/lookbarberclub/"], address: { "@type": "PostalAddress", streetAddress: "Av. Dona Constança de Góes Monteiro, 1174 D", addressLocality: "Maceió", addressRegion: "AL", postalCode: "57036-371", addressCountry: "BR" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} /></body></html>;
}
