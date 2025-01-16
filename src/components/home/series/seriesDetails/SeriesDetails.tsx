import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getOneSeriesDetails } from "../../../../store/posts/postAction";
import { clearPost } from "../../../../store/posts/postSlice";
import style from "../../style/seriesDetails.module.scss";

const SeriesDetails = () => {
    const { id, season_number } = useParams<{
        id: string;
        season_number: string;
    }>();
    const dispatch = useAppDispatch();
    const { oneSeriesDetails, loading, error } = useAppSelector(
        (state) => state.posts
    );
    const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({});
    const navigation = useNavigate();

    useEffect(() => {
        if (id && season_number) {
            dispatch(
                getOneSeriesDetails({
                    id,
                    season_number: Number(season_number),
                })
            );
            return () => {
                dispatch(clearPost());
            };
        }
    }, [dispatch, id, season_number]);

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const toggleDropdown = (episodeId: number) => {
        setDropdowns((prev) => ({
            ...prev,
            [episodeId]: !prev[episodeId],
        }));
    };
    console.log(
        oneSeriesDetails?.episodes.map((item) => (
            <>{item.guest_stars.map((start) => start.name)}</>
        ))
    );

    return (
        <>
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
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
                            onClick={() => {
                                navigation(-1);
                            }}
                            alt=""
                            width={50}
                            style={{
                                filter: "invert(100%)",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={style.episode}>
                <div className={style.episode_center}>
                    <h2>Episodes {oneSeriesDetails?.episodes.length}</h2>
                    <ul className={style.episodes_list}>
                        {oneSeriesDetails?.episodes.map((item) => (
                            <li
                                className={style.episodes_item}
                                key={item.id}
                                style={{
                                    height: dropdowns[item.id]
                                        ? "700px"
                                        : "200px",
                                }}>
                                <div className={style.episodes_item_main}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${item.still_path}`}
                                        alt=""
                                    />
                                    <div className={style.episode_item_info}>
                                        <h3>
                                            {item.name}{" "}
                                            <span>{`(${item.air_date})`}</span>
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
                                    <h3 onClick={() => toggleDropdown(item.id)}>
                                        Stars
                                    </h3>

                                    {dropdowns[item.id] && (
                                        <ul className={style.people_list}>
                                            {item.guest_stars
                                                .slice(0, 20)
                                                .map((star) => (
                                                    <div
                                                        className={
                                                            style.stars_block
                                                        }
                                                        key={star.id}>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${star.profile_path}`}
                                                            alt={star.name}
                                                            onError={(e) => {
                                                                e.currentTarget.onerror =
                                                                    null;
                                                                e.currentTarget.src =
                                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr26y6-6pxmiG9FX0Xnhip52t58co0Ko4CIR8uaA5hoZpev75UbySfBytCO63nhy1hDCA&usqp=CAU";
                                                            }}
                                                        />
                                                        <div
                                                            className={
                                                                style.start_info
                                                            }>
                                                            <p>{star.name}</p>
                                                            <p>
                                                                {star.character}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SeriesDetails;
