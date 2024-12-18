import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Box, Rating, Skeleton } from "@mui/material";
import { getOneMovie } from "../../../store/posts/postAction";
import style from "../style/moveItem.module.scss";

const OneMovie: FC = () => {
    const { id } = useParams<string>();
    const dispatch = useAppDispatch();

    const { oneMovie, loading, error } = useAppSelector((state) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(getOneMovie(id));
        }
    }, [dispatch, id]);
    console.log(loading);

    return (
        <>
            {loading ? (
                <>
                    <div className={style.movieItem}>
                        <div className={style.movieItem_center}>
                            <Box
                                sx={{
                                    my: 5,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Skeleton
                                    variant="rectangular"
                                    width={700}
                                    height={300}
                                    sx={{ bgcolor: "grey.900" }}
                                />
                                <Box
                                    sx={{
                                        width: "calc(100% - 550px)",
                                        my: 5,
                                        marginLeft: 2,
                                    }}>
                                    <Skeleton
                                        width="60%"
                                        sx={{
                                            bgcolor: "grey.900",
                                            marginBottom: 2,
                                        }}
                                    />
                                    <Skeleton
                                        width="80%"
                                        sx={{ bgcolor: "grey.900" }}
                                    />
                                    <Skeleton
                                        width="80%"
                                        sx={{ bgcolor: "grey.900" }}
                                    />
                                    <Skeleton
                                        width="80%"
                                        sx={{ bgcolor: "grey.900" }}
                                    />
                                </Box>
                            </Box>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {!oneMovie ? (
                        <>
                            <div>This Movie doesn't exist :(</div>
                        </>
                    ) : (
                        <>
                            <div className={style.movieItem}>
                                <div className={style.movieItem_center}>
                                    <ul className={style.main_info_list}>
                                        <li className={style.main_info_item}>
                                            <div className={style.imageWrapper}>
                                                <img
                                                    src={
                                                        oneMovie.image_desc ||
                                                        "/default-image.jpg"
                                                    }
                                                    alt={
                                                        oneMovie.title ||
                                                        "No image available"
                                                    }
                                                    className={style.movieImage}
                                                />
                                            </div>
                                        </li>
                                        <li className={style.main_info_item}>
                                            <p>{oneMovie.Age_limit}+</p>
                                            <h2>{oneMovie.title}</h2>
                                            <p>{oneMovie.description}</p>
                                            <div className={style.rating}>
                                                <p>Rating</p>
                                                <h2>{oneMovie.grade}</h2>
                                                <Rating
                                                    name="half-rating-read"
                                                    value={oneMovie.grade}
                                                    precision={0.2}
                                                    max={10}
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
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default OneMovie;
