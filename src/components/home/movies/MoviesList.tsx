import React, { useEffect, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie } from "../../../store/posts/postAction";
import MoviesItem from "./MoviesItem";
import PostList from "../posts/PostList";
import { IMovie } from "../../../store/types/types";
import MyPagination from "../../pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const MoviesList: FC = () => {
    const dispatch = useAppDispatch();
    const { movies, total_pages } = useAppSelector((state) => state.posts);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );

    useEffect(() => {
        dispatch(getMovie({ currentPage }));
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            setSearchParams({ page: page.toString() });
        }
    };

    return (
        <>
            <PostList<IMovie>
                items={movies.entities ? Object.values(movies.entities) : []} // Convert entities to an array
                renderItem={(post, onHover) => (
                    <MoviesItem post={post} onHover={onHover} key={post.id} />
                )}
                toNav={"movie"}
                total={0}
            />

            <MyPagination total={total_pages} onChange={handlePageChange} />
        </>
    );
};

export default MoviesList;
