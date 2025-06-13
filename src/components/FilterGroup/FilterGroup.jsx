
export default function FilterGroup({minRating,onRatingClick,ratings}) {
    return (
        <div>
            <ul className="flex items-center gap-5 me-10">
                {
                    ratings.map((rate) => (
                        <li key={rate} onClick={() => onRatingClick(rate)} className={minRating === rate ? 'cursor-pointer movie-item active' : 'cursor-pointer movie-item'}>{rate}+ Star</li>
                    ))
                }
            </ul>
        </div>
    )
}
