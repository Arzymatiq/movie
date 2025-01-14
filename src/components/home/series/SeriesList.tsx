import React, { useEffect, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/postAction";
import SeriesItem from "./SeriesItem";
import PostList from "../posts/PostList";
import { ISeries } from "../../../store/types/types";
import MyPagination from "../../pagination/Pagination";
import { useNavigate } from "react-router-dom";

const SeriseList: FC = () => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { series, total_pages } = useAppSelector((state) => state.posts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            getSeries({
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
            <PostList<ISeries>
                items={series}
                renderItem={(post, onHover) => (
                    <SeriesItem post={post} onHover={onHover} key={post.id} />
                )}
                toNav="series"
                total={total_pages}
            />
            <MyPagination total={total_pages} onChange={handlePageChange} />
        </>
    );
};

export default SeriseList;
