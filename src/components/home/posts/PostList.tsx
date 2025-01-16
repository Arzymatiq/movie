import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useAppSelector } from "../../../store/store";
import style from "../style/post.module.scss";

interface PostListProps<T> {
    items: T[]; // Generic массив объектов
    renderItem: (
        item: T,
        onHover: (id: number | null) => void
    ) => React.ReactNode; // Функция рендера
    toNav: string; // Навигационный путь
    total: number; // Всего элементов
}

const PostList = <T extends { id: number }>({
    items,
    renderItem,
    toNav,
}: PostListProps<T>) => {
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.posts);
    const [_, setHoveredItem] = useState<number | null>(null);

    const renderSkeletons = () =>
        Array.from({ length: 20 }).map((_, index) => (
            <Skeleton
                key={index}
                variant="rectangular"
                height={240}
                width={160}
                className={style.skeletonWrapper}
            />
        ));

    const handleHover = (id: number | null) => {
        setHoveredItem(id);
    };

    return (
        <div className={style.postlist}>
            {loading ? (
                <div className={style.loading}>{renderSkeletons()}</div>
            ) : error ? (
                <div className={style.error}>An error occurred: {error}</div>
            ) : (
                <div className={style.postlist_center}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={style.postItem}
                            onClick={() => navigate(`/${toNav}/${item.id}`)}
                            onMouseEnter={() => handleHover(item.id)}
                            onMouseLeave={() => handleHover(null)}>
                            {renderItem(item, handleHover)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;
