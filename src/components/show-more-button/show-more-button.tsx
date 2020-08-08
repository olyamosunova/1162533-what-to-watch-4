import * as React from "react";

interface Props {
  onShowMoreButtonClick(): void,
}

const ShowMoreButton: React.FC<Props> = ({
  onShowMoreButtonClick
}: Props) => {

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          onShowMoreButtonClick();
        }}
      >
        Show more
      </button>
    </div>
  );
};

export default ShowMoreButton;
