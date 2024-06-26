import React, { useEffect, useState } from "react";

import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import NoResults from "../../assets/no-results.png";

import Post from "./Post";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  const { category } = useParams();

  const currentUser = useCurrentUser();

  if (category) {
    filter = `category=${category}&`;
  }

  // UseEffect to fetch posts data when filter, query, or pathname changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    // Set hasLoaded to false and use a timer of 1 second 
    // to wait for user to stop typing before making the API call
    // This prevent flashing pages
    setHasLoaded(false);
    const searchTimer = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-1 p-0 p-lg-2" lg={8}>
        {/* Popular profiles for mobile */}
        <PopularProfiles mobile />
        {/* Search bar with search icon */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
            Search posts
          <Form.Control
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-labelledby="searchPostsLabel"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              // Render InfiniteScroll
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Popular profiles for desktop */}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
