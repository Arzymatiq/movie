import React from "react";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { changePage } from "../../../store/posts/postSlice";
import { getMovie } from "../../../store/posts/postAction";
import { RootState, useAppDispatch } from "../../../store/store";

const Paggination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages, search, itemsPerPage } = useSelector(
        (state: RootState) => state.posts
    );

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePage({ page: value }));
        dispatch(getMovie({ search, currentPage: value, itemsPerPage }));
    };

    return (
        <Stack spacing={2} alignItems="center" marginTop={4}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
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
    );
};

export default Paggination;
