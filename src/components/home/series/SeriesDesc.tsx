import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import style from "../style/seriesitem.module.scss";
import { Skeleton } from "@mui/material";

const SeriesDesc: FC = () => {
    const { id } = useParams<string>();
    const { series, loading } = useAppSelector((state) => state.posts);

    const filteredPost = useMemo(() => {
        return series.find((item) => item.id === Number(id));
    }, [series, id]);
    const renderSkeletons = () =>
        Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
                key={index}
                sx={{ bgcolor: "grey.900", marginBottom: "1rem" }}
                variant="rectangular"
                height={300}
                className={style.skeletonWrapper}
            />
        ));

    return (
        <>
            {loading ? (
                <div className={style.postlist_center}>{renderSkeletons()}</div>
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
