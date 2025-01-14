import React, { FC, useState } from "react";
import { IMovie } from "../../../store/types/types";
import style from "../style/moveItem.module.scss";

interface MoviesItemProps {
    post: IMovie;
    onHover: (id: number | null) => void;
}

const MoviesItem: FC<MoviesItemProps> = ({ post, onHover }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        onHover(post.id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        onHover(null);
    };

    return (
        <div
            className={style.movieItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className={style.imageWrapper}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${post.poster_path}`}
                    alt={post.title}
                />
                <div className={style.main_info}>
                    {isHovered && (
                        <div className={style.hoverDetails}>
                            <h2>
                                {post.title.length > 10 ? (
                                    <>{post?.title.slice(0, 10)}...</>
                                ) : (
                                    post.title
                                )}
                            </h2>
                            <p>Rating: {post.vote_average}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviesItem;
