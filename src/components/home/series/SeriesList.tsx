import React, { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/postAction";
import SeriesItem from "./SeriesItem";
import style from "../style/post.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, Skeleton, TextField } from "@mui/material";
import {
    changePage,
    setItemsPerPage,
    setSearch,
} from "../../../store/posts/postSlice";

const SeriesList: FC = () => {
    const dispatch = useAppDispatch();
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);

    const {
        series,
        loading,
        error,
        currentPage_series,
        totalPages_series,
        search,
        itemsPerPage,
    } = useAppSelector((state) => state.posts);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Инициализация из URL
    useEffect(() => {
        const urlPage = searchParams.get("page") || "1";
        const urlSearch = searchParams.get("search") || "";
        const urlItemsPerPage = searchParams.get("itemsPerPage") || "12";

        dispatch(changePage({ page: Number(urlPage) }));
        dispatch(setSearch(urlSearch));
        dispatch(setItemsPerPage(Number(urlItemsPerPage)));
    }, [dispatch, searchParams]);

    // 2. Загрузка данных
    useEffect(() => {
        dispatch(getSeries({ search, currentPage_series, itemsPerPage }));
    }, [dispatch, search, currentPage_series, itemsPerPage]);

    // 3. Обновление URL
    useEffect(() => {
        setSearchParams({
            page: currentPage_series.toString(),
            search: search,
            itemsPerPage: itemsPerPage.toString(),
        });
    }, [currentPage_series, search, itemsPerPage, setSearchParams]);

    const handleMouseEnter = (postId: number) => setHoveredPost(postId);
    const handleMouseLeave = () => setHoveredPost(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
        dispatch(changePage({ page: 1 })); // Сброс на первую страницу
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(changePage({ page }));
    };

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newItemsPerPage = Number(e.target.value) || 12;
        dispatch(setItemsPerPage(newItemsPerPage));
        dispatch(changePage({ page: 1 })); // Сброс на первую страницу
    };
    const renderSkeletons = () =>
        Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton
                key={index}
                sx={{ bgcolor: "grey.900", marginBottom: "1rem" }}
                variant="rectangular"
                height={240}
                className={style.skeletonWrapper}
            />
        ));

    return (
        <div className={style.postlist}>
            <h1>Movies</h1>
            <div className={style.filters}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <TextField
                    className={style.totalItems}
                    label="Items per page"
                    type="number"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    inputProps={{ min: 1, max: 100 }}
                    sx={{
                        marginLeft: "1rem",
                        color: "white",
                        "& .MuiInputBase-input": {
                            color: "white",
                            height: "1rem",
                            padding: "4px 8px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "white",
                            fontSize: "0.8rem",
                        },
                        "& .MuiOutlinedInput-root": {
                            height: "2.2rem",
                            "& fieldset": {
                                borderColor: "white",
                            },
                            "&:hover fieldset": {
                                borderColor: "white",
                            },
                        },
                    }}
                />
            </div>
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
