import React, { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IMovie } from "../../../store/types/types";
import { AppDispatch, RootState } from "../../../store/store";
import { getMovie } from "../../../store/posts/movieAction";
import MoviesItem from "./MoviesItem";
import style from "../style/post.module.scss";

import { useNavigate } from "react-router-dom";

const MoviesList: FC = () => {
    const [postsArr, setPostsArr] = useState<IMovie[]>([]);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const navigate = useNavigate();
    const { movies, loading, error } = useSelector(
        (state: RootState) => state.posts
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);

    useEffect(() => {
        setPostsArr(movies);
    }, [movies]);

    const handleMouseEnter = (postId: number) => {
        setHoveredPost(postId);
    };

    const handleMouseLeave = () => {
        setHoveredPost(null);
    };

    return (
        <>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <div className={style.postlist}>
                    <h1>movies</h1>
                    <div className={style.postlist_center}>
                        {postsArr.map((post) => (
                            <div
                                key={post.id}
                                className={style.postItem}
                                onClick={() => {
                                    navigate(`/movie/${post.id}`);
                                }}
                                onMouseEnter={() => handleMouseEnter(post.id)}
                                onMouseLeave={handleMouseLeave}>
                                <MoviesItem post={post} />
                                {hoveredPost === post.id && (
                                    <div className={style.imageWrapper}>
                                        <div className={style.hoverText}>
                                            <h2>{post.grade}</h2>
                                            <p>
                                                {post.title.length > 16
                                                    ? `${post.title.slice(
                                                          0,
                                                          16
                                                      )}...`
                                                    : post.title}
                                            </p>
                                            <p>{post.time} min</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default MoviesList;
