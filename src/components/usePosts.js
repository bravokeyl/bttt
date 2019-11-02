import React, {useState, useEffect} from 'react';

const usePosts = (page, perPage) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log('usePosts useEffect');
    setLoading(true);
    const furl = `https://thetheatretimes.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`;
    fetch(furl)
      .then(res => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      });
  }, [page, perPage]);

  return {
    posts,
    loading,
  };
};

export default usePosts;
