import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
import {shallow, render} from 'enzyme'
import Search from '../../src/components/SearchBar'


import DataSet from '../../src/components/DataSet'
import {TextField} from "material-ui";

describe("<SearchBar /> UI Component", () => {

    it("renders default search bar", () =>
        expect(
            shallow(<Search/>)
                .find('#user_input')
                .length
        ).toBe(1)
    )

    it("should have an input for a search", () => {

        const wrapper = shallow(<Search/>)
        expect(wrapper.find('#user_input').length).toBe(1)

    })

    it("invokes onChange", () => {
        const onChange = jest.fn()
        const props = {
            'update': onChange,
        }
        const value = '2'

        shallow(<Search update={onChange}></Search>)
            .find('#user_input')
            .simulate('change')
        expect(_change).toBeCalled()

    })
})

