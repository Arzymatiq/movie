import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getOneSeriesDetails } from "../../../../store/posts/postAction";
import { clearPost } from "../../../../store/posts/postSlice";
import StarItem from "./StarItem";
import style from "../../style/seriesDetails.module.scss";

const SeriesDetails = () => {
    const { id, season_number } = useParams<{
        id: string;
        season_number: string;
    }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { oneSeriesDetails, loading, error } = useAppSelector(
        (state) => state.posts
    );
    const language = localStorage.getItem("language") || "en-US";

    const [openEpisodes, setOpenEpisodes] = useState<Record<number, boolean>>(
        {}
    );

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours == 0) return `${mins} m`;
        return `${hours} h ${mins} m`;
    };

    useEffect(() => {
        if (id && season_number) {
            dispatch(
                getOneSeriesDetails({
                    id,
                    season_number: Number(season_number),
                    language,
                })
            );
        }
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id, season_number, language]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // Вернуться назад
        } else {
            navigate(`/series/${id}/${season_number}?language=${language}`);
        }
    };

    const toggleEpisode = (episodeId: number) => {
        setOpenEpisodes((prev) => ({
            ...prev,
            [episodeId]: !prev[episodeId],
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!oneSeriesDetails) return <p>No data available</p>;

    return (
        <>
            <button className={style.backButton} onClick={handleBack}>
                Back
            </button>
            <div className={style.header}>
                <div className={style.header_center}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${oneSeriesDetails?.poster_path}`}
                        alt="Poster"
                        width={100}
                    />
                    <div className={style.header_info}>
                        <p>
                            {oneSeriesDetails?.name}{" "}
                            {`(${oneSeriesDetails?.air_date})`}
                        </p>
                    </div>
                </div>
            </div>
            <div className={style.episode}>
                <div className={style.episode_center}>
                    <h2>Episodes ({oneSeriesDetails?.episodes.length})</h2>
                    <ul className={style.episodes_list}>
                        {oneSeriesDetails?.episodes.map((item) => (
                            <li
                                key={item.id}
                                className={`${style.episodes_item} ${
                                    openEpisodes[item.id] ? style.expanded : ""
                                }`}>
                                <div className={style.episodes_item_main}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.still_path}`}
                                        alt="Episode still"
                                    />
                                    <div className={style.episode_item_info}>
                                        <h3>
                                            {item.name}{" "}
                                            <span>
                                                {`(${item.air_date || "N/A"})`}
                                            </span>
                                        </h3>
                                        <p>
                                            {item.overview ||
                                                "No overview available."}
                                        </p>
                                        <p>
                                            {item.runtime
                                                ? formatRuntime(item.runtime)
                                                : "Runtime not available"}
                                        </p>
                                    </div>
                                </div>
                                {item.guest_stars &&
                                    item.guest_stars.length > 0 && (
                                        <div className={style.people}>
                                            <h3
                                                onClick={() =>
                                                    toggleEpisode(item.id)
                                                }
                                                className={style.toggleStars}>
                                                Stars
                                            </h3>
                                            {openEpisodes[item.id] && (
                                                <StarItem
                                                    stars={item.guest_stars}
                                                />
                                            )}
                                        </div>
                                    )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SeriesDetails;
