import React, { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie } from "../../../store/posts/movieAction";
import MoviesItem from "./MoviesItem";
import style from "../style/post.module.scss";
import { useNavigate } from "react-router-dom";

const MoviesList: FC = () => {
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);

    const { movies, loading, error } = useAppSelector((state) => state.posts);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);

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
                <>
                    {error ? (
                        <>error</>
                    ) : (
                        <>
                            <div className={style.postlist}>
                                <h1>movies</h1>

                                <div className={style.postlist_center}>
                                    {movies.map((post) => (
                                        <div
                                            key={post.id}
                                            className={style.postItem}
                                            onClick={() => {
                                                navigate(`/movie/${post.id}`);
                                            }}
                                            onMouseEnter={() =>
                                                handleMouseEnter(post.id)
                                            }
                                            onMouseLeave={handleMouseLeave}>
                                            <MoviesItem post={post} />
                                            {hoveredPost === post.id && (
                                                <div
                                                    className={
                                                        style.imageWrapper
                                                    }>
                                                    <div
                                                        className={
                                                            style.hoverText
                                                        }>
                                                        <h2>{post.grade}</h2>
                                                        <p>
                                                            {post.title.length >
                                                            16
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
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default MoviesList;
