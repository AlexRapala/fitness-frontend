import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Allows for Enzyme to render React Components
Enzyme.configure({ adapter: new Adapter() })

// Jest uses JSDom which does not support this, so created it myself for tests
window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};