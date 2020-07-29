import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header.jsx';

const userData = {
  id: 1,
  email: `sadas@dsasd.ru`,
  name: `asdasd`,
  avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
};

describe(`Header`, () => {
  it(`Should render correctly when is main page and user signed in`, () => {
    const tree = renderer
      .create(<Header
        authorizationStatus={``}
        userData={userData}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly when is main page and user is not signed in`, () => {
    const tree = renderer
      .create(<Header
        authorizationStatus={``}
        userData={userData}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
