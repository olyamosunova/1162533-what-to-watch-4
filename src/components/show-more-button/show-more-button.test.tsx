import * as React from "react";
import * as renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-button';
import {emptyFunction} from "../../mock/testData";

it(`Should ShowMoreButton render correctly`, () => {
  const tree = renderer
    .create(<ShowMoreButton
      onShowMoreButtonClick={emptyFunction}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
