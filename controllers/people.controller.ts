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

export const getPeople = async ({ response }: { response: any }) => {
  try {
    // connect to db
    await client.connect();

    // query db for all people
    const result = await client.query("SELECT * FROM people");

    // Format returned data
    const people: Person[] = [];

    result.rows.map((rowData: any[]) => {
      const person: Person = {
        id: rowData[0],
        name: rowData[1],
        age: rowData[2],
        hairColor: rowData[3],
      };

      people.push(person);
    });

    response.status = 200;
    response.body = {
      "success": true,
      "data": people,
    };
  } catch (err) {
    // set error response
    response.status = 500;
    response.body = {
      "success": false,
      "msg": err.toString(),
    };
  } finally {
    // end db connection
    await client.end();
  }
};

export const addPerson = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const person = body.value;

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      "success": false,
      "msg": "No data",
    };
  } else {
    try {
      // connect to db
      await client.connect();

      // add new person to db
      const result = await client.query(
        "INSERT INTO people(name,age,haircolor) VALUES($1,$2,$3)",
        person.name,
        person.age,
        person.hairColor,
      );

      // set response
      response.status = 201;
      response.body = {
        "success": true,
        "data": person,
      };
    } catch (err) {
      // set error response
      response.status = 400;
      response.body = {
        "success": false,
        "msg": err.toString(),
      };
    } finally {
      // end db connection
      await client.end();
    }
  }
};

export const getPerson = async (
  { params, response }: { response: any; params: { id: string } },
) => {
  try {
    // connect to db
    await client.connect();

    // query db for person
    const result = await client.query(
      "SELECT * FROM people WHERE id=($1)",
      params.id,
    );

    // Handle person not found
    if (result.rows.toString() === "") {
      response.status = 404;
      response.body = {
        "success": false,
        "msg": "No person found",
      };
    } else {
      // Format returned data
      const person: Person = {};

      result.rows.forEach((rowData: any[]) => {
        person.id = rowData[0];
        person.name = rowData[1];
        person.age = rowData[2];
        person.hairColor = rowData[3];
      });

      response.status = 201;
      response.body = {
        "success": true,
        "data": person,
      };
    }
  } catch (err) {
    // set error response
    response.status = 404;
    response.body = {
      "success": false,
      "msg": err.toString(),
    };
  } finally {
    // end db connection
    await client.end();
  }
};

export const updatePerson = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let person: Person;

  // check if the person exists
  // this will modify and return the response it recieves
  await getPerson({ params: { "id": params.id }, response });

  // if the person was not found
  if (response.status === 404) {
    response.body = {
      "success": false,
      "msg": response.body.msg,
    };
  } else {
    const body = await request.body();

    // if new data not sent
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        "success": false,
        "msg": "No data",
      };
    } else {
      try {
        // connect to db
        await client.connect();

        // get new data
        const person: Person = body.value;

        // update person in db with new data
        const result = await client.query(
          "UPDATE people SET name=$1, age=$2, haircolor=$3 WHERE id=$4",
          person.name,
          person.age,
          person.hairColor,
          params.id,
        );

        // set response
        response.status = 200;
        response.body = {
          "success": true,
          "data": person,
        };
      } catch (err) {
        // set error response
        response.status = 400;
        response.body = {
          "success": false,
          "msg": err.toString(),
        };
      } finally {
        // end db connection
        await client.end();
      }
    }
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
