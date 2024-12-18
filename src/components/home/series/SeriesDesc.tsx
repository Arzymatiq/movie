import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import style from "../style/seriesitem.module.scss";
import { Box, Skeleton } from "@mui/material";
import { getOneSeries } from "../../../store/posts/postAction";

const SeriesDesc: FC = () => {
    const { id } = useParams<string>();
    const dispatch = useAppDispatch();

    const { oneSeries, loading } = useAppSelector((state) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(getOneSeries(id));
        }
    }, [dispatch, id]);

    const renderSkeletons = () =>
        Array.from({ length: 12 }).map(() => (
            <Box
                sx={{
                    width: 210,
                    marginRight: 0.5,
                    my: 5,
                }}>
                <Skeleton
                    variant="rectangular"
                    width={210}
                    height={118}
                    sx={{ bgcolor: "grey.900" }}
                />
                <Skeleton width="60%" sx={{ bgcolor: "grey.900" }} />
                <Skeleton width="80%" sx={{ bgcolor: "grey.900" }} />
            </Box>
        ));

    return (
        <>
            <div className={style.series}>
                <div className={style.series_center}>
                    {loading ? (
                        <>{renderSkeletons()}</>
                    ) : (
                        <>
                            {!oneSeries ? (
                                <>Series doesn't exist</>
                            ) : (
                                <>
                                    {oneSeries.series.map((item) => (
                                        <div
                                            key={item.id}
                                            className={style.series_item}>
                                            <div
                                                className={
                                                    style.series_item_center
                                                }>
                                                <img
                                                    style={{
                                                        width: "220px",
                                                        height: "120px",
                                                    }}
                                                    src={item.series_image}
                                                    alt="error:("
                                                />
                                                <div
                                                    className={
                                                        style.series_item_info
                                                    }>
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
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SeriesDesc;
