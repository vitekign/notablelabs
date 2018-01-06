import {PATIENT_API_SHORT_FORMAT} from '../constants/Constants'

export const getResourceName = (hostname) => {
    if (hostname.indexOf('165.227') >= 0)
        return 'http://165.227.52.154/';
    else if(hostname.indexOf('protected-stream-16309') >= 0)
        return 'https://calm-ravine-14725.herokuapp.com/'
    return 'http://127.0.0.1:8000/';
};

export const capitalizeFirstLetter = (str) => {
    if (str === "" || str === undefined)
        return "";
    try {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (e) {
        return str;
    }
};

export const separateWordsOnCapital = (str) => {
    if (String(str) === "")
        return str;

    return str.match(/[A-Z][a-z]+/g).join(" ");
};

export const removeUnderscores = (str) => {
    if (str === "" || str === undefined)
        return "";
    return str.replace(/[-_]/g, " ");
};


export const capitalizeWholeStrIfInSet = (set, str) => {
    if (str === "" || str === undefined)
        return "";
    try {
        const words = str.split(" ");
        return words.map((s) => {
            if (set.has(s.toLowerCase()))
                return s.toUpperCase() + " ";
            return s + " ";
        })
    } catch (e) {
        return str;
    }
};

export const sortUtilFunc = (a, b, key) => {
    a = castValueForSorting(a, key);
    b = castValueForSorting(b, key);
    return (a < b) ? -1 : (a > b) ? 1 : 0;
};

function castValueForSorting(obj, key) {
    if (key === PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT ||
        key === PATIENT_API_SHORT_FORMAT.ID)
        return Number(obj[key]);
    return obj[key];
}

export const compose = (...fns) => (arg) =>
    fns.reduce(
        (composed, f) => f(composed),
        arg
    );

export const reshapeDataSet = (details) => {
    for (const [key, element] of Object.entries(details)) {
        if (element === null)
            details[key] = 'NA';
    }
    const value = details.admin.patient_withdrawal.withdrawn;
    details.admin['withdrawn'] = String(value);

    details.race = details.race_list.race;
    delete details.race_list;

    const details_sub_array = {};
    const keys = Object.keys(details);
    for (let i = 0; i < keys.length; i++) {
        if (Object(details[keys[i]]) !== details[keys[i]]) {
            const key = keys[i];
            const value = details[keys[i]];
            const feature = {};
            feature[key] = value;
            details_sub_array[key] = value;
            delete details[key];
        }
    }
    details["patient_details"] = [details_sub_array];

    details["admin"] = [
        details["admin"]
    ]
};

export const cleanDataSet = (details) => {
    for (let [key, element] of Object.entries(details)) {
        if (element !== null && typeof(element) === 'object')
            cleanDataSet(element);
        else if (element instanceof Array) {
            for (let elem in element)
                cleanDataSet(elem);
        }
        else if (element === null || element === '')
            details[key] = 'NA';
        if (key === 'id' || key === 'patient_withdrawal') {
            delete details[key];
        }
    }
};

// The functionality has been moved into Reducers.

// export const updateDetailsInTablesUtil = (details, user_input) => {
//     user_input = String(user_input).toLowerCase();
//     for (let [key, element] of Object.entries(details)) {
//         if (details.hasOwnProperty(key) && details[key] !== null) {
//             if (this.pair_wise_tables.has(key))
//                 this.updatePairWiseRows(element, user_input);
//             else if (details[key].constructor === Object &&
//                 details[key].constructor !== Array)
//                 updateDetailsInTablesUtil(element, user_input);
//             else if (element.constructor === Array) {
//                 for (let j = 0; j < element.length; j++)
//                     updateDetailsInTablesUtil(element[j], user_input);
//             }
//             else if (String(key).toLowerCase().indexOf(user_input) < 0) {
//                 delete details[key];
//             }
//         }
//     }
// };

export const process_headers = compose(
    removeUnderscores,
    capitalizeFirstLetter,
    separateWordsOnCapital,
    capitalizeWholeStrIfInSet.bind(null, new Set(['id', 'bcr', 'uuid',
        'icd', 'o', 'lab', 'dx',])),
)

export const process_strings = compose(
    removeUnderscores,
    capitalizeFirstLetter,
    capitalizeWholeStrIfInSet.bind(null, new Set(['id', 'bcr', 'uuid',
        'icd', 'o', 'lab', 'dx',])),
)
