import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { changePage } from "../../../store/posts/postSlice";
import { getMovie, getSeries } from "../../../store/posts/postAction";
import { RootState, useAppDispatch } from "../../../store/store";

const Paggination: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentPage_series, totalPages_series, search } = useSelector(
        (state: RootState) => state.posts
    );

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePage({ page: value }));
        dispatch(getSeries({ search, currentPage_series: value }));
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPages_series}
                page={currentPage_series}
                onChange={handleChange}
            />
        </Stack>
    );
};

export default Paggination;
