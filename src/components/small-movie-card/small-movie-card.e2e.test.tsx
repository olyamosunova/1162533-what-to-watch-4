import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import SmallMovieCard from "./small-movie-card";
import {movie, emptyFunction} from "../../mock/testData";

configure({
  adapter: new Adapter(),
});

it(`when user hover movie card`, () => {
  const onMouseEnter = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMouseEnter={onMouseEnter}
        onMouseLeave={emptyFunction}
      />
  );

  smallMovieCard.find(`.small-movie-card`).simulate(`mouseEnter`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});

it(`when user leave movie card`, ()=> {
  const onMouseLeave = jest.fn();

  const movieCard = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMouseEnter={emptyFunction}
        onMouseLeave={onMouseLeave}
      />
  );

  const card = movieCard.find(`article.small-movie-card`);
  card.simulate(`mouseleave`);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
