import {
  verifyAccount,
  convertFromKelvinToCelcius,
  getForecastForCity
} from "./Util";

import faker from "faker";

describe("verifyAccount()", () => {
  it("returns true for user: test@test.com and password: password", () => {
    const [user, password] = ["test@test.com", "password"];
    expect(verifyAccount(user, password)).toBe(true);
  });

  it("returns false for anything other than test@test.com and password", () => {
    expect(
      verifyAccount(faker.internet.email(), faker.internet.password())
    ).toBe(false);
  });
});

describe("convertFromKelvinToCelcius", () => {
  it("for 273.15 Kelvin it returns 0 celsius", () => {
    const result = convertFromKelvinToCelcius(273.15);
    expect(result).toBe("0.0");
  });

  it("throws an error for any type parameter other than Number", () => {
    expect.assertions(1);
    try {
      convertFromKelvinToCelcius("dummy");
    } catch (e) {
      expect(e.message).toBe("Value is not a number");
    }
  });
});

describe("getForecastForCity()", () => {
  it("returns a successful response given City name, api url and api key", async done => {
    const mock_data = {
      coord: {
        lon: -6.26,
        lat: 53.35
      }
    };

    global.fetch = jest.fn(
      () =>
        new Promise(resolve => {
          resolve({
            status: 201,
            ok: true,
            json: () => {
              return Promise.resolve(mock_data);
            }
          });
        })
    );

    const response = await getForecastForCity(
      "Dublin",
      "http://dummy",
      "dummykey"
    );
    expect(response).toBe(mock_data);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      `http://dummy/data/2.5/weather?q=Dublin&appid=dummykey`
    );
    done();
  });

  it('returns "Network request failed" if network request fails', () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject({ error: "Network request failed" });
        })
    );
    expect.assertions(1);
    return getForecastForCity(faker.address.city(), faker.internet.url(), faker.lorem.word())
        .catch(e => expect(e).toEqual({error: "Network request failed"}))
  });
});
