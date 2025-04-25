export interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  popular: boolean;
}

const cities: City[] = [
  {
    id: "nyc",
    name: "New York City",
    state: "New York",
    country: "USA",
    popular: true,
  },
  {
    id: "la",
    name: "Los Angeles",
    state: "California",
    country: "USA",
    popular: true,
  },
  {
    id: "chi",
    name: "Chicago",
    state: "Illinois",
    country: "USA",
    popular: true,
  },
  {
    id: "hou",
    name: "Houston",
    state: "Texas",
    country: "USA",
    popular: false,
  },
  {
    id: "mia",
    name: "Miami",
    state: "Florida",
    country: "USA",
    popular: true,
  },
  {
    id: "sf",
    name: "San Francisco",
    state: "California",
    country: "USA",
    popular: true,
  },
  {
    id: "sea",
    name: "Seattle",
    state: "Washington",
    country: "USA",
    popular: false,
  },
  {
    id: "den",
    name: "Denver",
    state: "Colorado",
    country: "USA",
    popular: false,
  },
  {
    id: "atl",
    name: "Atlanta",
    state: "Georgia",
    country: "USA",
    popular: false,
  },
  {
    id: "bos",
    name: "Boston",
    state: "Massachusetts",
    country: "USA",
    popular: false,
  },
  {
    id: "lon",
    name: "London",
    state: "",
    country: "UK",
    popular: true,
  },
  {
    id: "par",
    name: "Paris",
    state: "",
    country: "France",
    popular: true,
  },
  {
    id: "tok",
    name: "Tokyo",
    state: "",
    country: "Japan",
    popular: true,
  }
];

export const getPopularCities = (): City[] => {
  return cities.filter(city => city.popular);
};

export const getAllCities = (): City[] => {
  return cities;
};

export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};

export default cities;