import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getOneSeriesDetails } from "../../../../store/posts/postAction";
import { clearPost } from "../../../../store/posts/postSlice";
import StarList from "./StarList";
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
    const [close, setClose] = useState(false);
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} h ${mins} m`;
    };

    useEffect(() => {
        if (id && season_number) {
            dispatch(
                getOneSeriesDetails({
                    id,
                    season_number: Number(season_number),
                })
            );
        }
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id, season_number]);

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    const episodesList = useMemo(() => {
        return oneSeriesDetails?.episodes.map((item) => (
            <li
                key={item.id}
                className={`${style.episodes_item} ${
                    close ? style.expanded : ""
                }`}>
                <div className={style.episodes_item_main}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${item.still_path}`}
                        alt=""
                    />
                    <div className={style.episode_item_info}>
                        <h3>
                            {item.name} <span>{`(${item.air_date})`}</span>
                        </h3>
                        <p>{item.overview}</p>
                        {item.runtime > 60 ? (
                            <>{formatRuntime(item.runtime)}</>
                        ) : (
                            <p>{item.runtime}m</p>
                        )}
                    </div>
                </div>
                <div className={style.people}>
                    <h3 onClick={() => setClose(!close)}>Stars</h3>
                    {close && <StarList stars={item.guest_stars} />}
                </div>
            </li>
        ));
    }, [oneSeriesDetails?.episodes, close]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!oneSeriesDetails) return <p>Нет данных</p>;

    return (
        <>
            <button className={style.backButton} onClick={handleBack}>
                Back
            </button>
            <div className={style.header}>
                <div className={style.header_center}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${oneSeriesDetails?.poster_path}`}
                        alt="error"
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
                    <h2>Episodes {oneSeriesDetails?.episodes.length}</h2>
                    <ul className={style.episodes_list}>{episodesList}</ul>
                </div>
            </div>
        </>
    );
};

export default SeriesDetails;
