import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { changePage } from "../../../store/posts/postSlice";
import { getMovie } from "../../../store/posts/postAction";
import { RootState, useAppDispatch } from "../../../store/store";

const Paggination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages, search } = useSelector(
        (state: RootState) => state.posts
    );

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePage({ page: value }));
        dispatch(getMovie({ search, currentPage: value }));
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
            />
        </Stack>
    );
};

export default Paggination;
