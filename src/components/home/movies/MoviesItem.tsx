import React, { FC } from "react";
import { IMovie } from "../../../store/types/types";
import style from "../style/post.module.scss";

interface MoviesItemProps {
    post: IMovie;
}

const MoviesItem: FC<MoviesItemProps> = ({ post }) => {
    return (
        <div className={style.movieItem}>
            <div className={style.imageWrapper}>
                <img src={post.image} alt="" />
            </div>
        </div>
    );
};

export default MoviesItem;
