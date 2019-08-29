export function verifyAccount(email, password) {
  return email === "test@test.com" && password === "password" ? true : false;
}

export async function getForecastForCity(city, apiurl, apikey) {
  const response = await fetch(
    `${apiurl}/data/2.5/weather?q=${city}&appid=${apikey}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

export function convertFromKelvinToCelcius(value) {
  if (typeof value === "number") {
    return (parseFloat(value) - 273.15).toFixed(1);
  }
  throw new Error("Value is not a number");
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const APIURL = "https://api.openweathermap.org";
export const APIKEY = process.env.REACT_APP_APIKEY;
export const UNSPLASHAPIKEY = process.env.REACT_APP_UNSPLASHAPIKEY;

export const UNSPLASHAPI = `https://api.unsplash.com/photos/?client_id=${UNSPLASHAPIKEY}`;
