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

export const addPerson = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = {
    "success": true,
    "data": people,
  };
};

export const getPerson = (
  { params, response }: { response: any; params: { id: string } },
) => {
  const person: Person | undefined = people.find((person: Person) =>
    person.id === params.id
  );

  if (person) {
    response.status = 200;
    response.body = {
      "success": true,
      "data": person,
    };
  } else {
    response.status = 404;
    response.body = {
      "success": false,
      "msg": "No person found",
    };
  }
};

export const updatePerson = ({ response }: { response: any }) => {
  response.body = {
    "success": true,
    "data": people,
  };
};

export const deletePerson = ({ response }: { response: any }) => {
  response.body = {
    "success": true,
    "data": people,
  };
};
