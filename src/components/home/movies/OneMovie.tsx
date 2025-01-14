import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getOneMovie } from "../../../store/posts/postAction";
import { IMovie } from "../../../store/types/types";
import style from "../style/OnePost.module.scss";
import styled from "../style/OneMovie.module.scss";

import { clearPost } from "../../../store/posts/postSlice";
import { Rating } from "@mui/material";

const OneMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { oneMovie, loading, error } = useAppSelector((state) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(getOneMovie(id));
        }
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id]);
    console.log(oneMovie);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : !oneMovie ? (
                <div>No movie found</div>
            ) : (
                <>
                    <div className={style.movieDetail}>
                        <div className={style.info}>
                            {oneMovie?.belongs_to_collection?.backdrop_path ? (
                                <img
                                    className={style.backdrop}
                                    src={`https://image.tmdb.org/t/p/w500/${oneMovie?.belongs_to_collection?.backdrop_path}`}
                                    alt={oneMovie?.belongs_to_collection.name}
                                />
                            ) : (
                                <img
                                    className={style.backdrop}
                                    src={`https://image.tmdb.org/t/p/w500/${oneMovie.backdrop_path}`}
                                    alt={oneMovie?.belongs_to_collection?.name}
                                />
                            )}

                            <div className={style.main_info}>
                                <div className={style.main_info_center}>
                                    {oneMovie.belongs_to_collection
                                        ?.poster_path ? (
                                        <img
                                            className={style.poster}
                                            src={`https://image.tmdb.org/t/p/w500/${oneMovie?.belongs_to_collection.poster_path}`}
                                            alt={
                                                oneMovie.belongs_to_collection
                                                    .name
                                            }
                                        />
                                    ) : (
                                        <img
                                            className={style.poster}
                                            src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                                            alt={
                                                oneMovie?.belongs_to_collection
                                                    ?.name
                                            }
                                        />
                                    )}
                                    <div className={style.textbox}>
                                        {oneMovie?.title
                                            .toLowerCase()
                                            .split(" ")
                                            .some((word) =>
                                                oneMovie?.original_title
                                                    .toLowerCase()
                                                    .includes(word)
                                            ) ? (
                                            <h2>{oneMovie.title}</h2>
                                        ) : (
                                            <>
                                                {" "}
                                                <h2>{oneMovie.title}</h2>
                                                <p>{oneMovie.original_title}</p>
                                            </>
                                        )}

                                        <br />
                                        <p>{oneMovie.overview}</p>
                                        <br />
                                        <p>
                                            Grade count: {oneMovie.vote_count}
                                        </p>

                                        <p>Rating: {oneMovie.vote_average}</p>

                                        <Rating
                                            name="half-rating-read"
                                            value={oneMovie.vote_average / 2}
                                            precision={0.2}
                                            max={5}
                                            sx={{
                                                "& .MuiRating-icon": {
                                                    color: "orange",
                                                    backgroundColor:
                                                        "transparent",
                                                },
                                            }}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 
                    <div className={style.actors}>
                        <h2>actors</h2>
                        <div className={style.actors_center}>
                            {oneMovie?.production_companies?.map(
                                (item: any) => (
                                    <div className={style.company_item}>
                                        <p>{item.name}</p>
                                        <p>{item.origin_country}</p>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
                                            alt=""
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div> */}
                    <div className={styled.prodaction_companies}>
                        <h2>Companies</h2>
                        <div className={styled.prodaction_companies_center}>
                            {oneMovie?.production_companies?.map(
                                (item: any) => (
                                    <div className={styled.company_item}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
                                            alt=""
                                        />
                                        <p> company: {item.name}</p>
                                        <p>
                                            company country:{" "}
                                            {item.origin_country}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OneMovie;
