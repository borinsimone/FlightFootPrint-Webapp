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
// const goClimateFetch = async () => {
//   const params = {
//     segments: [...climateSegment],
//     cabin_class: `economy`,
//     passengers: `${totalPassengers}`,
//   };

//   try {
//     const response = await axios.get(
//       "https://api.goclimate.com/v1/flight_footprint",
//       {
//         params,
//         auth: {
//           username: ${process.env.REACT_APP_GOCLIMATE_KEY},
//           password: "",
//         },
//       }
//     );
//     console.log(response);
//     setEmissionData(response.data);
//   } catch (error) {
//     console.error(error);
//     setError(true);
//   } finally {
//     setIsLoading(false);
//   }
// };
