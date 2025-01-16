import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getActors, getOneMovie } from "../../../store/posts/postAction";
import { IActors } from "../../../store/types/types";
import { clearPost } from "../../../store/posts/postSlice";
import { Card, Box, Typography, Rating } from "@mui/material";
import style from "../style/OnePost.module.scss";
import styled from "../style/OneMovie.module.scss";

const OneMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { oneMovie, loading, error, actorsCast } = useAppSelector(
        (state) => state.posts
    );

    useEffect(() => {
        if (id) {
            dispatch(getOneMovie(id));
            dispatch(getActors(id));
        }
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id]);

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} h ${mins} m`;
    };

    const renderImage = (path: string | null, alt: string) => {
        return path ? (
            <img
                className={style.backdrop}
                src={`https://image.tmdb.org/t/p/w500/${path}`}
                alt={alt}
            />
        ) : null;
    };

    const actorsData = actorsCast?.ids.map(
        (actorId: number) => actorsCast.entities[actorId]
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!oneMovie) return <div>No movie found</div>;

    return (
        <>
            <div className={style.movieDetail}>
                <div className={style.info}>
                    {renderImage(
                        oneMovie.belongs_to_collection?.backdrop_path ||
                            oneMovie.backdrop_path,
                        oneMovie.belongs_to_collection?.name || oneMovie.title
                    )}
                    <div className={style.main_info}>
                        <div className={style.main_info_center}>
                            {renderImage(
                                oneMovie.belongs_to_collection?.poster_path ||
                                    oneMovie.poster_path,
                                oneMovie.belongs_to_collection?.name ||
                                    oneMovie.title
                            )}
                            <div className={style.textbox}>
                                <h2>{oneMovie.title}</h2>
                                {oneMovie.title !== oneMovie.original_title && (
                                    <p>{oneMovie.original_title}</p>
                                )}
                                <p>{oneMovie.overview}</p>
                                <p>Grade count: {oneMovie.vote_count}</p>
                                <p>Rating: {oneMovie.vote_average}</p>
                                <Rating
                                    name="half-rating-read"
                                    value={oneMovie.vote_average / 2}
                                    precision={0.2}
                                    max={5}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-icon": {
                                            color: "orange",
                                        },
                                    }}
                                />
                                <p>
                                    {oneMovie?.runtime && oneMovie?.runtime > 60
                                        ? formatRuntime(oneMovie.runtime)
                                        : `${oneMovie.runtime} m`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Box
                width={"100%"}
                sx={{
                    display: "flex",
                    gap: 1,
                    py: 1,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    "& > *": {
                        scrollSnapAlign: "center",
                    },
                    "::-webkit-scrollbar": { display: "none" },
                }}>
                {actorsData?.map((item: IActors) => (
                    <Card
                        key={item.id}
                        variant="outlined"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minWidth: 200,
                            height: 400,
                            padding: 0,
                            margin: 2,
                        }}>
                        <Box>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                alt={item.name}
                                style={{
                                    width: "200px",
                                    height: "auto",
                                }}
                            />
                        </Box>
                        <Box sx={{ mx: 1 }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2">
                                {item.character}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>

            {oneMovie?.production_companies &&
                oneMovie?.production_companies?.length > 0 && (
                    <div className={styled.prodaction_companies}>
                        <h2>Companies</h2>
                        <div className={styled.prodaction_companies_center}>
                            {oneMovie.production_companies.map((item) => (
                                <div
                                    key={item.id}
                                    className={styled.company_item}>
                                    {item.logo_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                                            alt={item.name}
                                        />
                                    )}
                                    <p>{item.name}</p>
                                    <p>{item.origin_country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </>
    );
};

export default OneMovie;
