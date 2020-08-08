import * as React from "react";
import {TABS} from "../../const";

interface Props {
  activeTab: string,
  onTabClick(tab: string): void
}

const Tabs: React.FC<Props> = ({
  activeTab,
  onTabClick
}: Props) => {
  const _renderTab = () => {
    return TABS.map((tab, i) => (
      <li
        className={`movie-nav__item ${activeTab === tab ? `movie-nav__item--active` : ``}`}
        key={tab + i}
        onClick={(evt) => {
          evt.preventDefault();

          onTabClick(tab);
        }}
      >
        <a href="#" className="movie-nav__link">{tab}</a>
      </li>
    ));
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {_renderTab()}
      </ul>
    </nav>
  );
};

export default Tabs;
