import React, { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ISeries } from "../../../store/types/types";
import { AppDispatch, RootState } from "../../../store/store";
import { getSeries } from "../../../store/posts/movieAction";
import SeriesItem from "./SeriesItem";
import style from "../style/post.module.scss";
import { useNavigate } from "react-router-dom";

const SeriesList: FC = () => {
    const [postsArr, setPostsArr] = useState<ISeries[]>([]);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const navigate = useNavigate();
    const { series, loading } = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getSeries());
    }, [dispatch]);

    useEffect(() => {
        setPostsArr(series);
    }, [series]);

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
                    <h1>series</h1>
                    <div className={style.postlist_center}>
                        {postsArr.map((post) => (
                            <div
                                key={post.id}
                                className={style.postItem}
                                onClick={() => {
                                    navigate(`/series/${post.id}`);
                                }}
                                onMouseEnter={() => handleMouseEnter(post.id)}
                                onMouseLeave={handleMouseLeave}>
                                <SeriesItem post={post} />
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

export default SeriesList;
