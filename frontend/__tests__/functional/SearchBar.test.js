import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, render } from 'enzyme'
import Search from '../../src/components/SearchBar'




import DataSet from '../../src/components/DataSet'

describe("<SearchBar /> UI Component", () => {

    it("renders default search bar", () =>
        expect(
            shallow(<Search />)
                .find('#user_input')
                .length
        ).toBe(1)
    )
})