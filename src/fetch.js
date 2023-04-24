import axios from "axios";

export const fetch = (legs) => {
  console.log(legs[0]);
  try {
    const response = axios.post(
      "https://beta3.api.climatiq.io/travel/flights",
      {
        legs,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_CLIMATIQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    let response = error;
    return response;
  }
};
