export interface MenuItem {
  name: string;
  price: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  category: string;
  type: 'museum' | 'beach' | 'gastronomy' | 'nature' | 'culture' | 'historic';
  rating: number;
  image: string;
  description: string;
  distance: string;
  time: string;
  directions: string[];
  lat: number;
  lng: number;
  menu?: MenuItem[];
  isFavorite?: boolean;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Orla de Atalaia',
    city: 'Aracaju, SE',
    category: 'Ponto Turístico',
    type: 'beach',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549492423-4002b9a27f47?q=80&w=1200&auto=format&fit=crop',
    description: 'A Orla de Atalaia é considerada uma das mais bonitas e completas do Brasil. Com mais de 6km de extensão, oferece ciclovias, quadras poliesportivas, lagos, o Oceanário de Aracaju e diversos restaurantes.',
    distance: '2 km',
    time: '20 min',
    directions: [
      'Siga pela Av. Beira Mar em direção ao sul.',
      'A Orla estará à sua esquerda próxima aos Arcos da Orla.',
      'Diversos bolsões de estacionamento estão disponíveis ao longo da via.'
    ],
    lat: -10.9856,
    lng: -37.0425
  },
  {
    id: '2',
    name: 'Canyon do Xingó',
    city: 'Canindé de São Francisco, SE',
    category: 'Natureza & Aventura',
    type: 'nature',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=1200&auto=format&fit=crop',
    description: 'Localizado em Canindé de São Francisco, o Canyon do Xingó é um dos maiores do mundo. Suas águas verdes e paredões de rocha oferecem uma experiência inesquecível de navegação pelo Rio São Francisco.',
    distance: '213 km',
    time: '3h 20min',
    directions: [
      'Siga pela Rodovia SE-230 partindo de Aracaju sentido Canindé.',
      'Existem opções de ônibus diários saindo do Terminal Rodoviário José Rollemberg Leite.',
      'O passeio de catamarã deve ser agendado com antecedência no restaurante Karranca\'s.'
    ],
    lat: -9.6358,
    lng: -37.8488
  },
  {
    id: '3',
    name: 'Mercado Municipal Antônio Franco',
    city: 'Aracaju, SE',
    category: 'Cultura & Gastronomia',
    type: 'culture',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=1200&auto=format&fit=crop',
    description: 'Inaugurado em 1926, é um dos principais centros de artesanato e cultura de Sergipe. Aqui você encontra renda irlandesa, castanhas, farinhas e o melhor da culinária regional.',
    distance: '1.2 km',
    time: '10 min',
    directions: [
      'Localizado no Centro de Aracaju, próximo à Praça General Valadão.',
      'Para quem vem da zona sul, seguir pela Av. Beira Mar sentido Centro.',
      'Muitas linhas de ônibus param no terminal do centro ao lado do mercado.'
    ],
    lat: -10.9126,
    lng: -37.0435,
    menu: [
      { name: 'Arroz Doce de Castanha', price: 'R$ 15,00', image: 'https://images.unsplash.com/photo-1590080875515-8a518923c939?q=80&w=400' },
      { name: 'Tapioca de Carne de Sol', price: 'R$ 22,00', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400' }
    ]
  },
  {
    id: '4',
    name: 'Museu da Gente Sergipana',
    city: 'Aracaju, SE',
    category: 'Museus',
    type: 'museum',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1518998053901-55d8d3961a00?q=80&w=1200&auto=format&fit=crop',
    description: 'O museu é totalmente interativo e tecnológico, celebrando a identidade e o folclore do povo sergipano. É um passeio imperdível para todas as idades.',
    distance: '1.5 km',
    time: '15 min',
    directions: [
      'Situa-se no antigo prédio do Colégio Atheneuzinho, na Av. Ivo do Prado.',
      'Entrada gratuita para todos os públicos.',
      'Recomendado reservar ao menos 2 horas para o passeio.'
    ],
    lat: -10.9155,
    lng: -37.0494
  },
  {
    id: '5',
    name: 'Restaurante Karranca\'s',
    city: 'Canindé de São Francisco, SE',
    category: 'Gastronomia',
    type: 'gastronomy',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    description: 'Localizado às margens do Rio São Francisco, é o ponto de partida para os passeios de catamarã pelos Canyons do Xingó. Oferece buffet completo de comida regional.',
    distance: '213 km',
    time: '3h 25min',
    directions: ['Localizado na recepção dos passeios de Xingó em Canindé.'],
    lat: -9.6415,
    lng: -37.8540,
    menu: [
      { name: 'Peixe do Velho Chico', price: 'R$ 85,00', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400' },
      { name: 'Moqueca Sergipana', price: 'R$ 120,00', image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?q=80&w=400' }
    ]
  }
];

// Transformers
export const transformLocationsByCategory = (items: Location[], category: string) => {
  if (category === 'Tudo' || category === 'Todos') return items;
  return items.filter(item => item.type.toLowerCase() === category.toLowerCase() || item.category.toLowerCase().includes(category.toLowerCase()));
};

export const getPopularLocations = (items: Location[]) => {
  return [...items].sort((a, b) => b.rating - a.rating).slice(0, 3);
};
