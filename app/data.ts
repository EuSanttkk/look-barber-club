export const barberShop = {
  name: "Look Barber Club",
  shortName: "LOOK",
  city: "Maceió - AL",
  address: "Av. Dona Constança de Góes Monteiro, 1174 D",
  neighborhood: "Mangabeiras / Jatiúca",
  postalCode: "57036-371",
  phone: "(82) 3025-6277",
  phoneHref: "tel:+558230256277",
  email: "lookbarberclub@gmail.com",
  instagramHandle: "@lookbarberclub",
  instagramUrl: "https://www.instagram.com/lookbarberclub/",
  bookingUrl: "https://sites.appbarber.com.br/lookbarberclub-y8at",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.%20Dona%20Constan%C3%A7a%20de%20G%C3%B3es%20Monteiro%2C%201174%20D%2C%20Macei%C3%B3%20-%20AL%2C%2057036-371",
  hours: [
    { days: "Segunda a sábado", time: "09:00 — 19:00" },
    { days: "Domingo", time: "Fechado" },
  ],
} as const;

export type GalleryItem = {
  id: number;
  category: "Cortes" | "Barba" | "Ambiente" | "Equipe";
  title: string;
  src: string | null;
  ratio: "portrait" | "landscape" | "square" | "tall";
};

// Substitua `null` pelo caminho das fotografias reais, por exemplo: "/images/corte-01.webp".
export const galleryItems: GalleryItem[] = [
  { id: 1, category: "Ambiente", title: "Ambiente Look", src: null, ratio: "tall" },
  { id: 2, category: "Cortes", title: "Corte masculino", src: null, ratio: "landscape" },
  { id: 3, category: "Equipe", title: "Profissional em ação", src: null, ratio: "square" },
  { id: 4, category: "Barba", title: "Cuidados com a barba", src: null, ratio: "portrait" },
  { id: 5, category: "Cortes", title: "Detalhes do corte", src: null, ratio: "square" },
  { id: 6, category: "Ambiente", title: "Detalhes da barbearia", src: null, ratio: "landscape" },
];

export const serviceSlots = [
  { name: "Corte", description: "Opções e disponibilidade no agendamento." },
  { name: "Barba", description: "Opções e disponibilidade no agendamento." },
  { name: "Corte + Barba", description: "Opções e disponibilidade no agendamento." },
  { name: "Cuidados masculinos", description: "Consulte as opções disponíveis." },
] as const;
