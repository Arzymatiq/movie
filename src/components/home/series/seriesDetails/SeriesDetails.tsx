import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getOneSeriesDetails } from "../../../../store/posts/postAction";
import { clearPost } from "../../../../store/posts/postSlice";

const SeriesDetails = () => {
    const { id, season_number } = useParams<{
        id: string;
        season_number: string;
    }>();
    const dispatch = useAppDispatch();
    const { oneSeriesDetails, loading, error } = useAppSelector(
        (state) => state.posts
    );

    const navigate = useNavigate();

    console.log(id, season_number);
    console.log(oneSeriesDetails);

    useEffect(() => {
        if (id && season_number) {
            dispatch(
                getOneSeriesDetails({
                    id,
                    season_number: Number(season_number),
                })
            );
            return () => {
                dispatch(clearPost());
            };
        }
    }, [dispatch, id, season_number]);

    return <div>SeriesDetails</div>;
};

export default SeriesDetails;
