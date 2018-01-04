import C from '../../../src/constants/Constants'
import {allPatients} from '../../../src/redux/store/reducers'
import deepFreeze from 'deep-freeze'

const _testPatients = [{
    ethnicity: "Not hispanic or latino",
    gender: "Female",
    patient_id: 2810,
    platelet_result_count: 32,
    vital_status: "Dead"
}, {
    ethnicity: "Not hispanic or latino",
    gender: "Male",
    patient_id: 2802,
    platelet_result_count: 231,
    vital_status: "Dead",
}, {
    ethnicity: "Not hispanic or latino",
    gender: "Male",
    patient_id: 2813,
    platelet_result_count: 98,
    vital_status: "Dead"
}]

describe("allPatients Reducer", () => {

    it("GET_ALL_PATIENTS success", () => {
        const state = {}
        const action = {
            type: C.GET_ALL_PATIENTS,
            payload: [{
                patient_id: 2802.0,
                gender: "male",
                ethnicity: "not hispanic or latino",
                platelet_result_count: 231.0,
                vital_status: "dead"
            },]
        }
        deepFreeze(state)
        deepFreeze(action)

        const results = allPatients(state, action)
        expect(results)
            .toEqual([{
                patient_id: 2802,
                gender: "Male",
                ethnicity: "Not hispanic or latino",
                platelet_result_count: 231,
                vital_status: "Dead",
            }])
    })
    it("FILTER_PATIENTS [returns only the patients whose patient_ids match user input]' ", () => {
        const state = {}
        const action = {
            type: C.FILTER_PATIENTS,
            payload: {
                "userInput": "2813",
                "allPatientsImmutable": _testPatients
            }
        }
        deepFreeze(state);
        deepFreeze(action);

        const results = allPatients(state, action)
        expect(results)
            .toEqual([{
                ethnicity: "Not hispanic or latino",
                gender: "Male",
                patient_id: 2813,
                platelet_result_count: 98,
                vital_status: "Dead"
            }])
    })

    it("FILTER_PATIENTS [reducer return all patients if user_input is empty]", () => {
        const state = {}
        const action = {
            type: C.FILTER_PATIENTS,
            payload: {
                "userInput": "",
                "allPatientsImmutable": _testPatients
            }
        }
        deepFreeze(state)
        deepFreeze(action)

        const results = allPatients(state, action)
        expect(results)
            .toEqual(_testPatients)
    })

    // it("SORT_PATIENTS [reducer sorts patients based on provided criterion", () => {
    //     const state = _testPatients
    //     const action = {
    //         type: C.SORT_PATIENTS,
    //         payload: {
    //             criterion: "patient_id",
    //             asc_desc: {
    //                 "patient_id": 0,
    //                 "gender": 0,
    //                 "ethnicity": 0,
    //                 "platelet_result_count": 0,
    //                 "vital_status": 0
    //             }
    //         }
    //     }
    //     deepFreeze(state)
    //     deepFreeze(action)
    //
    //     const results = allPatients(state, action)
    //     expect(results)
    //         .toEqual(
    //             [{
    //                 ethnicity: "Not hispanic or latino",
    //                 gender: "Male",
    //                 patient_id: 2802,
    //                 platelet_result_count: 231,
    //                 vital_status: "Dead",
    //             }, {
    //                 ethnicity: "Not hispanic or latino",
    //                 gender: "Female",
    //                 patient_id: 2810,
    //                 platelet_result_count: 32,
    //                 vital_status: "Dead"
    //             }, {
    //                 ethnicity: "Not hispanic or latino",
    //                 gender: "Male",
    //                 patient_id: 2813,
    //                 platelet_result_count: 98,
    //                 vital_status: "Dead"
    //             }]
    //         )
    // })

})

