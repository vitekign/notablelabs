import React from 'react'
import deepFreeze from 'deep-freeze'

global.React = React
global.__testPatients = deepFreeze([
    {
        ethnicity: "Not hispanic or latino",
        gender: "Female",
        patient_id: 2810,
        platelet_result_count: 32,
        vital_status: "Dead"
    },
    {
        ethnicity: "Not hispanic or latino",
        gender: "Male",
        patient_id: 2802,
        platelet_result_count: 231,
        vital_status: "Dead",
    },
    {
        ethnicity: "Not hispanic or latino",
        gender: "Male",
        patient_id: 2813,
        platelet_result_count: 98,
        vital_status: "Dead"
    }])

