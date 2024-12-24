import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getMovie } from "../../../store/posts/postAction";
import MoviesItem from "./MoviesItem";
import PostList from "../posts/PostList";
import { IMovie } from "../../../store/types/types";

const MoviesList: FC = () => {
    const dispatch = useAppDispatch();
    const { movies, currentPage, search, itemsPerPage } = useAppSelector(
        (state) => state.posts
    );

    useEffect(() => {
        dispatch(getMovie({ search, currentPage, itemsPerPage }));
    }, [dispatch, search, currentPage, itemsPerPage]);

    return (
        <PostList<IMovie>
            item={movies}
            renderItem={(post) => <MoviesItem post={post} key={post.id} />}
            toNav="movie"
        />
    );
};

export default MoviesList;
