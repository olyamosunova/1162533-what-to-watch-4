import * as React from "react";

interface Props {
  genres: string[];
  activeGenre: string;
  onClick(item: string): void;
}

const GenresList: React.FC<Props> = (props: Props) => {
  const {genres, activeGenre, onClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((item) => {
        return <li
          key={item}
          className={`catalog__genres-item ${activeGenre === item ? `catalog__genres-item--active` : ``}`}
          onClick={(evt)=>{
            evt.preventDefault();
            onClick(item);
          }}
        >
          <a href="#" className="catalog__genres-link">{item}</a>
        </li>;
      })}
    </ul>
  );
};
export default GenresList;
