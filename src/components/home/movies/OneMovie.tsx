import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    AppDispatch,
    RootState,
    useAppDispatch,
    useAppSelector,
} from "../../../store/store";
import { IMovie } from "../../../store/types/types";
import { getMovie } from "../../../store/posts/movieAction";
import style from "../style/moveItem.module.scss";

const OneMovie: FC = () => {
    const { id } = useParams<string>();
    const dispatch = useAppDispatch();

    const { movies, loading } = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);

    const filteredPost: IMovie | undefined = movies.find(
        (item) => item.id === Number(id)
    );

    return (
        <>
            {loading ? (
                <>loading..</>
            ) : (
                <>
                    {!filteredPost ? (
                        <>This Movie doesn't exist :(</>
                    ) : (
                        <>
                            <div className={style.movieItem}>
                                <div className={style.movieItem_center}>
                                    <ul className={style.main_info_list}>
                                        <li className={style.main_info_item}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={
                                                        filteredPost.image_desc ||
                                                        "/default-image.jpg"
                                                    }
                                                    alt={
                                                        filteredPost.title ||
                                                        "No image available"
                                                    }
                                                    className={style.movieImage}
                                                />
                                            </div>
                                        </li>
                                        <li className={style.main_info_item}>
                                            <p>{filteredPost.Age_limit}+</p>
                                            <h2>{filteredPost.title}</h2>
                                            <p>{filteredPost.description}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default OneMovie;
