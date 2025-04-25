export interface Cuisine {
    id: string;
    name: string;
    image: string;
    description: string;
    popular: boolean;
  }
  
  const cuisines: Cuisine[] = [
    {
      id: "chinese",
      name: "Chinese",
      image: "https://solarisanna.sirv.com/cuisines/chinese.webp",
      description: "Traditional dishes from China featuring woks, noodles, and distinctive flavors.",
      popular: true,
    },
    {
      id: "indian",
      name: "Indian",
      image: "https://solarisanna.sirv.com/cuisines/indian.jpg",
      description: "Rich in spices and diverse flavors from across the Indian subcontinent.",
      popular: true,
    },
    {
      id: "italian",
      name: "Italian",
      image: "https://solarisanna.sirv.com/cuisines/italian.jpeg",
      description: "Classic Mediterranean cuisine featuring pasta, pizza, and fresh ingredients.",
      popular: true,
    },
    {
      id: "mexican",
      name: "Mexican",
      image: "https://solarisanna.sirv.com/cuisines/Traditional-Mexican-Dishes-1.webp",
      description: "Vibrant flavors with corn, beans, and chili peppers in traditional recipes.",
      popular: true,
    },
    {
      id: "arabian",
      name: "Arabian",
      image: "https://solarisanna.sirv.com/cuisines/download.jpg",
      description: "Middle Eastern delights with rich spices, grilled meats, and flavorful mezze.",
      popular: true,
    }
  ];
  
  export const getPopularCuisines = (): Cuisine[] => {
    return cuisines.filter(cuisine => cuisine.popular);
  };
  
  export const getAllCuisines = (): Cuisine[] => {
    return cuisines;
  };
  
  export const getCuisineById = (id: string): Cuisine | undefined => {
    return cuisines.find(cuisine => cuisine.id === id);
  };
  
  export default cuisines;