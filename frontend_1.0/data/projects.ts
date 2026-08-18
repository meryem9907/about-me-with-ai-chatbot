export type ProjectType = {
  id: string;
  name: string;
  repoLink?: string;
  image: string;
  description?: string;
  liveLink?: string;
  tags?: string[];
};

export const projects: ProjectType[] = [
  {
    id: "1",
    name: "PatiPati",
/*     repoLink: "https://github.com/meryem9907/patipati", */
    image: "/projects/pati-pati.svg",
    description:
      "Animal-focused product concept exploring discovery and care for pets (repository not public yet).",
    tags: ["product", "animals"],
  },
  {
    id: "2",
    name: "Home4Strays",
  /*   repoLink: "https://github.com/meryem9907/home4strays", */
    image: "/projects/home4strays.svg",
    description:
      "Platform concept to help stray animals find shelter and support (repository not public yet).",
    tags: ["social-impact", "animals"],
  },
  {
    id: "3",
    name: "AboutMe with Angular",
    repoLink: "https://github.com/meryem9907/portfolio-angular",
    image: "/projects/about-me.svg",
    description: "Earlier portfolio experiment built with Angular.",
    tags: ["angular", "portfolio"],
  },
  {
    id: "4",
    name: "Chart Explainer for Visually Disabled on Hololens 2",
    repoLink: "https://github.com/meryem9907/chacha-hololens-app",
    image: "/projects/chacha.svg",
    description:
      "Hololens 2 accessibility prototype that explains charts for visually impaired users.",
    tags: ["hololens", "a11y", "xr"],
  },
  {
    id: "5",
    name: "E-commerce platform for honey-based products",
    image: "/projects/ecom.svg",
   /*  repoLink: "https://github.com/meryem9907/honey-ecommerce-platform", */

    description:
      "E-commerce concept for honey-based products (repository not public yet).",
    tags: ["ecommerce", "concept"],
  },
  {
    id: "6",
    name: "Book Recommender",
   /*  repoLink: "https://github.com/meryem9907/book-whisperer", */
    image: "/projects/book.svg",
    description: "Book recommendation experiment powered by user preferences (repository not public yet).",
    tags: ["books", "recommendations"],
  },
];
