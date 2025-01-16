import React from "react";
import style from "../../style/seriesDetails.module.scss";
import { Iguest_stars } from "../../../../store/types/types";

interface starListProps {
    stars: Iguest_stars[];
}

const StarList = ({ stars }: starListProps) => (
    <ul className={style.people_list}>
        {stars.slice(0, 20).map((star) => (
            <div className={style.stars_block} key={star.id}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${star.profile_path}`}
                    alt={star.name}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr26y6-6pxmiG9FX0Xnhip52t58co0Ko4CIR8uaA5hoZpev75UbySfBytCO63nhy1hDCA&usqp=CAU";
                    }}
                />
                <div className={style.start_info}>
                    <p>{star.name}</p>
                    <p>{star.character}</p>
                </div>
            </div>
        ))}
    </ul>
);

export default StarList;
