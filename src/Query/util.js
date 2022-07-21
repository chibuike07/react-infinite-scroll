import axios from "axios";

export const fetchPosts = ({ queryKey: [, { page, limit }] }) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
};
