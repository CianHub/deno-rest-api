import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";

import Person from "../models/person.model.ts";

// connect to db
const client = new Client({
  user: Deno.env.get("dbUser"),
  database: Deno.env.get("dbName"),
  password: Deno.env.get("dbPassword"),
  hostname: Deno.env.get("dbHostname"),
  port: 5432,
});

let people: Person[] = [
  { id: "1", name: "Cian", age: 28, hairColor: "black" },
];

export const getPeople = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = {
    "success": true,
    "data": people,
  };
};

export const addPerson = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      "success": false,
      "msg": "No data",
    };
  } else {
    const person: Person = body.value;
    person.id = v4.generate();
    people.push(person);

    response.status = 201;
    response.body = {
      "success": true,
      "data": person,
    };
  }
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

export const updatePerson = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const body = await request.body();

  const person: Person | undefined = people.find((person: Person) =>
    person.id === params.id
  );

  if (!request.hasBody || !person) {
    response.status = 400;
    response.body = {
      "success": false,
      "msg": "No data",
    };
  } else {
    const updatedPerson: {
      name?: string;
      age?: number;
      hairColor?: string;
      id?: string;
    } = body.value;

    updatedPerson.id = params.id;

    people = people.map((person: Person) =>
      person = person.id === params.id ? updatedPerson : person
    );

    response.status = 201;
    response.body = {
      "success": true,
      "data": updatedPerson,
    };
  }
};

export const deletePerson = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const person: Person | undefined = people.find((person: Person) =>
    person.id === params.id
  );

  if (!person) {
    response.status = 400;
    response.body = {
      "success": false,
      "msg": "No data",
    };
  } else {
    people = people.filter((person: Person) => person.id !== params.id);

    response.status = 200;
    response.body = {
      "success": true,
      "data": people,
    };
  }
};
