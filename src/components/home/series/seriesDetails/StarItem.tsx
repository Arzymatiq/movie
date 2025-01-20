import React from "react";
import { Iguest_stars } from "../../../../store/types/types";
import { MaxLength } from "../../../../helpers/function";
import style from "../../style/seriesDetails.module.scss";

interface StarItemProps {
    stars: Iguest_stars[];
}

const StarItem = ({ stars }: StarItemProps) => {
    const handleStarClick = (starId: number) => {
        console.log(`Star clicked: ${starId}`);
        window.open(`https://example.com/star/${starId}`, "_blank");
    };

    return (
        <ul className={style.people_list}>
            {stars.slice(0, 20).map((star) => (
                <li
                    className={style.stars_block}
                    key={star.id}
                    onClick={() => handleStarClick(star.id)}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${star.profile_path}`}
                        alt={star.name}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                                "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png";
                        }}
                    />
                    <div className={style.start_info}>
                        <p>{star.name}</p>
                        <p>{star.character}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default StarItem;
