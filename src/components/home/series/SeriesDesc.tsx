import React, { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getSeries } from "../../../store/posts/movieAction";
import style from "../style/seriesitem.module.scss";

const SeriesDesc: FC = () => {
    const { id } = useParams<string>();
    const { series, loading } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSeries());
    }, [dispatch]);

    const filteredPost = useMemo(() => {
        return series.find((item) => item.id === Number(id));
    }, [series, id]);

    return (
        <>
            {loading ? (
                <>loading...</>
            ) : (
                <>
                    {!filteredPost ? (
                        <>Series doesn't exist</>
                    ) : (
                        <>
                            <div className={style.series}>
                                <div className={style.series_center}>
                                    {filteredPost.series.map((item) => (
                                        <div
                                            key={item.id}
                                            className={style.series_item}>
                                            <div
                                                className={
                                                    style.series_item_center
                                                }>
                                                <img
                                                    src={item.series_image}
                                                    alt="error:("
                                                />
                                                <div>
                                                    <h2>
                                                        {item.title.length > 13
                                                            ? `${item.title.slice(
                                                                  0,
                                                                  13
                                                              )}...`
                                                            : item.title}
                                                    </h2>
                                                    <p>
                                                        {item.description
                                                            .length > 85
                                                            ? `${item.description.slice(
                                                                  0,
                                                                  85
                                                              )}...`
                                                            : item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default SeriesDesc;
