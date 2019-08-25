import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { postList } = useSelector(state => state.post);
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []);
  return (
    <>
      하이용
      {postList.map(v => {
        return <div>{v.name}</div>;
      })}
    </>
  );
};

export default Home;
