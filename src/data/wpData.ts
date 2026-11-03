import pagesData from '../../data/raw/pages.json';
import postsData from '../../data/raw/posts.json';
import categoriesData from '../../data/raw/categories.json';
import linkedPostsData from '../../data/linked_posts.json';

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  link: string;
  modified: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  date: string;
  categories: number[];
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface AwardItem {
  project: string;
  client: string;
  award: string;
  year: string;
  slug: string;
  link: string;
}

export interface FeaturedCase {
  title: string;
  client: string;
  image: string;
  category: string;
  slug: string;
  link: string;
}

// 5 Cases de Destaque da Home com imagens locais fiéis
export const FEATURED_CASES: FeaturedCase[] = [
  {
    title: 'O Algoritmo da Vida',
    client: 'RollingStone',
    image: '/images/cases/algoritmo-da-vida.png',
    category: 'Projetos Especiais',
    slug: 'algoritmo-da-vida',
    link: '/projetos'
  },
  {
    title: 'MIA',
    client: 'Whiskas',
    image: '/images/cases/mia-whiskas.jpg',
    category: 'IA / Tecnologia',
    slug: 'mia-whiskas',
    link: '/projetos'
  },
  {
    title: 'McCode',
    client: "McDonald's",
    image: '/images/cases/mccode-mcdonalds.png',
    category: 'WebApp',
    slug: 'mcdonalds-mccode',
    link: '/projetos'
  },
  {
    title: 'Strangerama',
    client: 'Netflix',
    image: '/images/cases/strangerama-netflix.png',
    category: 'Cenografia / Interação',
    slug: 'strangerama-netflix',
    link: '/projetos'
  },
  {
    title: '#BatuqueChallenge',
    client: 'Chevrolet',
    image: '/images/cases/batuque-challenge-chevrolet.jpg',
    category: 'Lives / Interação',
    slug: 'batuque-challenge-chevrolet',
    link: '/projetos'
  }
];

// Lista consolidada de clientes atendidos (extraída de Page 349)
export const CLIENTS_LIST: string[] = [
  'Accor Hotels', 'Allergan', 'Ambev', 'Amstel', 'Axe', 'Bacardi', 'Bradesco', 'Brahma',
  'Bristol-Myers Squibb', 'Budweiser', 'Calvin Klein', 'Cetip', 'Claro', 'Clube de Criação',
  'Coca-Cola', 'Decolar', 'Doritos', 'ESPN', 'Etna', 'Eukanuba', 'Ford', 'Friboi', 'Garoto',
  'General Mills', 'General Motors', 'Gillette', 'Gol', 'Grey Goose', 'Heineken', 'Heinz',
  'Honda', 'HP', 'IMS Health', 'Itaipava', 'Itaú', 'Johnson & Johnson', 'L&PM Pocket', 'Roche',
  'Lay’s', 'Lifebuoy', 'Listerine', 'Mattel', "McDonald's", 'Mercedes-Benz', 'Microsoft',
  'Mitsubishi', 'Natura', 'NBB', 'Nestlé', 'Nike', 'Nissin', 'Nova Schin', 'Obrigado',
  'P&G', 'Pepsico', 'Pinterest', 'Raízen', 'Sadia', 'Samsung', 'Sanofi', 'Santander', 'Shell',
  'Smiles', 'Sony Pictures', 'Swift', 'T4F', 'TNT', 'Tok&Stok', 'Tucca', 'UFC', 'Ultrafarma',
  'UOL', 'Veja', 'Versy', 'ViaQuatro', 'Vivo', 'Volvo', 'Warner Brothers'
];

