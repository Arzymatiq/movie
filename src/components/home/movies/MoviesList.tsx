import React, { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie } from "../../../store/posts/postAction";
import MoviesItem from "./MoviesItem";
import style from "../style/post.module.scss";
import { useNavigate } from "react-router-dom";
import { Pagination, Skeleton } from "@mui/material";

const MoviesList: FC = () => {
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");

    const { movies, loading, error, currentPage, totalPages } = useAppSelector(
        (state) => state.posts
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getMovie({ search, currentPage }));
    }, [dispatch, search, currentPage]);

    const handleMouseEnter = (postId: number) => setHoveredPost(postId);
    const handleMouseLeave = () => setHoveredPost(null);

    const renderSkeletons = () =>
        Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
                key={index}
                sx={{ bgcolor: "grey.900", marginBottom: "1rem" }}
                variant="rectangular"
                height={300}
                className={style.skeletonWrapper}
            />
        ));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch({ type: "products/changePage", payload: { page } });
    };

    return (
        <div className={style.postlist}>
            <h1>Movies</h1>
            <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={handleSearchChange}
            />
            {loading ? (
                <div className={style.postlist_center}>{renderSkeletons()}</div>
            ) : error ? (
                <div className={style.error}>An error occurred: {error}</div>
            ) : (
                <div className={style.postlist_center}>
                    {movies.map((post) => (
                        <div
                            key={post.id}
                            className={style.postItem}
                            onClick={() => navigate(`/movie/${post.id}`)}
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
            )}
            <div style={{ marginTop: "45px", marginBottom: "25px" }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            borderColor: "white",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "white",
                            color: "black",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default MoviesList;
