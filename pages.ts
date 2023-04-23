declare interface PageConfig {
  key: string;
  link: string
}

const pages: PageConfig[] = [
  { key: 'home',  link: '/' },
  { key: 'routes', link: '/' },
] 

export default pages;