// Tabela de Prêmios mapeada a partir de Page 349 e linked_posts.json
export const AWARDS_LIST: AwardItem[] = [
  {
    project: 'Desalma',
    client: 'Globoplay',
    award: 'Muse Awards',
    year: '2021',
    slug: 'desalma-globoplay',
    link: '/projetos'
  },
  {
    project: 'Cozinha às Cegas',
    client: 'Maggi',
    award: 'Cannes Lions',
    year: '2021',
    slug: 'cozinha-as-cegas-maggi',
    link: '/projetos'
  },
  {
    project: 'Accessibility Mat',
    client: 'Ford Brasil',
    award: 'Cannes Lions<br />Wave Festival<br />D&AD Awards',
    year: '2019',
    slug: 'acessibility-mat',
    link: '/projetos'
  },
  {
    project: 'Algoritmo da Vida',
    client: 'Rolling Stone',
    award: 'Cannes Lions',
    year: '2019',
    slug: 'algoritmo-da-vida',
    link: '/projetos'
  },
  {
    project: '110 Anos Johnnie Walker',
    client: 'Johnnie Walker',
    award: 'Cannes Lions',
    year: '2019',
    slug: 'johnnie-walker-110-anos-aeroporto-projecao-e-ooh',
    link: '/projetos'
  },
  {
    project: 'Congelador Cerveja',
    client: 'Heineken',
    award: 'Cannes Lions',
    year: '2019',
    slug: 'freezer-beerboard-amstel',
    link: '/projetos'
  },
  {
    project: 'A Rota de Emergência',
    client: 'JCDecaux',
    award: 'Cannes Lions',
    year: '2018',
    slug: 'a-rota-de-emergencia',
    link: '/projetos'
  },
  {
    project: 'Reactive Poster',
    client: 'Nike',
    award: 'Cannes Lions',
    year: '2018',
    slug: 'reactive-poster-nike',
    link: '/projetos'
  },
  {
    project: 'The Clean Braille',
    client: 'Lifebuoy',
    award: 'Cannes Lions',
    year: '2017',
    slug: 'lifebuoy-the-clean-braille',
    link: '/projetos'
  },
  {
    project: 'McCode',
    client: "McDonald's",
    award: 'Cannes Lions',
    year: '2016',
    slug: 'mcdonalds-mccode',
    link: '/projetos'
  },
  {
    project: 'Pinlist',
    client: 'Tok&Stok',
    award: 'Cannes Lions',
    year: '2016',
    slug: 'pinlist-tokstok',
    link: '/projetos'
  },
  {
    project: 'Radio Finger',
    client: 'Itaipava',
    award: 'Cannes Lions',
    year: '2016',
    slug: 'itaipava-radio-finger',
    link: '/projetos'
  },
  {
    project: 'The Speaking Fireworks',
    client: 'Area 23',
    award: 'Cannes Lions',
    year: '2016',
    slug: 'the-speaking-fireworks',
    link: '/projetos'
  },
  {
    project: 'Parking Radio',
    client: 'FMA Brasil Insurance',
    award: 'Cannes Lions',
    year: '2016',
    slug: 'parking-radio-fma-brasil-insurance',
    link: '/projetos'
  },
  {
    project: 'Jogadores Invisíveis',
    client: 'ESPNW',
    award: 'Clio Awards',
    year: '2016',
    slug: 'jogadores-invisiveis',
    link: '/projetos'
  },
  {
    project: 'School Zone Radio',
    client: 'Suzuki',
    award: 'Cannes Lions',
    year: '2016',
    slug: 'school-zone-radio-suzuki',
    link: '/projetos'
  }
];

export function getPages(): WPPage[] {
  return pagesData as unknown as WPPage[];
}

export function getPageBySlug(slug: string): WPPage | undefined {
  return getPages().find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getPageById(id: number): WPPage | undefined {
  return getPages().find((p) => p.id === id);
}

export function getPosts(): WPPost[] {
  return postsData as unknown as WPPost[];
}

export function getCategories(): WPCategory[] {
  return categoriesData as unknown as WPCategory[];
}

export function getCategoryMap(): Map<number, string> {
  const map = new Map<number, string>();
  for (const cat of getCategories()) {
    map.set(cat.id, cat.name);
  }
  return map;
}

export function getLinkedPosts() {
  return linkedPostsData;
}
