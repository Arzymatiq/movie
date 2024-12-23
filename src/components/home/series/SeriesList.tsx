import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/postAction";
import PostList from "../posts/PostList";
import SeriesItem from "./SeriesItem";
import { ISeries } from "../../../store/types/types";

const SeriesList: FC = () => {
    const dispatch = useAppDispatch();
    const { series, currentPage, search, itemsPerPage } = useAppSelector(
        (state) => state.posts
    );

    useEffect(() => {
        dispatch(getSeries({ search, currentPage, itemsPerPage }));
    }, [dispatch, search, currentPage, itemsPerPage]);

    return (
        <PostList<ISeries>
            item={series}
            renderItem={(post) => <SeriesItem post={post} key={post.id} />}
        />
    );
};

export default SeriesList;
