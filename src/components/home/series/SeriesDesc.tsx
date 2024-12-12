import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { Iseries, ISeries } from "../../../store/types/types";
import { getSeries } from "../../../store/posts/movieAction";
import style from "../style/seriesitem.module.scss";

const SeriesDesc: FC = () => {
    const { id } = useParams<string>();

    const posts = useSelector((state: RootState) => state.posts.series);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getSeries());
    }, [dispatch]);

    const filteredPost: ISeries | undefined = posts.find(
        (item) => item.id === Number(id)
    );

    if (!filteredPost) {
        return <p>Movie not found</p>;
    }
    const series = filteredPost.series;

    return (
        <div className={style.series}>
            <div className={style.series_center}>
                {series.map((item) => (
                    <div className={style.series_item}>
                        <div className={style.series_item_center}>
                            <img src={item.series_image} alt="error:(" />
                            <div className="">
                                <h2>
                                    {item.title.length > 13
                                        ? `${item.title.slice(0, 13)} ...`
                                        : item.title}
                                </h2>
                                <p>
                                    {" "}
                                    {item.description.length > 85
                                        ? `${item.description.slice(0, 85)} ...`
                                        : item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeriesDesc;
