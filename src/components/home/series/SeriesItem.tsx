import React, { FC, useState } from "react";
import { ISeries } from "../../../store/types/types";
import style from "../style/moveItem.module.scss";

interface SeriesItemProps {
    post: ISeries;
    onHover: (id: number | null) => void;
}

const SeriesItem: FC<SeriesItemProps> = ({ post, onHover }) => {
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
                    alt={post.name}
                />
                <div className={style.main_info}>
                    {isHovered && (
                        <div className={style.hoverDetails}>
                            <h2>
                                {post.name.length > 10 ? (
                                    <>{post?.name.slice(0, 10)}...</>
                                ) : (
                                    post.name
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

export default SeriesItem;
