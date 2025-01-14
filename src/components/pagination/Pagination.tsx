import { Pagination, Stack } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import cls from "./MyPagination.module.scss";

type MyPaginationProps = {
    total: number; // total_pages из API
    onChange: (page: number) => void;
};

const MyPagination: FC<MyPaginationProps> = memo(({ total, onChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromParams = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        if (pageFromParams !== currentPage) {
            setCurrentPage(pageFromParams);
            onChange(pageFromParams); // Вызываем изменение только при необходимости
        }
    }, [pageFromParams, currentPage, onChange]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            searchParams.set("page", page.toString());
            setSearchParams(searchParams);
            onChange(page); // Только при изменении страницы
        }
    };

    return (
        <div className={cls.paginationbox}>
            <Stack spacing={2} alignItems="center" marginTop={4}>
                <Pagination
                    count={Math.min(total, 500)} // Ограничиваем максимальное число страниц
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            borderColor: "white",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "white",
                            color: "black",
                        },
                    }}
                />
            </Stack>
        </div>
    );
});

export default MyPagination;
