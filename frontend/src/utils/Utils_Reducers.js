import * as _ from "lodash";

const pair_rows_to_skip = new Set(["na"])
export const getRidOfRedundantPairedRows = (data_set) => {
    let col_1 = false;
    let col_2 = false;
    for (let i = data_set.length - 1; i >= 0; i--) {
        let j = 0
        for (let key of Object.keys(data_set[i])) {
            if (pair_rows_to_skip.has(String(data_set[i][key]).toLowerCase())) {
                if (j === 0)
                    col_1 = true
                else
                    col_2 = true
            }
            j++;
        }
        if (col_1 === true && col_2 === true) {
            data_set.splice(i, 1)
        }

        col_1 = false
        col_2 = false
    }
}

export const filter_pair_wise_tables = (state, user_input) => {
    let col_1 = false;
    let col_2 = false;
    for (let i = state.length - 1; i >= 0; i--) {
        let j = 0;
        for (let key of Object.keys(state[i])) {
            if (_.includes(String(state[i][key]).toLowerCase(),
                    user_input.toLowerCase()) === false) {
                if (j === 0)
                    col_1 = true;
                else
                    col_2 = true;
            }
            j++;
        }

        if (col_1 === true && col_2 === true) {
            state.splice(i, 1);
        }
        col_1 = false;
        col_2 = false;
    }
    return state;
}
