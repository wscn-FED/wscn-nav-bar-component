import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Tabs, {TabPane} from './index.js';

describe('<TabPane />', () => {
    it('should be ok with no tab pane name', () => {
        const wrapper = shallow(<TabPane/>);
        expect(wrapper).to.have.property('render');
    });
});

describe('<Tabs />', () => {
    it('should be ok with no tab pane', () => {
        const wrapper = shallow(<Tabs/>);
        expect(wrapper).to.have.property('render');
    });

    it('should render 1 tab pane with no name', () => {
        const wrapper = shallow(
            <Tabs>
                <TabPane/>
            </Tabs>
        );
        expect(wrapper).to.have.property('render');
    });
});
