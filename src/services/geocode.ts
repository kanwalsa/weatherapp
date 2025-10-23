export async function getCities(city: string) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5`,
  );
  const data = await res.json();
  if (!data.results?.length) throw new Error("City not found");

  // Map to objects with label and value
  const names = data.results.map((cityInfo: any) => ({
    label: `${cityInfo.name}, ${cityInfo.country}`,
    value: {
      lat: cityInfo.latitude,
      lon: cityInfo.longitude,
    },
  }));

  return names;
}
