import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Skeleton, TextField } from "@mui/material";
import { RootState } from "../../../store/store";
import style from "../style/post.module.scss";
import MyPagination from "../../pagination/Pagination";
import { clearTotalPages } from "../../../store/posts/postSlice";

interface PostListProps<T> {
    items: T[];
    renderItem: (
        item: T,
        onHover: (id: number | null) => void
    ) => React.ReactNode;
    toNav: string;
    total: number;
}

const PostList = <T extends { id: number }>({
    items,
    renderItem,
    toNav,
    total,
}: PostListProps<T>) => {
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.posts);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
        <>
            <div className={style.postlist}>
                {loading ? (
                    <div className={style.loading}>{renderSkeletons()}</div>
                ) : error ? (
                    <div className={style.error}>
                        An error occurred: {error}
                    </div>
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
        </>
    );
};

export default PostList;
