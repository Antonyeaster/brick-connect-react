import { rest } from "msw";

const baseURL = "https://brick-connect-api-e6b45c41a17a.herokuapp.com/";

export const handlers = [
  // Mocking a GET request to fetch user data
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 13,
        username: "Antony_E",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 13,
        profile_image:
          "https://res.cloudinary.com/dqphba816/image/upload/v1/media/images/lego-default-profile_elflya",
      })
    );
  }),
  // Mocking a POST request to logout the user
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
