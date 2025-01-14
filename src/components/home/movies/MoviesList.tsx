import React, { useEffect, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie } from "../../../store/posts/postAction";
import MoviesItem from "./MoviesItem";
import PostList from "../posts/PostList";

import { IMovie } from "../../../store/types/types";
import MyPagination from "../../pagination/Pagination";
import { useNavigate } from "react-router-dom";

const MoviesList: FC = () => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { movies, total_pages } = useAppSelector((state) => state.posts);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(
            getMovie({
                currentPage: currentPage || 1,
            })
        );
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            navigate(`?page=${page}`);
        }
    };

    return (
        <>
            <PostList<IMovie>
                items={movies}
                renderItem={(post, onHover) => (
                    <MoviesItem post={post} onHover={onHover} key={post.id} />
                )}
                toNav="movie"
                total={total_pages}
            />
            <MyPagination total={total_pages} onChange={handlePageChange} />
        </>
    );
};

export default MoviesList;
