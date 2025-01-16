import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getOneSeries } from "../../../store/posts/postAction";
import styled from "../style/OneSeries.module.scss";
import style from "../style/OnePost.module.scss";
import { clearPost } from "../../../store/posts/postSlice";
import { Rating, Skeleton } from "@mui/material";

const OneSeries: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { oneSeries, loading, error } = useAppSelector(
        (state) => state.posts
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            dispatch(getOneSeries(id));
            return () => {
                dispatch(clearPost());
            };
        }
    }, [dispatch, id]);

    const checkSeasonNumber = (season: any) => {
        if (season?.name.toLowerCase().split(" ").includes("season")) {
            return <h4>{season.name}</h4>;
        } else {
            return (
                <>
                    <h4>season {season.season_number}</h4>
                    <h4>{season.name}</h4>
                </>
            );
        }
    };

    return (
        <>
            {loading ? (
                <div className={style.movieDetail}>
                    <div className={style.info}>
                        <Skeleton
                            className={style.backdrop}
                            variant="rectangular"
                        />

                        <div className={style.main_info}>
                            <div className={style.main_info_center}>
                                <Skeleton
                                    className={style.poster_skeleton}
                                    variant="rectangular"
                                />

                                <div className={style.textbox}>
                                    <Skeleton
                                        className={style.skeleton}
                                        animation="wave"
                                        width={400}
                                    />
                                    <Skeleton
                                        className={style.skeleton}
                                        animation="wave"
                                        width={400}
                                    />
                                    <br />
                                    <Skeleton animation="wave" width={400} />
                                    <br />
                                    <p>
                                        <Skeleton
                                            className={style.skeleton}
                                            animation="wave"
                                            width={400}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : !oneSeries ? (
                <div>No series found</div>
            ) : (
                <>
                    <div className={style.movieDetail}>
                        <div className={style.info}>
                            <img
                                className={style.backdrop}
                                src={`https://image.tmdb.org/t/p/w500/${oneSeries.backdrop_path}`}
                                alt={oneSeries.name}
                            />
                            <div className={style.main_info}>
                                <div className={style.main_info_center}>
                                    <img
                                        className={style.poster}
                                        src={`https://image.tmdb.org/t/p/original/${oneSeries.poster_path}`}
                                        alt=""
                                    />
                                    <div className={style.textbox}>
                                        <h2>
                                            {`${oneSeries.name}
                                            (${oneSeries?.first_air_date})`}
                                        </h2>
                                        <p>{oneSeries.original_name}</p>
                                        <br />
                                        <p>{oneSeries.overview}</p>
                                        <br />
                                        <p>
                                            Grade count: {oneSeries.vote_count}
                                        </p>

                                        <p>Rating: {oneSeries.vote_average}</p>

                                        <Rating
                                            name="half-rating-read"
                                            value={oneSeries.vote_average / 2}
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
                                        <br />
                                        <p>
                                            {`create by ${oneSeries.created_by
                                                .map((item) => {
                                                    return `${item?.name} (${item?.original_name})`;
                                                })
                                                .join(", ")}`}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styled.network}>
                        <h2>Networks</h2>
                        <div className={styled.networks}>
                            {oneSeries?.networks?.map((network) => {
                                return (
                                    <div
                                        className={styled.networks}
                                        key={network.id}>
                                        <img
                                            className={styled.networks_logo}
                                            src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                                            alt={network.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styled.seasons}>
                        <h2>Seasons</h2>
                        <div className={styled.seasons_list}>
                            <div className={styled.seasons_list_center}>
                                {oneSeries?.seasons?.map((season) => {
                                    return (
                                        <div
                                            className={styled.seasons_item}
                                            key={season.id}
                                            onClick={() =>
                                                navigate(
                                                    `${season.season_number}`
                                                )
                                            }>
                                            <img
                                                className={
                                                    styled.seasons_poster
                                                }
                                                src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                                                alt={season.name}
                                            />
                                            <div
                                                className={styled.seasons_info}>
                                                {checkSeasonNumber(season)}
                                                <p>
                                                    {season.overview.length >
                                                    30 ? (
                                                        <>
                                                            {season?.overview.slice(
                                                                0,
                                                                30
                                                            )}
                                                            ...
                                                        </>
                                                    ) : (
                                                        season.overview
                                                    )}
                                                </p>
                                                <p>
                                                    Air date: {season.air_date}
                                                </p>
                                                <p>
                                                    Episode count:{" "}
                                                    {season.episode_count}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OneSeries;
