import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShowMoreButton from './show-more-button.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should show-more button be clicked`, () => {
  const onShowMoreButtonClick = jest.fn();

  const mainComponent = shallow(<ShowMoreButton
    onShowMoreButtonClick={onShowMoreButtonClick}
  />);

  const showMoreButton = mainComponent.find(`.catalog__button`);
  showMoreButton.simulate(`click`, {
    preventDefault: onShowMoreButtonClick
  });

  expect(onShowMoreButtonClick.mock.calls.length).toBe(2);
});
