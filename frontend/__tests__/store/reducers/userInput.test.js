import C from '../../../src/constants/Constants'
import deepFreeze from 'deep-freeze'
import {userInput} from "../../../src/redux/store/reducers";

describe("userInput reducer", () => {
    it("SET_USER_INPUT_ALL_PATIENTS success", () => {
        const state = {};
        const action = {
            type: C.SET_USER_INPUT_ALL_PATIENTS,
            payload: "238"
        }

        deepFreeze(state)
        deepFreeze(action)

        const results = userInput(state, action)
        expect(results)
            .toEqual("238")
    })
})