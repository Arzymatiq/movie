import { Pagination, Skeleton, TextField } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
    changePage,
    setItemsPerPage,
    setSearch,
} from "../../../store/posts/postSlice";
import style from "../style/post.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

interface BasePost {
    id: number;
    title: string;
    grade: number;
    time?: number;
}

interface ListProps<T extends BasePost> {
    item: T[];
    renderItem: (item: T) => ReactNode;
    toNav?: string;
}
export default function PostList<T extends BasePost>(props: ListProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);

    const { loading, error, currentPage, totalPages, search, itemsPerPage } =
        useAppSelector((state) => state.posts);

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(changePage({ page }));
    };
    const handleMouseEnter = (postId: number) => setHoveredPost(postId);
    const handleMouseLeave = () => setHoveredPost(null);

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newItemsPerPage = Number(e.target.value) || 12;
        dispatch(setItemsPerPage(newItemsPerPage));
        dispatch(changePage({ page: 1 }));
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
        dispatch(changePage({ page: 1 }));
    };

    useEffect(() => {
        setSearchParams({
            page: currentPage.toString(),
            search,
            itemsPerPage: itemsPerPage.toString(),
        });
    }, [currentPage, search, itemsPerPage, setSearchParams]);

    useEffect(() => {
        const urlPage = Number(searchParams.get("page")) || 1;
        const urlSearch = searchParams.get("search") || "";
        const urlItemsPerPage = Number(searchParams.get("itemsPerPage")) || 12;

        dispatch(changePage({ page: urlPage }));
        dispatch(setSearch(urlSearch));
        dispatch(setItemsPerPage(urlItemsPerPage));
    }, [dispatch, searchParams]);

    const renderSkeletons = () =>
        Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton
                key={index}
                variant="rectangular"
                height={240}
                className={style.skeletonWrapper}
            />
        ));

    return (
        <div>
            <div className={style.postlist}>
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
                    <div className={style.postlist_center}>
                        {renderSkeletons()}
                    </div>
                ) : error ? (
                    <div className={style.error}>
                        An error occurred: {error}
                    </div>
                ) : (
                    <div className={style.postlist_center}>
                        {props.item.map((post) => (
                            <div
                                key={post.id}
                                className={style.postItem}
                                onClick={() =>
                                    navigate(`/${props.toNav}/${post.id}`)
                                }
                                onMouseEnter={() => handleMouseEnter(post.id)}
                                onMouseLeave={handleMouseLeave}>
                                {props.renderItem(post)}
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
                                            <p>{post?.time} min</p>
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
        </div>
    );
}
