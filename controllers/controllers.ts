import Person from "../models/person.model.ts";

const people: Person[] = [
  { id: 1, name: "Cian", age: 28, hairColor: "black" },
];

export const getPeople = ({ response }: { response: any }) => {
  response.body = {
    "success": true,
    "data": people,
  };
};
