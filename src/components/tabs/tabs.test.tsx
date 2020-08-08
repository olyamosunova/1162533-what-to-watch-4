import * as React from "react";
import * as renderer from 'react-test-renderer';
import {emptyFunction} from "../../mock/testData";
import Tabs from "./tabs";

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      activeTab={`Overview`}
      onTabClick={emptyFunction}
    />, {
      createNodeMock: ()=>{
        return {};
      }
    })
    .toJSON();
  expect(tree).toMatchSnapshot();
});
