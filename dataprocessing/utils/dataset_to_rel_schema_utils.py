import re
from contextlib import suppress

from dataprocessing.utils.utils import is_number

FIELD_TYPES = {
    "NUMBER_TYPE": "{} = models.FloatField(max_length=128, null=True)",
    "STRING_TYPE": "{} = CharField(max_length=64, default='')"  # The max length of values in dataset is 37
}


def is_boolean(value):
    with suppress(Exception):
        return value.lower() == 'false' or value.lower() == 'true'
    return False


# for key, value in field_length.items():
#   print(f'{key:55.50} : {value}')
def find_types_of_the_fields(patients):
    """Fetch values from all patients and save them in a map of sets.
    Then, reduce the sets to one value, thus, producing the type of
    value a corresponding field represents. """

    field_types = {}
    for key, _ in patients[0].items():
        field_types[key] = set()
    for patient in patients:
        for key, value in patient.items():
            field_types[key].add(value)
    for key, s in field_types.items():
        # TODO: check if the value is a date
        if len(s) > 1:
            with suppress(Exception):
                s.remove('NA')
        if all(map(is_number, s)):
            field_types[key] = 'NUMBER_TYPE'
        elif all(map(is_boolean, s)):
            field_types[key] = "BOOL_TYPE"
        elif len(s) == 1 and 'NA' in s:
            field_types[key] = "STRING_TYPE"
        else:
            field_types[key] = "STRING_TYPE"

    return field_types


def find_non_nested_features(patients, entity='patient.'):
    for key, _ in patients[0].items():
        match = re.fullmatch(r'.*\..*\..*', key)
        if match is None and entity in key:
            yield key


# list(find_non_nested_features(patients))
def generate_fields_for_patient(patients):
    non_nested_fields = list(find_non_nested_features(patients))
    field_types = find_types_of_the_fields(patients)

    for key, value in patients[0].items():
        if key in non_nested_fields:
            if 'patient' in key and '.admin.' not in key:
                print(FIELD_TYPES[field_types[key]].format(key.split('.')[1]))


def generate_attributes_for_specific_model(fields):
    num_value = "{} = Number()"
    char_value = "{} = CharField(max_length=32)"
    data_field = "{} = Date()"

    for item in fields:
        print(char_value.format(item.split('.')[1]))

        # fields = list(find_non_nested_features(patients, entity='patient.'))
        # django_fields = generate_attributes_for_model(fields)
