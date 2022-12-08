const HOST = "https://snake-db.onrender.com";
const LOCAL_HPST = "http://localhost:3001";

const request = async (url, method = "GET", body = null) => {
  const data = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return data.json();
};

export const gettingPlayers = async () => {
  return await request(`${HOST}/player`);
};

export const createPlayer = async (body) => {
  return await request(`${HOST}/player`, "POST", body);
};
