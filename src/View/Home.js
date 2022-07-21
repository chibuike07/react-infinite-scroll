import React, { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import List from "../Component/List";
import { fetchPosts } from "../Query/util";

const Home = () => {
  const [page, setpage] = useState(1);
  const [limit] = useState(10);
  const [post, setPosts] = useState([]);
  const [MorePosts, setMorePosts] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [range, setrange] = useState("");

  const { isLoading, isFetching } = useQuery(
    ["fetchPosts", { page, limit }],
    fetchPosts,
    {
      retry: 1,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("error", error.response.data);
      },
      onSuccess: ({ data }) => {
        setPosts(() => [...post, ...data]);

        let totalPage = 100 / limit || 1;
        let nextPage = totalPage > page ? page + 1 : page;
        setNextPage(() => nextPage);

        const pageRange = `${
          Number(page) === 1 ? 1 : Math.floor(limit * Number(page) - limit + 1)
        } - ${limit * Number(page)}`;

        setMorePosts(() => false);
        setrange(() => pageRange);
      },
    }
  );

  useLayoutEffect(() => {
    const handleScroll = () => {
      let scrollTop = document.children[0].scrollTop;
      let scrollHeight = document.children[0].scrollHeight;
      let clientHeight = document.children[0].clientHeight;

      let setPaginateFlag =
        scrollHeight - Math.ceil(scrollTop) === clientHeight;
      if (setPaginateFlag) {
        setMorePosts(() => setPaginateFlag);
        MorePosts && nextPage && setpage(() => nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, [nextPage, MorePosts]);

  return (
    <div className="container">
      {post.length > 0 &&
        post.map(({ id, title, body }, idx) => (
          <List title={title} userId={id} body={body} key={idx} />
        ))}

      {isFetching || isLoading ? (
        <div className="container">loading...</div>
      ) : null}
    </div>
  );
};

export default Home;
