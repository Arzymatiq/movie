import React, { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/postAction";
import SeriesItem from "./SeriesItem";
import style from "../style/post.module.scss";
import { useNavigate } from "react-router-dom";
import { Pagination, Skeleton } from "@mui/material";

const SeriesList: FC = () => {
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");

    const { series, loading, error, currentPage_series, totalPages_series } =
        useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSeries({ search, currentPage_series }));
    }, [dispatch, search, currentPage_series]);

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
                    {series.map((post) => (
                        <div
                            key={post.id}
                            className={style.postItem}
                            onClick={() => navigate(`/series/${post.id}`)}
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
            )}
            <Pagination
                count={totalPages_series}
                page={currentPage_series}
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
    );
};

export default SeriesList;
