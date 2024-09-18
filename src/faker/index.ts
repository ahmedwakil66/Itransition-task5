import { fakerEN, fakerFR, fakerRU, Faker } from "@faker-js/faker";
import parsePhoneNumber from "libphonenumber-js";
import { generateUserWithErrors } from "./error";

interface Phone {
  international: string;
  national: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string[];
  phone: Phone;
}

function getRandomData(
  seed: number | undefined,
  quantity = 10,
  offset = 0,
  local = "",
  error: number
) {
  const locale = local.toString().toLowerCase();
  const faker = locale === "fr" ? fakerFR : locale === "ru" ? fakerRU : fakerEN;
  const data = [];
  faker.seed(seed);

  for (let i = 0; i < offset; i++) {
    createRandomDatum(faker, error, seed ? seed : 0);
  }
  for (let i = 0; i < quantity; i++) {
    data.push(createRandomDatum(faker, error, seed ? seed : 0));
  }
  return data;
}

function createRandomDatum(faker: Faker, error: number, seed: number): User {
  const id = faker.string.uuid();
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const city = faker.location.city();
  const street = faker.location.street();
  const streetFull = faker.location.streetAddress({ useFullAddress: true });
  const phoneNumber = parsePhoneNumber(
    faker.phone.number({ style: "international" })
  );

  const address = [
    `${city}, ${street}.`,
    `${faker.location.country()}, ${city}, ${streetFull}.`,
  ];

  const phone: Phone = {
    national: phoneNumber?.formatNational() as string,
    international: phoneNumber?.formatInternational() as string,
  };

  const user = {
    id,
    firstName,
    lastName,
    fullName: firstName + " " + lastName,
    address,
    phone,
  };

  if (error > 0) {
    return generateUserWithErrors(user, error, seed);
  }

  return user;
}

// console.log(getRandomData(100, 5, 0, "fr", 0));
export default getRandomData;
