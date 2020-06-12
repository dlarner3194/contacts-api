export type ContactType = {
  id: number;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: [
    {
      number: string;
      type: typeof home | typeof mobile | typeof work;
    }
  ];
  email: string;
};

const home = "home";
const mobile = "mobile";
const work = "work";
