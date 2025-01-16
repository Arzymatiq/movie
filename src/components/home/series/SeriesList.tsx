import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/postAction"; // Предположительно, action для сериалов
import SeriesItem from "./SeriesItem";
import PostList from "../posts/PostList";
import { ISeries } from "../../../store/types/types"; // Интерфейс для сериалов
import MyPagination from "../../pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const SeriesList: FC = () => {
    const dispatch = useAppDispatch();
    const { series, total_pages } = useAppSelector((state) => state.posts);
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    useEffect(() => {
        dispatch(
            getSeries({
                currentPage,
            })
        );
    }, [dispatch, currentPage]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            setSearchParams({ page: page.toString() });
        }
    };

    return (
        <>
            <PostList<ISeries>
                items={series.entities ? Object.values(series.entities) : []} // Convert entities to an array
                renderItem={(post, onHover) => (
                    <SeriesItem post={post} onHover={onHover} key={post.id} />
                )}
                toNav={"series"}
                total={0}
            />

            <MyPagination total={total_pages} onChange={handlePageChange} />
        </>
    );
};

export default SeriesList;
