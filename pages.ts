declare interface PageConfig {
  title: string;
  showInHeader: boolean;
  link: string
}

const pages: PageConfig[] = [
  { title: 'header.home', showInHeader: true, link: '/' },
  { title: 'Rotas', showInHeader: true, link: '/' },
] 

export default pages;