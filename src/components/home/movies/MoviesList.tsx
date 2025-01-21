import React, { useEffect, FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie, getSeries } from "../../../store/posts/postAction";
import MoviesItem from "./MoviesItem";
import PostList from "../posts/PostList";
import MyPagination from "../../pagination/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { IMovie, ISeries } from "../../../store/types/types";
import SeriesItem from "../series/SeriesItem";

const MoviesList: FC = () => {
    const dispatch = useAppDispatch();
    const { series, movies, total_pages, loading, error } = useAppSelector(
        (state) => state.posts
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );
    const { state } = useParams<{ state: string }>();

    useEffect(() => {
        if (state === "series") {
            dispatch(getSeries({ currentPage }));
        } else {
            dispatch(getMovie({ currentPage }));
        }
    }, [dispatch, currentPage, state]);

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            setSearchParams({ page: page.toString() });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            {state === "series" ? (
                <>
                    <PostList<ISeries>
                        items={
                            series.entities
                                ? Object.values(series.entities)
                                : []
                        } // Convert entities to an array
                        renderItem={(post, onHover) => (
                            <SeriesItem
                                post={post}
                                onHover={onHover}
                                key={post.id}
                            />
                        )}
                        toNav={"series"}
                        total={0}
                    />
                </>
            ) : (
                <PostList<IMovie>
                    items={
                        movies.entities ? Object.values(movies.entities) : []
                    }
                    renderItem={(post, onHover) => (
                        <MoviesItem
                            post={post}
                            onHover={onHover}
                            key={post.id}
                        />
                    )}
                    toNav={"movie"}
                    total={0}
                />
            )}
            {/* <PostList
                items={items}
                renderItem={(item, onHover) =>
                    state === "series" ? (
                        <SeriesItem
                            post={item as ISeries}
                            onHover={onHover}
                            key={(item as ISeries).id}
                        />
                    ) : (
                        <MoviesItem
                            post={item as IMovie}
                            onHover={onHover}
                            key={(item as IMovie).id}
                        />
                    )
                }
                toNav={state === "series" ? "series" : "movie"}
                total={items.length}
            /> */}
            <MyPagination total={total_pages} onChange={handlePageChange} />
        </>
    );
};

export default MoviesList;
